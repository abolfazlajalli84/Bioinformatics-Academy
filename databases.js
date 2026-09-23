/* ============================================================
   Databases & Tools Module
   ============================================================ */

/* ===== Databases data ===== */
const DATABASES = [
  {
    id:'ncbi',
    name:'NCBI',
    en:'National Center for Biotechnology Information',
    logo:'NCBI',
    logoClass:'',
    desc:'بزرگ‌ترین پایگاه داده‌ی زیستی جهان. شامل توالی‌های ژنتیکی، مقالات علمی، ابزار BLAST و منابع متعدد دیگر.',
    tags:['توالی','ژنوم','مقالات','BLAST'],
    url:'https://www.ncbi.nlm.nih.gov/'
  },
  {
    id:'genbank',
    name:'GenBank',
    en:'GenBank',
    logo:'GB',
    logoClass:'green',
    desc:'پایگاه داده‌ی توالی‌های نوکلئوتیدی که توسط NCBI نگهداری می‌شود. همکاری بین‌المللی با EMBL و DDBJ دارد.',
    tags:['DNA','RNA','توالی نوکلئوتیدی'],
    url:'https://www.ncbi.nlm.nih.gov/genbank/'
  },
  {
    id:'uniprot',
    name:'UniProt',
    en:'Universal Protein Resource',
    logo:'Uni',
    logoClass:'purple',
    desc:'پایگاه داده‌ی جامع توالی‌ها و اطلاعات عملکردی پروتئین‌ها. شامل Swiss-Prot (بازبینی‌شده) و TrEMBL (خودکار).',
    tags:['پروتئین','عملکرد','توالی'],
    url:'https://www.uniprot.org/'
  },
  {
    id:'pdb',
    name:'RCSB PDB',
    en:'Protein Data Bank',
    logo:'PDB',
    logoClass:'amber',
    desc:'پایگاه داده‌ی ساختارهای سه‌بعدی پروتئین‌ها و اسیدهای نوکلئیک. داده‌ها با کریستالوگرافی اشعه ایکس، NMR یا کریو-EM به‌دست آمده‌اند.',
    tags:['ساختار سه‌بعدی','کریستالوگرافی','NMR'],
    url:'https://www.rcsb.org/'
  },
  {
    id:'ensembl',
    name:'Ensembl',
    en:'Ensembl Genome Browser',
    logo:'Ens',
    logoClass:'green',
    desc:'مرورگر ژنوم مهره‌داران و برخی بی‌مهرگان. ابزارهای مقایسه‌ای، حاشیه‌نویسی و آنالیز ژنوم فراهم می‌کند.',
    tags:['ژنوم','حاشیه‌نویسی','مقایسه'],
    url:'https://www.ensembl.org/'
  },
  {
    id:'kegg',
    name:'KEGG',
    en:'Kyoto Encyclopedia of Genes and Genomes',
    logo:'KEGG',
    logoClass:'red',
    desc:'پایگاه داده‌ی مسیرهای متابولیکی، بیماری‌ها، داروها و ژن‌ها. برای سیستم‌بیولوژی و متابولومیکس حیاتی است.',
    tags:['مسیر متابولیکی','بیماری','دارو'],
    url:'https://www.genome.jp/kegg/'
  },
  {
    id:'pubmed',
    name:'PubMed',
    en:'PubMed',
    logo:'PM',
    logoClass:'',
    desc:'پایگاه داده‌ی مقالات علمی پزشکی و زیست‌شناسی با بیش از ۳۵ میلیون چکیده. برای مرور متون علمی ضروری است.',
    tags:['مقاله','چکیده','مرور متون'],
    url:'https://pubmed.ncbi.nlm.nih.gov/'
  },
  {
    id:'string',
    name:'STRING',
    en:'Search Tool for the Retrieval of Interacting Genes',
    logo:'STR',
    logoClass:'purple',
    desc:'پایگاه داده‌ی برهم‌کنش‌های پروتئین-پروتئین. شبکه‌های عملکردی و مسیرهای سلولی را نشان می‌دهد.',
    tags:['برهم‌کنش','شبکه','پروتئین'],
    url:'https://string-db.org/'
  },
  {
    id:'pfam',
    name:'Pfam',
    en:'Pfam Protein Families',
    logo:'Pfam',
    logoClass:'amber',
    desc:'پایگاه داده‌ی خانواده‌های پروتئینی و دامنه‌های محفوظ. برای شناسایی عملکرد پروتئین‌های ناشناخته کاربرد دارد.',
    tags:['خانواده پروتئین','دامنه','موتیف'],
    url:'https://www.ebi.ac.uk/interpro/'
  }
];

/* ===== Tools data ===== */
const TOOLS = [
  {
    id:'blast',
    name:'BLAST',
    en:'Basic Local Alignment Search Tool',
    logo:'BLAST',
    logoClass:'',
    desc:'پرکاربردترین ابزار جستجوی تشابه توالی. یک توالی را با تمام پایگاه داده مقایسه می‌کند و نزدیک‌ترین همولوگ‌ها را پیدا می‌کند.',
    tags:['هم‌ترازی محلی','جستجو','همولوگ'],
    url:'https://blast.ncbi.nlm.nih.gov/Blast.cgi'
  },
  {
    id:'clustal',
    name:'Clustal Omega',
    en:'Clustal Omega',
    logo:'Clustal',
    logoClass:'green',
    desc:'ابزار هم‌ترازی چندگانه‌ی توالی‌ها. برای مقایسه‌ی چند توالی همزمان و ساخت درخت فیلوژنتیک استفاده می‌شود.',
    tags:['هم‌ترازی چندگانه','فیلوژنی'],
    url:'https://www.ebi.ac.uk/Tools/msa/clustalo/'
  },
  {
    id:'primer3',
    name:'Primer3',
    en:'Primer3',
    logo:'P3',
    logoClass:'purple',
    desc:'ابزار طراحی پرایمر برای PCR. با در نظر گرفتن پارامترهای مختلف مانند Tm، GC content و احتمال تشکیل دایمر، بهترین پرایمرها را پیشنهاد می‌دهد.',
    tags:['PCR','پرایمر','طراحی'],
    url:'https://primer3.ut.ee/'
  },
  {
    id:'swissmodel',
    name:'SWISS-MODEL',
    en:'SWISS-MODEL',
    logo:'SWISS',
    logoClass:'amber',
    desc:'ابزار مدل‌سازی همولوژی ساختار پروتئین. بر اساس تشابه توالی با پروتئین‌های شناخته‌شده، ساختار سه‌بعدی پیش‌بینی می‌کند.',
    tags:['مدل‌سازی','همولوژی','ساختار'],
    url:'https://swissmodel.expasy.org/'
  },
  {
    id:'alphafold',
    name:'AlphaFold',
    en:'AlphaFold Protein Structure Database',
    logo:'AF',
    logoClass:'red',
    desc:'پایگاه داده‌ی پیش‌بینی ساختار پروتئین با هوش مصنوعی. ساختار بیش از ۲۰۰ میلیون پروتئین را فراهم می‌کند.',
    tags:['هوش مصنوعی','پیش‌بینی','ساختار'],
    url:'https://alphafold.ebi.ac.uk/'
  },
  {
    id:'expasy',
    name:'ExPASy',
    en:'Expert Protein Analysis System',
    logo:'ExPASy',
    logoClass:'',
    desc:'مجموعه‌ای از ابزارهای تحلیل پروتئین: محاسبه وزن مولکولی، نقطه ایزوالکتریک، نقشه‌ی پپتیدی و بسیاری دیگر.',
    tags:['آنالیز پروتئین','وزن مولکولی','pI'],
    url:'https://www.expasy.org/'
  }
];

/* ===== Format examples ===== */
const FORMATS = {
  fasta:{
    code:`>sp|P01308|INS_HUMAN Insulin OS=Homo sapiens
MALWMRLLPLLALLALWGPDPAAAFVNQHLCGSHLVEALYLVCGERGFFYTPKT
RREAEDLQVGQVELGGGPGAGSLQPLALEGSLQKRGIVEQCCTSICSLYQLENYCN`,
    note:'فرمت FASTA: هر توالی با یک خط توضیحات (شروع با <b>&gt;</b>) شروع می‌شود، سپس توالی در خطوط بعدی. ساده‌ترین و پرکاربردترین فرمت بیوانفورماتیک.'
  },
  fastq:{
    code:`@SRR001666.1 071112_SLXA-EAS1_s_7:5:1:817:345 length=36
GGGTGATGGCCGCTGCCGATGGCGTCAAATCCCACC
+SRR001666.1 071112_SLXA-EAS1_s_7:5:1:817:345 length=36
IIIIIIIIIIIIIIIIIIIIIIIIIIIIII9IG9IC`,
    note:'فرمت FASTQ: هر خوانش در ۴ خط ذخیره می‌شود — خط ۱ با <b>@</b>، خط ۲ توالی، خط ۳ با <b>+</b>، خط ۴ کیفیت فِرِد (Phred). برای داده‌های NGS استاندارد است.'
  },
  genbank:{
    code:`LOCUS       SCU49845     5028 bp    DNA     circular  PLN  21-JUN-1999
DEFINITION  Saccharomyces cerevisiae TCP1-beta gene.
ACCESSION   U49845
VERSION     U49845.1  GI:1293613
SOURCE      Saccharomyces cerevisiae (baker's yeast)
  ORGANISM  Saccharomyces cerevisiae
            Eukaryota; Fungi; Ascomycota; Saccharomycotina.
FEATURES             Location/Qualifiers
     source          1..5028
     gene            687..3158
ORIGIN
        1 gatcctccat atacaacggt atctccacct caggtttaga tctcaacaac ggaaccattg`,
    note:'فرمت GenBank: شامل چند بخش است — LOCUS، DEFINITION، ACCESSION، FEATURES (حاشیه‌نویسی) و ORIGIN (توالی). فرمت استاندارد NCBI برای ذخیره‌ی کامل اطلاعات توالی.'
  },
  pdb:{
    code:`HEADER    OXYGEN TRANSPORT                         27-FEB-84   4HHB
TITLE     THE CRYSTAL STRUCTURE OF HUMAN DEOXYHAEMOGLOBIN
COMPND    MOL_ID: 1;
COMPND   2 MOLECULE: HEMOGLOBIN ALPHA CHAIN;
ATOM      1  N   VAL A   1      22.107  14.245  16.179  1.00 49.16           N
ATOM      2  CA  VAL A   1      21.900  13.123  15.234  1.00 45.30           C
ATOM      3  C   VAL A   1      21.872  11.842  15.978  1.00 42.37           C
HELIX    1   1 VAL A    5  THR A   14  1                                  10`,
    note:'فرمت PDB: شامل رکوردهای HEADER، TITLE، ATOM (مختصات اتم‌ها)، HELIX و SHEET. فرمت استاندارد بانک داده پروتئین برای ذخیره‌ی ساختار سه‌بعدی.'
  },
  vcf:{
    code:`##fileformat=VCFv4.2
##reference=file:///seq/references/1000GenomesPilot-NCBI36.fasta
#CHROM  POS     ID      REF  ALT     QUAL  FILTER  INFO
chr1    873762  rs123   G    A       100   PASS    AF=0.5
chr2    124567  rs456   CT   C       85    PASS    DP=14
chr3    98321   .       A    T       60    q10     AF=0.02`,
    note:'فرمت VCF: برای ذخیره‌ی واریانت‌های ژنتیکی (SNP، Indel). هر خط یک واریانت است: کروموزوم، موقعیت، REF، ALT، کیفیت و اطلاعات. استاندارد برای داده‌های ژنومیک.'
  }
};

/* ============================================================
   Render functions
   ============================================================ */
function renderDatabases(filter=''){
  const q = filter.trim().toLowerCase();
  const list = DATABASES.filter(d =>
    !q || d.name.toLowerCase().includes(q) ||
    d.en.toLowerCase().includes(q) ||
    d.desc.toLowerCase().includes(q)
  );
  const grid = document.getElementById('dbGrid');
  if(!list.length){
    grid.innerHTML = '<div class="empty" style="grid-column:1/-1;text-align:center;padding:40px;color:#64748b;">پایگاه داده‌ای با این عبارت پیدا نشد.</div>';
    return;
  }
  grid.innerHTML = list.map(d => `
    <div class="db-card">
      <div class="db-head">
        <div class="db-logo ${d.logoClass}">${d.logo}</div>
        <div>
          <h4>${d.name}</h4>
          <div class="db-en">${d.en}</div>
        </div>
      </div>
      <p class="db-desc">${d.desc}</p>
      <div class="db-tags">
        ${d.tags.map(t => `<span class="db-tag">${t}</span>`).join('')}
      </div>
      <a href="${d.url}" target="_blank" rel="noopener" class="db-link">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        بازدید
      </a>
    </div>
  `).join('');
}

function renderTools(){
  const grid = document.getElementById('toolsGrid');
  grid.innerHTML = TOOLS.map(t => `
    <div class="db-card">
      <div class="db-head">
        <div class="db-logo ${t.logoClass}">${t.logo}</div>
        <div>
          <h4>${t.name}</h4>
          <div class="db-en">${t.en}</div>
        </div>
      </div>
      <p class="db-desc">${t.desc}</p>
      <div class="db-tags">
        ${t.tags.map(tag => `<span class="db-tag">${tag}</span>`).join('')}
      </div>
      <a href="${t.url}" target="_blank" rel="noopener" class="db-link">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        استفاده
      </a>
    </div>
  `).join('');
}

function renderFormat(key){
  const f = FORMATS[key];
  if(!f) return;
  // Escape HTML but keep the code monospace
  const escaped = f.code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  document.getElementById('formatContent').innerHTML =
    `<div class="code-line">${escaped}</div>`;
  document.getElementById('formatNote').innerHTML = f.note;
}

/* ============================================================
   UI Handlers
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Initial render
  renderDatabases();
  renderTools();
  renderFormat('fasta');

  // Scroll to #tools if URL hash is #tools
  if(window.location.hash === '#tools'){
    setTimeout(() => {
      const toolsSection = document.getElementById('tools');
      if(toolsSection) toolsSection.scrollIntoView({behavior:'smooth', block:'start'});
    }, 300);
  }

  // Search
  document.getElementById('dbSearch').addEventListener('input', e => {
    renderDatabases(e.target.value);
  });

  // Format tabs
  document.querySelectorAll('#formatTabs button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#formatTabs button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderFormat(btn.dataset.format);
    });
  });
});