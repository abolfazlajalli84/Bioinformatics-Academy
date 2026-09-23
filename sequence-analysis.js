/* ============================================================
   Sequence Analysis Module
   DNA → RNA → Protein translation + GC content + ORF finder
   ============================================================ */

/* ===== Genetic Code Table ===== */
const CODON_TABLE = {
  'TTT':'F','TTC':'F','TTA':'L','TTG':'L',
  'CTT':'L','CTC':'L','CTA':'L','CTG':'L',
  'ATT':'I','ATC':'I','ATA':'I','ATG':'M',
  'GTT':'V','GTC':'V','GTA':'V','GTG':'V',
  'TCT':'S','TCC':'S','TCA':'S','TCG':'S',
  'CCT':'P','CCC':'P','CCA':'P','CCG':'P',
  'ACT':'T','ACC':'T','ACA':'T','ACG':'T',
  'GCT':'A','GCC':'A','GCA':'A','GCG':'A',
  'TAT':'Y','TAC':'Y','TAA':'*','TAG':'*',
  'CAT':'H','CAC':'H','CAA':'Q','CAG':'Q',
  'AAT':'N','AAC':'N','AAA':'K','AAG':'K',
  'GAT':'D','GAC':'D','GAA':'E','GAG':'E',
  'TGT':'C','TGC':'C','TGA':'*','TGG':'W',
  'CGT':'R','CGC':'R','CGA':'R','CGG':'R',
  'AGT':'S','AGC':'S','AGA':'R','AGG':'R',
  'GGT':'G','GGC':'G','GGA':'G','GGG':'G'
};

const AMINO_NAMES = {
  'A':'آلانین','R':'آرژینین','N':'آسپاراژین','D':'آسپارتیک اسید',
  'C':'سیستئین','E':'گلوتامیک اسید','Q':'گلوتامین','G':'گلیسین',
  'H':'هیستیدین','I':'ایزولوسین','L':'لوسین','K':'لیزین',
  'M':'متیونین (Start)','F':'فنیل‌آلانین','P':'پرولین','S':'سرین',
  'T':'ترئونین','W':'تریپتوفان','Y':'تیروزین','V':'والین','*':'توقف (Stop)'
};

/* ===== Clean sequence ===== */
function cleanSequence(seq){
  return (seq || '').toUpperCase().replace(/[^ATGCU]/g, '');
}

/* ===== DNA → RNA ===== */
function transcribe(dna){
  return dna.replace(/T/g, 'U');
}

/* ===== RNA → DNA (reverse) ===== */
function reverseTranscribe(rna){
  return rna.replace(/U/g, 'T');
}

/* ===== Reverse Complement ===== */
function reverseComplement(dna){
  const comp = {'A':'T','T':'A','G':'C','C':'G'};
  return dna.split('').reverse().map(b => comp[b] || b).join('');
}

/* ===== GC Content ===== */
function gcContent(seq){
  if(!seq.length) return 0;
  const gc = (seq.match(/[GC]/g) || []).length;
  return (gc / seq.length) * 100;
}

/* ===== Translation ===== */
function translate(dna){
  const seq = cleanSequence(dna);
  const protein = [];
  const codons = [];

  for(let i=0; i+2 < seq.length; i += 3){
    const codon = seq.substr(i, 3);
    const aa = CODON_TABLE[codon] || '?';
    codons.push({codon, aa});
    if(aa === '*') break;
    protein.push(aa);
  }

  return {
    protein: protein.join(''),
    codons: codons,
    fullLength: codons.length
  };
}

/* ===== Find ORFs ===== */
function findORFs(dna, minLength=30){
  const seq = cleanSequence(dna);
  const results = [];
  const stopCodons = ['TAA','TAG','TGA'];

  // Check all 3 reading frames
  for(let frame=0; frame<3; frame++){
    let i = frame;
    let orfStart = -1;
    let orfSeq = '';

    while(i + 2 < seq.length){
      const codon = seq.substr(i, 3);

      if(codon === 'ATG' && orfStart === -1){
        orfStart = i;
        orfSeq = '';
      }

      if(orfStart !== -1){
        orfSeq += codon;
        if(stopCodons.includes(codon)){
          if(orfSeq.length >= minLength){
            results.push({
              frame: frame + 1,
              start: orfStart + 1,
              end: i + 3,
              length: orfSeq.length,
              nucleotides: orfSeq,
              protein: translate(orfSeq).protein
            });
          }
          orfStart = -1;
          orfSeq = '';
        }
      }
      i += 3;
    }
  }
  return results;
}

/* ===== Colorize bases ===== */
function colorizeDNA(seq){
  const colorMap = {
    'A':'base-a','T':'base-t','U':'base-u',
    'G':'base-g','C':'base-c'
  };
  return seq.split('').map(b => {
    const cls = colorMap[b] || '';
    return `<span class="${cls}">${b}</span>`;
  }).join('');
}

/* ===== Sample sequences ===== */
const SAMPLES = {
  short: 'ATGGCTAGCTAGCTAGCTAA',
  insulin: 'ATGGCCCTGTGGATGCGCCTCCTGCCCCTGCTGGCGCTGCTGGCCCTCTGGGGACCTGACCCAGCCGCAGCCTTTGTGAACCAACACCTGTGCGGCTCACACCTGGTGGAAGCTCTCTACCTAGTGTGCGGGGAACGAGGCTTCTTCTACACACCCAAGACCTAA',
  gfp: 'ATGGTGAGCAAGGGCGAGGAGCTGTTCACCGGGGTGGTGCCCATCCTGGTCGAGCTGGACGGCGACGTAAACGGCCACAAGTTCAGCGTGTCCGGCGAGGGCGAGGGCGATGCCACCTACGGCAAGCTGACCCTGAAGTTCATCTGCACCACCGGCAAGCTGCCCGTGCCCTGGCCCACCCTCGTGACCACCCTGACCTACGGCGTGCAGTGCTTCAGCCGCTACCCCGACCACATGAAGCAGCACGACTTCTTCAAGTCCGCCATGCCCGAAGGCTACGTCCAGGAGCGCACCATCTTCTTCAAGGACGACGGCAACTACAAGACCCGCGCCGAGGTGAAGTTCGAGGGCGACACCCTGGTGAACCGCATCGAGCTGAAGGGCATCGACTTCAAGGAGGACGGCAACATCCTGGGGCACAAGCTGGAGTACAACTACAACAGCCACAACGTCTATATCATGGCCGACAAGCAGAAGAACGGCATCAAGGTGAACTTCAAGATCCGCCACAACATCGAGGACGGCAGCGTGCAGCTCGCCGACCACTACCAGCAGAACACCCCCATCGGCGACGGCCCCGTGCTGCTGCCCGACAACCACTACCTGAGCACCCAGTCCGCCCTGAGCAAAGACCCCAACGAGAAGCGCGATCACATGGTCCTGCTGGAGTTCGTGACCGCCGCCGGGATCACTCTCGGCATGGACGAGCTGTACAAGTAA'
};

/* ============================================================
   UI Handlers
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('dnaInput');
  const btnTranslate = document.getElementById('btnTranslate');
  const btnGC = document.getElementById('btnGC');
  const btnRC = document.getElementById('btnRC');
  const btnORF = document.getElementById('btnORF');
  const btnClear = document.getElementById('btnClear');
  const resultsDiv = document.getElementById('results');

  // Sample chips
  document.querySelectorAll('[data-sample]').forEach(chip => {
    chip.addEventListener('click', () => {
      const key = chip.dataset.sample;
      input.value = SAMPLES[key] || '';
      updateStats();
    });
  });

  // Update stats on input
  input.addEventListener('input', updateStats);

  function updateStats(){
    const seq = cleanSequence(input.value);
    const len = seq.length;
    const gc = gcContent(seq);
    const at = len ? (100 - gc) : 0;

    document.getElementById('statLen').textContent = len.toLocaleString('fa-IR');
    document.getElementById('statGC').textContent = gc.toFixed(1) + '٪';
    document.getElementById('statAT').textContent = at.toFixed(1) + '٪';
    document.getElementById('statCodons').textContent =
      len >= 3 ? Math.floor(len / 3).toLocaleString('fa-IR') : '۰';
  }

  // Translate
  btnTranslate.addEventListener('click', () => {
    const seq = cleanSequence(input.value);
    if(!seq.length){
      showError('لطفاً یک توالی DNA وارد کنید.');
      return;
    }
    const result = translate(seq);
    resultsDiv.innerHTML = `
      <div class="output-box">
        <div class="o-head">توالی DNA (رنگ‌بندی‌شده)</div>
        <div class="o-body"><span class="bases">${colorizeDNA(seq)}</span></div>
      </div>
      <div class="output-box">
        <div class="o-head">mRNA (رونویسی)</div>
        <div class="o-body"><span class="bases">${colorizeDNA(transcribe(seq))}</span></div>
      </div>
      <div class="output-box">
        <div class="o-head">پروتئین (ترجمه)</div>
        <div class="o-body">
          <div style="font-size:15px;line-height:2;color:#0f172a;font-weight:600;">
            ${result.protein || '—'}
          </div>
          <div style="margin-top:10px;font-size:11px;color:#64748b;">
            تعداد آمینواسید: ${result.protein.length} | تعداد کدون: ${result.fullLength}
          </div>
        </div>
      </div>
      <div class="output-box">
        <div class="o-head">کدون‌ها و آمینواسیدها</div>
        <div class="o-body" style="max-height:200px;">
          ${result.codons.map((c, i) =>
            `<span class="codon-label">${c.codon} → ${c.aa}</span>`
          ).join(' ')}
        </div>
      </div>
    `;
    resultsDiv.scrollIntoView({behavior:'smooth', block:'nearest'});
  });

  // GC content
  btnGC.addEventListener('click', () => {
    const seq = cleanSequence(input.value);
    if(!seq.length){
      showError('لطفاً یک توالی DNA وارد کنید.');
      return;
    }
    const gc = gcContent(seq);
    const at = 100 - gc;

    // Count each base
    const counts = {A:0, T:0, G:0, C:0};
    seq.split('').forEach(b => { if(counts[b] !== undefined) counts[b]++; });

    resultsDiv.innerHTML = `
      <div class="results-grid">
        <div class="result-card">
          <div class="r-label">محتوای GC</div>
          <div class="r-value">${gc.toFixed(2)}<span class="unit">٪</span></div>
        </div>
        <div class="result-card">
          <div class="r-label">محتوای AT</div>
          <div class="r-value">${at.toFixed(2)}<span class="unit">٪</span></div>
        </div>
        <div class="result-card">
          <div class="r-label">طول توالی</div>
          <div class="r-value">${seq.length.toLocaleString('fa-IR')}<span class="unit"> نوکلئوتید</span></div>
        </div>
      </div>
      <div class="output-box">
        <div class="o-head">توزیع بازها</div>
        <div class="o-body">
          <div>A (آدنین): ${counts.A} نوکلئوتید — ${(counts.A/seq.length*100).toFixed(1)}٪</div>
          <div>T (تیمین): ${counts.T} نوکلئوتید — ${(counts.T/seq.length*100).toFixed(1)}٪</div>
          <div>G (گوانین): ${counts.G} نوکلئوتید — ${(counts.G/seq.length*100).toFixed(1)}٪</div>
          <div>C (سیتوزین): ${counts.C} نوکلئوتید — ${(counts.C/seq.length*100).toFixed(1)}٪</div>
        </div>
      </div>
    `;
    resultsDiv.scrollIntoView({behavior:'smooth', block:'nearest'});
  });

  // Reverse complement
  btnRC.addEventListener('click', () => {
    const seq = cleanSequence(input.value);
    if(!seq.length){
      showError('لطفاً یک توالی DNA وارد کنید.');
      return;
    }
    const rc = reverseComplement(seq);
    resultsDiv.innerHTML = `
      <div class="output-box">
        <div class="o-head">توالی اصلی (5' → 3')</div>
        <div class="o-body"><span class="bases">${colorizeDNA(seq)}</span></div>
      </div>
      <div class="output-box">
        <div class="o-head">توالی مکمل معکوس (5' → 3')</div>
        <div class="o-body"><span class="bases">${colorizeDNA(rc)}</span></div>
      </div>
    `;
    resultsDiv.scrollIntoView({behavior:'smooth', block:'nearest'});
  });

  // ORF finder
  btnORF.addEventListener('click', () => {
    const seq = cleanSequence(input.value);
    if(!seq.length){
      showError('لطفاً یک توالی DNA وارد کنید.');
      return;
    }
    if(seq.length < 30){
      showError('برای یافتن ORF حداقل ۳۰ نوکلئوتید لازم است.');
      return;
    }
    const orfs = findORFs(seq, 30);
    if(!orfs.length){
      resultsDiv.innerHTML = `
        <div class="output-box">
          <div class="o-head">نتیجه</div>
          <div class="o-body" style="color:#64748b;">
            هیچ ORF معتبری (با حداقل ۳۰ نوکلئوتید) یافت نشد.
          </div>
        </div>
      `;
      return;
    }
    resultsDiv.innerHTML = `
      <div class="output-box">
        <div class="o-head">${orfs.length} ORF یافت شد (حداقل ۳۰ نوکلئوتید)</div>
        <div style="padding:14px;">
          ${orfs.map((o, i) => `
            <div class="orf-item">
              <div class="orf-head">
                <span>ORF #${i+1} — فریم ${o.frame}</span>
                <span>موقعیت: ${o.start} تا ${o.end} | طول: ${o.length} nt</span>
              </div>
              <div class="orf-seq">${colorizeDNA(o.nucleotides)}</div>
              <div style="margin-top:8px;font-size:12px;color:#7c3aed;">
                پروتئین: ${o.protein || '—'}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    resultsDiv.scrollIntoView({behavior:'smooth', block:'nearest'});
  });

  // Clear
  btnClear.addEventListener('click', () => {
    input.value = '';
    resultsDiv.innerHTML = '';
    updateStats();
  });

  function showError(msg){
    resultsDiv.innerHTML = `
      <div class="output-box">
        <div class="o-head" style="color:#dc2626;">خطا</div>
        <div class="o-body" style="color:#dc2626;">${msg}</div>
      </div>
    `;
  }

  // Initial stats
  updateStats();
});