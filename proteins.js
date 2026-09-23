/* ============================================================
   Protein Viewer Module
   Uses 3Dmol.js to render PDB structures
   ============================================================ */

/* ===== Protein catalog ===== */
const PROTEINS = [
  {
    id: '1CRN',
    name: 'Crambin',
    desc: 'پروتئین کوچک گیاهی — ۴۶ آمینواسید',
    info: { type:'پروتئین گیاهی', length:'۴۶ aa', organism:'Crambe abyssinica', resolution:'۱.۵ Å' }
  },
  {
    id: '1MBN',
    name: 'Myoglobin',
    desc: 'مایوگلوبین — ذخیره‌ی اکسیژن در عضله',
    info: { type:'پروتئین حمل‌کننده', length:'۱۵۳ aa', organism:'Sperm Whale', resolution:'۲.۰ Å' }
  },
  {
    id: '4HHB',
    name: 'Hemoglobin',
    desc: 'هموگلوبین — حمل اکسیژن در خون',
    info: { type:'پروتئین چهارگانه', length:'۵۷۴ aa (۴ زنجیره)', organism:'انسان', resolution:'۱.۷۴ Å' }
  },
  {
    id: '1HHO',
    name: 'Hemoglobin (Oxy)',
    desc: 'هموگلوبین متصل به اکسیژن',
    info: { type:'پروتئین چهارگانه', length:'۵۷۴ aa', organism:'انسان', resolution:'۲.۱ Å' }
  },
  {
    id: '1LYZ',
    name: 'Lysozyme',
    desc: 'لیزوزیم — آنزیم ضدباکتریایی اشک',
    info: { type:'آنزیم', length:'۱۲۹ aa', organism:'انسان/مرغ', resolution:'۱.۵ Å' }
  },
  {
    id: '2LYZ',
    name: 'Lysozyme (Hen)',
    desc: 'لیزوزیم سفیده‌ی تخم‌مرغ',
    info: { type:'آنزیم', length:'۱۲۹ aa', organism:'مرغ', resolution:'۲.۰ Å' }
  },
  {
    id: '1IGT',
    name: 'Immunoglobulin G',
    desc: 'آنتی‌بادی IgG — سیستم ایمنی',
    info: { type:'آنتی‌بادی', length:'~۱۳۰۰ aa', organism:'موش', resolution:'۲.۸ Å' }
  },
  {
    id: '3PBL',
    name: 'Dopamine Receptor',
    desc: 'گیرنده‌ی دوپامین D3',
    info: { type:'گیرنده غشایی', length:'۴۰۰ aa', organism:'انسان', resolution:'۲.۸ Å' }
  }
];

/* ===== Viewer state ===== */
let viewer = null;
let currentStyle = 'cartoon';
let spinInterval = null;

/* ============================================================
   Initialize viewer
   ============================================================ */
function initViewer(){
  const el = document.getElementById('viewer');
  // Remove spinner
  const spinner = document.getElementById('spinner');
  if(spinner) spinner.remove();

  viewer = $3Dmol.createViewer(el, {
    backgroundColor: '#0f172a',
    antialias: true
  });
}

/* ============================================================
   Load protein from PDB
   ============================================================ */
function loadProtein(pdbId){
  if(!viewer) initViewer();
  viewer.clear();

  document.getElementById('currentPdb').textContent = 'PDB: ' + pdbId;

  // Show loading
  const viewerEl = document.getElementById('viewer');
  const existingSpinner = document.getElementById('spinner');
  if(existingSpinner) existingSpinner.remove();
  const spinner = document.createElement('div');
  spinner.className = 'spinner';
  spinner.id = 'spinner';
  spinner.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
    <div style="margin-top:10px;">در حال بارگذاری ${pdbId}…</div>
  `;
  viewerEl.appendChild(spinner);

  // Fetch PDB
  const url = `https://files.rcsb.org/download/${pdbId}.pdb`;

  fetch(url)
    .then(res => {
      if(!res.ok) throw new Error('PDB not found');
      return res.text();
    })
    .then(data => {
      const s = document.getElementById('spinner');
      if(s) s.remove();

      viewer.addModel(data, 'pdb');
      applyStyle(currentStyle);
      viewer.zoomTo();
      viewer.render();

      // Update info
      updateInfo(pdbId);
    })
    .catch(err => {
      const s = document.getElementById('spinner');
      if(s) s.remove();
      document.getElementById('viewer').insertAdjacentHTML('beforeend', `
        <div class="spinner" style="color:#ef4444;">
          <div style="font-size:2rem;">⚠️</div>
          <div style="margin-top:10px;">خطا در بارگذاری ${pdbId}</div>
          <div style="margin-top:4px;font-size:.75rem;opacity:.7;">اتصال اینترنت یا دسترسی به RCSB را بررسی کنید.</div>
        </div>
      `);
    });
}

/* ============================================================
   Apply visualization style
   ============================================================ */
function applyStyle(style){
  if(!viewer) return;
  currentStyle = style;
  viewer.setStyle({}, {});

  if(style === 'cartoon'){
    viewer.setStyle({}, { cartoon: { color: 'spectrum' } });
  } else if(style === 'sphere'){
    viewer.setStyle({}, { sphere: { scale: 0.3, colorscheme: 'Jmol' } });
  } else if(style === 'stick'){
    viewer.setStyle({}, { stick: { radius: 0.15, colorscheme: 'Jmol' } });
  } else if(style === 'line'){
    viewer.setStyle({}, { line: { linewidth: 1.5, colorscheme: 'Jmol' } });
  }
  viewer.render();
}

/* ============================================================
   Update info panel
   ============================================================ */
function updateInfo(pdbId){
  const p = PROTEINS.find(x => x.id === pdbId);
  const infoGrid = document.getElementById('infoGrid');

  if(!p){
    infoGrid.innerHTML = `
      <div class="info-item">
        <div class="i-label">کد PDB</div>
        <div class="i-value">${pdbId}</div>
      </div>
      <div class="info-item">
        <div class="i-label">وضعیت</div>
        <div class="i-value" style="color:var(--green);">بارگذاری شد</div>
      </div>
    `;
    return;
  }

  infoGrid.innerHTML = `
    <div class="info-item">
      <div class="i-label">کد PDB</div>
      <div class="i-value">${p.id}</div>
    </div>
    <div class="info-item">
      <div class="i-label">نام</div>
      <div class="i-value" style="direction:rtl;text-align:right;">${p.name}</div>
    </div>
    <div class="info-item">
      <div class="i-label">نوع</div>
      <div class="i-value" style="direction:rtl;text-align:right;">${p.info.type}</div>
    </div>
    <div class="info-item">
      <div class="i-label">طول</div>
      <div class="i-value">${p.info.length}</div>
    </div>
    <div class="info-item">
      <div class="i-label">موجود زنده</div>
      <div class="i-value" style="direction:rtl;text-align:right;">${p.info.organism}</div>
    </div>
    <div class="info-item">
      <div class="i-label">رزولوشن</div>
      <div class="i-value">${p.info.resolution}</div>
    </div>
  `;
}

/* ============================================================
   Render protein selector
   ============================================================ */
function renderProteinButtons(){
  const grid = document.getElementById('proteinGrid');
  grid.innerHTML = PROTEINS.map((p, i) => `
    <button class="protein-btn${i===0?' active':''}" data-pdb="${p.id}">
      <span class="p-id">${p.id}</span>
      <span class="p-name">${p.name}</span>
      <span class="p-desc">${p.desc}</span>
    </button>
  `).join('');

  grid.querySelectorAll('.protein-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      grid.querySelectorAll('.protein-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      loadProtein(btn.dataset.pdb);
    });
  });
}

/* ============================================================
   UI Handlers
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Wait for 3Dmol to load
  if(typeof $3Dmol === 'undefined'){
    document.getElementById('viewer').innerHTML = `
      <div class="spinner" style="color:#ef4444;">
        <div style="font-size:2rem;">⚠️</div>
        <div style="margin-top:10px;">کتابخانه 3Dmol.js بارگذاری نشد.</div>
        <div style="margin-top:4px;font-size:.75rem;opacity:.7;">اتصال اینترنت را بررسی کنید.</div>
      </div>
    `;
    return;
  }

  initViewer();
  renderProteinButtons();
  loadProtein('1CRN');

  // Style buttons
  document.querySelectorAll('[data-style]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-style]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyStyle(btn.dataset.style);
    });
  });

  // Spin toggle
  const btnSpin = document.getElementById('btnSpin');
  btnSpin.addEventListener('click', () => {
    if(spinInterval){
      clearInterval(spinInterval);
      spinInterval = null;
      btnSpin.classList.remove('active');
    } else {
      btnSpin.classList.add('active');
      spinInterval = setInterval(() => {
        if(viewer) viewer.rotate(1, 'y');
      }, 50);
    }
  });

  // Reset
  document.getElementById('btnReset').addEventListener('click', () => {
    if(viewer){
      viewer.zoomTo();
      viewer.render();
    }
  });

  // Custom PDB load
  document.getElementById('btnLoadCustom').addEventListener('click', () => {
    const id = document.getElementById('customPdb').value.trim().toUpperCase();
    if(!id || id.length < 4){
      alert('لطفاً یک کد PDB چهار حرفی وارد کنید (مثلاً 1CRN).');
      return;
    }
    document.querySelectorAll('.protein-btn').forEach(b => b.classList.remove('active'));
    loadProtein(id);
  });
});