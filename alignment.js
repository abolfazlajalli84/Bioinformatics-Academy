/* ============================================================
   Sequence Alignment Module
   Needleman-Wunsch (Global) + Smith-Waterman (Local)
   ============================================================ */

/* ===== Sample sequences ===== */
const ALIGN_SAMPLES = {
  simple: { seq1: 'GATTACA', seq2: 'GCATGCU' },
  dna: { seq1: 'ATGGCTAGCTAGCTAGCTAA', seq2: 'ATGGCTAGCTAGCTAGCTAA' },
  protein: { seq1: 'MKTAYIAKQRQISFVKSHFSRQ', seq2: 'MKTAYIAKQRQISFVKSHFTRQ' }
};

/* ===== Clean sequence ===== */
function cleanSeq(s){
  return (s || '').toUpperCase().replace(/\s+/g, '');
}

/* ============================================================
   Dynamic Programming Alignment
   ============================================================ */
function align(seq1, seq2, options){
  const { match, mismatch, gap, mode } = options;
  const isLocal = mode === 'local';

  const m = seq1.length;
  const n = seq2.length;

  // Score matrix (m+1) × (n+1)
  const F = Array.from({length: m+1}, () => new Array(n+1).fill(0));

  // Traceback matrix: 'D'=diag, 'U'=up, 'L'=left, 'S'=start
  const T = Array.from({length: m+1}, () => new Array(n+1).fill(''));

  // Initialize first row & column
  for(let i=1; i<=m; i++){
    if(isLocal){
      F[i][0] = 0;
      T[i][0] = 'S';
    } else {
      F[i][0] = i * gap;
      T[i][0] = 'U';
    }
  }
  for(let j=1; j<=n; j++){
    if(isLocal){
      F[0][j] = 0;
      T[0][j] = 'S';
    } else {
      F[0][j] = j * gap;
      T[0][j] = 'L';
    }
  }

  // Fill matrix
  let maxScore = 0;
  let maxPos = [0, 0];

  for(let i=1; i<=m; i++){
    for(let j=1; j<=n; j++){
      const isMatch = seq1[i-1] === seq2[j-1];
      const s = isMatch ? match : mismatch;

      const diag = F[i-1][j-1] + s;
      const up   = F[i-1][j] + gap;
      const left = F[i][j-1] + gap;

      let best, dir;

      if(isLocal){
        // Local: also consider 0
        best = Math.max(0, diag, up, left);
        if(best === 0) dir = 'S';
        else if(best === diag) dir = 'D';
        else if(best === up) dir = 'U';
        else dir = 'L';
      } else {
        best = Math.max(diag, up, left);
        if(best === diag) dir = 'D';
        else if(best === up) dir = 'U';
        else dir = 'L';
      }

      F[i][j] = best;
      T[i][j] = dir;

      if(best > maxScore){
        maxScore = best;
        maxPos = [i, j];
      }
    }
  }

  // Traceback
  let i, j;
  if(isLocal){
    i = maxPos[0];
    j = maxPos[1];
  } else {
    i = m;
    j = n;
  }

  const aligned1 = [];
  const aligned2 = [];
  const matchLine = [];
  const tracebackPath = [];

  while(i > 0 || j > 0){
    const dir = T[i][j];

    if(isLocal && (F[i][j] === 0 || dir === 'S' || dir === '')) break;

    tracebackPath.push([i, j]);

    if(dir === 'D'){
      aligned1.unshift(seq1[i-1]);
      aligned2.unshift(seq2[j-1]);
      matchLine.unshift(seq1[i-1] === seq2[j-1] ? '|' : '·');
      i--; j--;
    } else if(dir === 'U'){
      aligned1.unshift(seq1[i-1]);
      aligned2.unshift('-');
      matchLine.unshift(' ');
      i--;
    } else if(dir === 'L'){
      aligned1.unshift('-');
      aligned2.unshift(seq2[j-1]);
      matchLine.unshift(' ');
      j--;
    } else {
      break;
    }
  }

  // Count stats
  const a1 = aligned1.join('');
  const a2 = aligned2.join('');
  let matches = 0, mismatches = 0, gaps = 0;

  for(let k=0; k<a1.length; k++){
    if(a1[k] === '-' || a2[k] === '-') gaps++;
    else if(a1[k] === a2[k]) matches++;
    else mismatches++;
  }

  const identity = a1.length ? (matches / a1.length * 100) : 0;

  return {
    aligned1: a1,
    aligned2: a2,
    matchLine: matchLine.join(''),
    score: isLocal ? maxScore : F[m][n],
    matches,
    mismatches,
    gaps,
    identity,
    matrix: F,
    traceback: tracebackPath,
    seq1, seq2,
    mode,
    isLocal
  };
}

/* ============================================================
   Render functions
   ============================================================ */
function renderAlignment(res){
  const container = document.getElementById('alignResults');

  // Score cards
  const scoreHTML = `
    <div class="score-cards">
      <div class="score-card">
        <div class="s-label">امتیاز نهایی</div>
        <div class="s-value">${res.score}</div>
      </div>
      <div class="score-card blue">
        <div class="s-label">تعداد تطابق</div>
        <div class="s-value">${res.matches}</div>
      </div>
      <div class="score-card blue">
        <div class="s-label">عدم تطابق</div>
        <div class="s-value">${res.mismatches}</div>
      </div>
      <div class="score-card purple">
        <div class="s-label">شکاف (Gap)</div>
        <div class="s-value">${res.gaps}</div>
      </div>
      <div class="score-card purple">
        <div class="s-label">درصد شباهت</div>
        <div class="s-value">${res.identity.toFixed(1)}<span style="font-size:.8rem;color:#64748b;font-weight:400;">٪</span></div>
      </div>
    </div>
  `;

  // Build colored alignment
  const colored1 = colorizeAligned(res.aligned1, res.aligned2, 1);
  const colored2 = colorizeAligned(res.aligned2, res.aligned1, 2);

  const alignHTML = `
    <div class="align-result">
      <div class="seq-line">
        <span class="seq-label">Seq 1</span>${colored1}
      </div>
      <div class="seq-line match-bar">
        <span class="seq-label"></span>${res.matchLine.replace(/\|/g, '│').replace(/ /g, ' ')}
      </div>
      <div class="seq-line">
        <span class="seq-label">Seq 2</span>${colored2}
      </div>
    </div>
  `;

  // Matrix table (only if small enough)
  let matrixHTML = '';
  const m = res.seq1.length;
  const n = res.seq2.length;

  if(m <= 25 && n <= 25){
    matrixHTML = renderMatrix(res);
  } else {
    matrixHTML = `
      <div class="note-box">
        <b>توجه:</b> ماتریس امتیاز برای توالی‌های بلند (بیش از ۲۵ کاراکتر) نمایش داده نمی‌شود تا صفحه سنگین نشود. اما محاسبات به‌درستی انجام شده است.
      </div>
    `;
  }

  container.innerHTML = scoreHTML + alignHTML + matrixHTML;

  // Scroll
  container.scrollIntoView({behavior:'smooth', block:'nearest'});
}

function colorizeAligned(seq, other, which){
  let html = '';
  for(let i=0; i<seq.length; i++){
    const c = seq[i];
    const o = other[i];
    let cls = '';
    if(c === '-') cls = 'gap';
    else if(c === o) cls = 'match';
    else cls = 'mismatch';
    html += `<span class="${cls}">${c}</span>`;
  }
  return html;
}

function renderMatrix(res){
  const { matrix, seq1, seq2, traceback } = res;

  // Build traceback set for quick lookup
  const tbSet = new Set(traceback.map(([i,j]) => `${i},${j}`));

  let html = '<div class="matrix-wrap"><table class="matrix-table">';

  // Header row
  html += '<tr><th></th><th>—</th>';
  for(const c of seq2){
    html += `<th>${c}</th>`;
  }
  html += '</tr>';

  // Body rows
  for(let i=0; i<=seq1.length; i++){
    html += '<tr>';
    html += `<th>${i === 0 ? '—' : seq1[i-1]}</th>`;
    for(let j=0; j<=seq2.length; j++){
      const v = matrix[i][j];
      const key = `${i},${j}`;
      let cls = '';
      if(tbSet.has(key)) cls = 'traceback';
      else if(v === 0 && res.isLocal) cls = 'zero-cell';
      html += `<td class="${cls}">${v}</td>`;
    }
    html += '</tr>';
  }

  html += '</table></div>';

  // Legend
  html += `
    <div class="matrix-legend">
      <span><span class="dot traceback"></span> مسیر بهینه (Traceback)</span>
      <span><span class="dot optimal"></span> مقادیر محاسبه‌شده</span>
    </div>
  `;

  return html;
}

/* ============================================================
   UI Handlers
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const seq1El = document.getElementById('seq1');
  const seq2El = document.getElementById('seq2');
  const pMatch = document.getElementById('pMatch');
  const pMismatch = document.getElementById('pMismatch');
  const pGap = document.getElementById('pGap');
  const results = document.getElementById('alignResults');

  let currentMode = 'global';

  // Algorithm toggle
  document.querySelectorAll('#algoToggle button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#algoToggle button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentMode = btn.dataset.algo;
    });
  });

  // Sample chips
  document.querySelectorAll('[data-sample]').forEach(chip => {
    chip.addEventListener('click', () => {
      const key = chip.dataset.sample;
      const s = ALIGN_SAMPLES[key];
      if(s){
        seq1El.value = s.seq1;
        seq2El.value = s.seq2;
      }
    });
  });

  // Run alignment
  document.getElementById('btnAlign').addEventListener('click', () => {
    const s1 = cleanSeq(seq1El.value);
    const s2 = cleanSeq(seq2El.value);

    if(!s1 || !s2){
      results.innerHTML = `
        <div class="output-box">
          <div class="o-head" style="color:#dc2626;">خطا</div>
          <div class="o-body" style="color:#dc2626;">لطفاً هر دو توالی را وارد کنید.</div>
        </div>
      `;
      return;
    }

    if(s1.length > 200 || s2.length > 200){
      results.innerHTML = `
        <div class="output-box">
          <div class="o-head" style="color:#dc2626;">خطا</div>
          <div class="o-body" style="color:#dc2626;">حداکثر طول توالی ۲۰۰ کاراکتر است (برای حفظ کارایی مرورگر).</div>
        </div>
      `;
      return;
    }

    const options = {
      match: parseInt(pMatch.value) || 1,
      mismatch: parseInt(pMismatch.value) || -1,
      gap: parseInt(pGap.value) || -2,
      mode: currentMode
    };

    const res = align(s1, s2, options);
    renderAlignment(res);
  });

  // Clear
  document.getElementById('btnClear').addEventListener('click', () => {
    seq1El.value = '';
    seq2El.value = '';
    results.innerHTML = '';
  });
});