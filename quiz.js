/* ============================================================
   Glossary + Quiz Module
   ============================================================ */

/* ===== Glossary data (30+ terms) ===== */
const GLOSSARY = [
  // -- DNA/RNA
  { en:'DNA', fa:'دی‌ان‌ای', cat:'dna', def:'دئوکسی‌ریبو نوکلئیک اسید؛ مولکول حامل اطلاعات ژنتیکی که از دو رشته‌ی مکمل تشکیل شده و ساختمان مارپیچ دوگانه دارد.' },
  { en:'RNA', fa:'آر‌ان‌ای', cat:'dna', def:'ریبو نوکلئیک اسید؛ معمولاً تک‌رشته‌ای و شامل یوراسیل (U) به‌جای تیمین (T). انواع: mRNA، tRNA، rRNA.' },
  { en:'Nucleotide', fa:'نوکلئوتید', cat:'dna', def:'واحد سازنده‌ی اسیدهای نوکلئیک، شامل قند (ریبوز یا دئوکسی‌ریبوز)، باز نیتروژنی و گروه فسفات.' },
  { en:'Codon', fa:'کدون', cat:'dna', def:'سه نوکلئوتید متوالی که یک آمینواسید خاص را رمزگذاری می‌کنند. ۶۴ کدون ممکن وجود دارد.' },
  { en:'Gene', fa:'ژن', cat:'dna', def:'بخشی از DNA که اطلاعات ساخت یک پروتئین یا RNA را در خود دارد.' },
  { en:'Genome', fa:'ژنوم', cat:'dna', def:'مجموعه‌ی کامل اطلاعات ژنتیکی یک موجود زنده.' },
  { en:'Exon', fa:'اگزون', cat:'dna', def:'بخشی از ژن که در mRNA نهایی باقی می‌ماند و پروتئین را رمزگذاری می‌کند.' },
  { en:'Intron', fa:'اینترون', cat:'dna', def:'بخشی از ژن که در فرآیند پیرایش (Splicing) حذف می‌شود و در mRNA بالغ حضور ندارد.' },
  { en:'Promoter', fa:'پروموتر', cat:'dna', def:'ناحیه‌ای از DNA که به آن RNA پلیمراز متصل می‌شود و رونویسی را آغاز می‌کند.' },
  { en:'Mutation', fa:'جهش', cat:'dna', def:'تغییر در توالی DNA. انواع: جانشینی، حذف، درج، جابه‌جایی.' },
  { en:'SNP', fa:'اس‌ان‌پی', cat:'dna', def:'Single Nucleotide Polymorphism؛ تغییر یک نوکلئوتید در توالی که در جمعیت شایع است.' },

  // -- Protein
  { en:'Amino Acid', fa:'آمینواسید', cat:'protein', def:'واحد سازنده‌ی پروتئین. ۲۰ آمینواسید استاندارد وجود دارد که با پیوند پپتیدی به هم متصل می‌شوند.' },
  { en:'Peptide Bond', fa:'پیوند پپتیدی', cat:'protein', def:'پیوند کووالانسی بین گروه کربوکسیل یک آمینواسید و گروه آمین آمینواسید بعدی.' },
  { en:'Protein', fa:'پروتئین', cat:'protein', def:'پلیمری از آمینواسیدها که ساختار و عملکرد سلول را تعیین می‌کند.' },
  { en:'Alpha Helix', fa:'مارپیچ آلفا', cat:'protein', def:'ساختار دوم پروتئین؛ مارپیچ راست‌گرد که با پیوندهای هیدروژنی داخل زنجیره تثبیت می‌شود.' },
  { en:'Beta Sheet', fa:'صفحه بتا', cat:'protein', def:'ساختار دوم پروتئین؛ صفحات تاشده که با پیوندهای هیدروژنی بین زنجیره‌ها تثبیت می‌شوند.' },
  { en:'Denaturation', fa:'دناتوره شدن', cat:'protein', def:'از دست دادن ساختار سه‌بعدی پروتئین با حرارت، pH یا مواد شیمیایی، بدون شکستن پیوندهای پپتیدی.' },
  { en:'Domain', fa:'دامنه', cat:'protein', def:'بخش عملکردی مستقل پروتئین که می‌تواند به‌طور جداگانه تاشده و عمل کند.' },
  { en:'Motif', fa:'موتیف', cat:'protein', def:'الگوی کوتاه و محفوظ از آمینواسیدها با عملکرد خاص (مثل موتیف اتصال به DNA).' },

  // -- Alignment
  { en:'Alignment', fa:'هم‌ترازی', cat:'alignment', def:'چیدن دو یا چند توالی در کنار هم به‌طوری که نواحی مشابه در یک ستون قرار بگیرند.' },
  { en:'Global Alignment', fa:'هم‌ترازی سراسری', cat:'alignment', def:'هم‌ترازی کل طول دو توالی. الگوریتم: Needleman-Wunsch.' },
  { en:'Local Alignment', fa:'هم‌ترازی محلی', cat:'alignment', def:'یافتن بهترین ناحیه‌ی مشابه در دو توالی. الگوریتم: Smith-Waterman.' },
  { en:'Gap', fa:'شکاف', cat:'alignment', def:'فاصله‌ای که در هم‌ترازی به‌خاطر حذف یا درج نوکلئوتید/آمینواسید ایجاد می‌شود.' },
  { en:'BLAST', fa:'بلاست', cat:'alignment', def:'Basic Local Alignment Search Tool؛ ابزار جستجوی تشابه توالی در پایگاه داده.' },
  { en:'Homology', fa:'همولوژی', cat:'alignment', def:'شباهت توالی بین دو ژن یا پروتئین که نشان‌دهنده‌ی منشأ تکاملی مشترک است.' },
  { en:'Identity', fa:'شباهت', cat:'alignment', def:'درصد نوکلئوتید یا آمینواسیدهای یکسان در دو توالی هم‌ترازی‌شده.' },

  // -- Databases
  { en:'NCBI', fa:'ان‌سی‌بی‌آی', cat:'database', def:'National Center for Biotechnology Information؛ بزرگ‌ترین پایگاه داده‌ی زیستی جهان.' },
  { en:'GenBank', fa:'جن‌بانک', cat:'database', def:'پایگاه داده‌ی توالی‌های نوکلئوتیدی که توسط NCBI نگهداری می‌شود.' },
  { en:'UniProt', fa:'یونی‌پروت', cat:'database', def:'پایگاه داده‌ی جامع توالی و اطلاعات عملکردی پروتئین‌ها.' },
  { en:'PDB', fa:'پی‌دی‌بی', cat:'database', def:'Protein Data Bank؛ پایگاه داده‌ی ساختارهای سه‌بعدی پروتئین‌ها.' },
  { en:'Ensembl', fa:'اِنسِمبل', cat:'database', def:'مرورگر ژنوم مهره‌داران با ابزارهای مقایسه‌ای و حاشیه‌نویسی.' },
  { en:'KEGG', fa:'کِگ', cat:'database', def:'پایگاه داده‌ی مسیرهای متابولیکی، بیماری‌ها و داروها.' },
  { en:'PubMed', fa:'پاب‌مد', cat:'database', def:'پایگاه داده‌ی مقالات علمی پزشکی و زیست‌شناسی.' },

  // -- File formats
  { en:'FASTA', fa:'فستا', cat:'format', def:'فرمت ساده‌ی ذخیره‌ی توالی؛ خط توضیحات با > و توالی در خطوط بعدی.' },
  { en:'FASTQ', fa:'فست‌کیو', cat:'format', def:'فرمت داده‌های NGS؛ شامل توالی و کیفیت هر خوانش.' },
  { en:'GenBank Format', fa:'فرمت جن‌بانک', cat:'format', def:'فرمت استاندارد NCBI شامل LOCUS، FEATURES و ORIGIN.' },
  { en:'VCF', fa:'وی‌سی‌اف', cat:'format', def:'Variant Call Format؛ فرمت ذخیره‌ی واریانت‌های ژنتیکی.' }
];

/* ===== Quiz questions ===== */
const QUESTIONS = [
  {
    q:'در فرآیند رونویسی (Transcription)، کدام باز نیتروژنی در RNA جایگزین تیمین (T) می‌شود؟',
    options:['آدنین (A)','گوانین (G)','سیتوزین (C)','یوراسیل (U)'],
    correct:3,
    explanation:'در RNA، باز تیمین (T) با یوراسیل (U) جایگزین می‌شود. آدنین در DNA با تیمین جفت می‌شود، در حالی که در RNA با یوراسیل جفت می‌شود.'
  },
  {
    q:'کدون شروع (Start Codon) در ترجمه‌ی پروتئین کدام است؟',
    options:['AUG','UAA','UAG','UGA'],
    correct:0,
    explanation:'کدون AUG (در DNA: ATG) کدون شروع ترجمه است و آمینواسید متیونین را رمزگذاری می‌کند. کدون‌های UAA، UAG و UGA کدون‌های توقف هستند.'
  },
  {
    q:'الگوریتم Needleman-Wunsch چه نوع هم‌ترازی انجام می‌دهد؟',
    options:['هم‌ترازی محلی','هم‌ترازی سراسری','هم‌ترازی چندگانه','هم‌ترازی ساختاری'],
    correct:1,
    explanation:'Needleman-Wunsch یک الگوریتم برنامه‌ریزی پویا برای هم‌ترازی سراسری (Global) است که کل طول دو توالی را پوشش می‌دهد. Smith-Waterman برای هم‌ترازی محلی است.'
  },
  {
    q:'در الگوریتم Smith-Waterman، اگر امتیاز یک خانه منفی شود، چه مقداری به آن داده می‌شود؟',
    options:['همان مقدار منفی','صفر','بی‌نهایت','حذف می‌شود'],
    correct:1,
    explanation:'در Smith-Waterman (هم‌ترازی محلی)، هر مقدار منفی به صفر تبدیل می‌شود. این ویژگی باعث می‌شود هم‌ترازی از هر نقطه‌ای شروع شود و ناحیه‌ی بهینه را پیدا کند.'
  },
  {
    q:'درصد GC در توالی "ATGCGTACG" چقدر است؟',
    options:['۳۳٪','۴۴٪','۵۵٪','۶۶٪'],
    correct:1,
    explanation:'توالی ۹ نوکلئوتیدی ATGCGTACG شامل ۴ باز G یا C (G، C، G، C) است. محاسبه: ۴ ÷ ۹ × ۱۰۰ ≈ ۴۴.۴٪.'
  },
  {
    q:'کدام فرمت فایل برای ذخیره‌ی داده‌های توالی‌یابی نسل جدید (NGS) استفاده می‌شود؟',
    options:['FASTA','FASTQ','GenBank','PDB'],
    correct:1,
    explanation:'فرمت FASTQ برای داده‌های NGS طراحی شده و علاوه بر توالی، امتیاز کیفیت هر باز را نیز ذخیره می‌کند. FASTA فقط توالی را ذخیره می‌کند.'
  },
  {
    q:'پایگاه داده UniProt چه نوع داده‌ای را ذخیره می‌کند؟',
    options:['توالی DNA','ساختار سه‌بعدی','توالی و اطلاعات پروتئین','مسیرهای متابولیکی'],
    correct:2,
    explanation:'UniProt (Universal Protein Resource) پایگاه داده‌ی جامع توالی پروتئین‌ها به‌همراه اطلاعات عملکردی، ساختاری و حاشیه‌نویسی آن‌ها است.'
  },
  {
    q:'در ساختار پروتئین، مارپیچ آلفا (α-helix) و صفحه بتا (β-sheet) جزء کدام سطح هستند؟',
    options:['ساختار اولیه','ساختار دوم','ساختار سوم','ساختار چهارم'],
    correct:1,
    explanation:'مارپیچ آلفا و صفحه بتا ساختارهای دوم پروتئین هستند که از پیوندهای هیدروژنی بین آمینواسیدهای اسکلت پپتیدی تشکیل می‌شوند.'
  },
  {
    q:'کدام پایگاه داده ساختار سه‌بعدی پروتئین‌ها را ذخیره می‌کند؟',
    options:['GenBank','Ensembl','PDB','KEGG'],
    correct:2,
    explanation:'PDB (Protein Data Bank) پایگاه داده‌ی اصلی ساختارهای سه‌بعدی پروتئین‌ها و اسیدهای نوکلئیک است که با کریستالوگرافی، NMR یا Cryo-EM به‌دست آمده‌اند.'
  },
  {
    q:'در هم‌ترازی توالی، "Gap" به چه معناست؟',
    options:['خطای توالی‌یابی','فاصله‌ی ناشی از حذف یا درج','ناحیه‌ی بدون ژن','کدون توقف'],
    correct:1,
    explanation:'Gap (شکاف) در هم‌ترازی نشان‌دهنده‌ی حذف یا درج نوکلئوتید/آمینواسید است. برای هم‌ترازی بهتر توالی‌های همولوگ، شکاف‌هایی وارد می‌شود.'
  },
  {
    q:'کدام ابزار برای جستجوی تشابه توالی در پایگاه داده استفاده می‌شود؟',
    options:['Primer3','Clustal Omega','BLAST','SWISS-MODEL'],
    correct:2,
    explanation:'BLAST (Basic Local Alignment Search Tool) پرکاربردترین ابزار برای جستجوی تشابه توالی است. Primer3 برای طراحی پرایمر و Clustal برای هم‌ترازی چندگانه استفاده می‌شود.'
  },
  {
    q:'در ترجمه‌ی DNA، هر کدون چند نوکلئوتید دارد؟',
    options:['۱','۲','۳','۴'],
    correct:2,
    explanation:'هر کدون از ۳ نوکلئوتید تشکیل شده که یک آمینواسید را رمزگذاری می‌کند. با ۴ باز ممکن و ۳ موقعیت، ۴³ = ۶۴ کدون ممکن وجود دارد.'
  },
  {
    q:'تفاوت اصلی DNA و RNA در کدام مورد است؟',
    options:['نوع قند و باز نیتروژنی','طول مولکول','محل قرارگیری','رنگ مولکول'],
    correct:0,
    explanation:'DNA قند دئوکسی‌ریبوز و باز تیمین دارد، در حالی که RNA قند ریبوز و باز یوراسیل دارد. همچنین DNA معمولاً دو رشته‌ای و RNA تک‌رشته‌ای است.'
  },
  {
    q:'فرمت FASTA با کدام کاراکتر شروع می‌شود؟',
    options:['@','>','#','$'],
    correct:1,
    explanation:'در فرمت FASTA، خط توضیحات با کاراکتر ">" شروع می‌شود و پس از آن توالی در خطوط بعدی قرار می‌گیرد. FASTQ با "@" شروع می‌شود.'
  },
  {
    q:'کدام الگوریتم برای یافتن موتیف‌های مشابه در دو توالی بلند مناسب‌تر است؟',
    options:['Needleman-Wunsch','Smith-Waterman','هر دو یکسان','هیچ‌کدام'],
    correct:1,
    explanation:'Smith-Waterman برای هم‌ترازی محلی طراحی شده و نواحی مشابه (مثل موتیف‌ها) را در توالی‌های بلند پیدا می‌کند. Needleman-Wunsch کل توالی را هم‌ترازی می‌کند.'
  }
];

/* ===== Category metadata ===== */
const CATEGORIES = {
  all:      { label:'همه', color:'#059669' },
  dna:      { label:'DNA/RNA', color:'#2563eb' },
  protein:  { label:'پروتئین', color:'#7c3aed' },
  alignment:{ label:'هم‌ترازی', color:'#d97706' },
  database: { label:'پایگاه داده', color:'#dc2626' },
  format:   { label:'فرمت‌ها', color:'#0891b2' }
};

/* ============================================================
   Glossary rendering
   ============================================================ */
let currentCategory = 'all';
let currentSearch = '';

function renderCategoryChips(){
  const chips = document.getElementById('categoryChips');
  chips.innerHTML = Object.keys(CATEGORIES).map(key => {
    const c = CATEGORIES[key];
    const active = key === currentCategory ? 'active' : '';
    return `<button class="${active}" data-cat="${key}">${c.label}</button>`;
  }).join('');

  chips.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      currentCategory = btn.dataset.cat;
      renderCategoryChips();
      renderGlossary();
    });
  });
}

function renderGlossary(){
  const grid = document.getElementById('glossaryGrid');
  const q = currentSearch.trim().toLowerCase();

  const list = GLOSSARY.filter(t => {
    const matchCat = currentCategory === 'all' || t.cat === currentCategory;
    const matchSearch = !q ||
      t.en.toLowerCase().includes(q) ||
      t.fa.includes(q) ||
      t.def.includes(q);
    return matchCat && matchSearch;
  });

  if(!list.length){
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:40px;color:#64748b;">اصطلاحی با این مشخصات پیدا نشد.</div>';
    return;
  }

  grid.innerHTML = list.map(t => `
    <div class="term-card">
      <div class="term-en">${t.en}</div>
      <div class="term-fa">${t.fa}</div>
      <div class="term-def">${t.def}</div>
      <span class="term-cat">${CATEGORIES[t.cat].label}</span>
    </div>
  `).join('');
}

/* ============================================================
   Quiz engine
   ============================================================ */
let quizState = {
  order: [],
  current: 0,
  correct: 0,
  wrong: 0,
  answered: false
};

function shuffle(arr){
  const a = [...arr];
  for(let i=a.length-1; i>0; i--){
    const j = Math.floor(Math.random() * (i+1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function startQuiz(){
  quizState = {
    order: shuffle(QUESTIONS.map((_, i) => i)),
    current: 0,
    correct: 0,
    wrong: 0,
    answered: false
  };

  document.getElementById('quizIntro').classList.add('hidden');
  document.getElementById('resultScreen').classList.add('hidden');
  document.getElementById('quizProgress').classList.remove('hidden');
  document.getElementById('quizContainer').innerHTML = '';

  renderQuestion();
}

function renderQuestion(){
  const qIdx = quizState.order[quizState.current];
  const q = QUESTIONS[qIdx];
  const container = document.getElementById('quizContainer');

  // Update progress
  document.getElementById('qpText').textContent = `سوال ${(quizState.current + 1).toLocaleString('fa-IR')} از ${QUESTIONS.length.toLocaleString('fa-IR')}`;
  const pct = (quizState.current / QUESTIONS.length) * 100;
  document.getElementById('qpFill').style.width = pct + '%';
  document.getElementById('qpScore').textContent = `امتیاز: ${quizState.correct.toLocaleString('fa-IR')}`;

  // Options
  const letters = ['الف','ب','ج','د'];
  const optionsHTML = q.options.map((opt, i) => `
    <button class="option" data-idx="${i}">
      <span class="opt-letter">${letters[i]}</span>
      <span>${opt}</span>
    </button>
  `).join('');

  container.innerHTML = `
    <div class="question-card">
      <span class="q-num">سوال ${(quizState.current + 1).toLocaleString('fa-IR')}</span>
      <div class="q-text">${q.q}</div>
      <div class="options" id="optionsBox">
        ${optionsHTML}
      </div>
      <div id="feedbackBox"></div>
      <div class="quiz-actions">
        <span style="font-size:.78rem;color:#64748b;align-self:center;">گزینه‌ی درست را انتخاب کنید</span>
        <button class="action-btn primary hidden" id="btnNext">
          سوال بعدی
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transform:scaleX(-1);"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>
    </div>
  `;

  // Handle options
  container.querySelectorAll('.option').forEach(btn => {
    btn.addEventListener('click', () => handleAnswer(parseInt(btn.dataset.idx)));
  });

  // Handle next
  document.getElementById('btnNext').addEventListener('click', nextQuestion);

  quizState.answered = false;
}

function handleAnswer(selected){
  if(quizState.answered) return;
  quizState.answered = true;

  const qIdx = quizState.order[quizState.current];
  const q = QUESTIONS[qIdx];
  const isCorrect = selected === q.correct;

  // Disable all, mark correct/wrong
  document.querySelectorAll('.option').forEach((btn, i) => {
    btn.classList.add('disabled');
    if(i === q.correct) btn.classList.add('correct');
    else if(i === selected) btn.classList.add('wrong');
  });

  // Update score
  if(isCorrect) quizState.correct++;
  else quizState.wrong++;

  document.getElementById('qpScore').textContent = `امتیاز: ${quizState.correct.toLocaleString('fa-IR')}`;

  // Feedback
  const fb = document.getElementById('feedbackBox');
  const isLast = quizState.current === QUESTIONS.length - 1;
  fb.innerHTML = `
    <div class="feedback ${isCorrect ? 'correct' : 'wrong'}">
      <b>${isCorrect ? '✓ پاسخ صحیح!' : '✗ پاسخ نادرست'}</b><br>
      ${q.explanation}
    </div>
  `;

  // Show next button
  const btnNext = document.getElementById('btnNext');
  btnNext.classList.remove('hidden');
  if(isLast){
    btnNext.innerHTML = `مشاهده‌ی نتیجه
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`;
  }
}

function nextQuestion(){
  if(quizState.current < QUESTIONS.length - 1){
    quizState.current++;
    renderQuestion();
    document.querySelector('.question-card').scrollIntoView({behavior:'smooth', block:'start'});
  } else {
    showResult();
  }
}

function showResult(){
  const total = QUESTIONS.length;
  const pct = Math.round((quizState.correct / total) * 100);

  document.getElementById('quizContainer').innerHTML = '';
  document.getElementById('quizProgress').classList.add('hidden');
  document.getElementById('resultScreen').classList.remove('hidden');

  // Circle
  document.getElementById('resultCircle').style.setProperty('--pct', pct + '%');
  document.getElementById('rcScore').textContent = quizState.correct.toLocaleString('fa-IR');
  document.getElementById('rcTotal').textContent = `از ${total.toLocaleString('fa-IR')}`;

  // Stats
  document.getElementById('rsCorrect').textContent = quizState.correct.toLocaleString('fa-IR');
  document.getElementById('rsWrong').textContent = quizState.wrong.toLocaleString('fa-IR');
  document.getElementById('rsPct').textContent = pct.toLocaleString('fa-IR') + '٪';

  // Message
  let title, msg;
  if(pct >= 90){
    title = '🏆 عالی!';
    msg = 'دانش بیوانفورماتیک شما فوق‌العاده است. آماده‌ی مباحث پیشرفته‌تر هستید.';
  } else if(pct >= 70){
    title = '👏 خیلی خوب!';
    msg = 'دانش شما خوب است. برای تسلط کامل، بخش‌های اشتباه را مرور کنید.';
  } else if(pct >= 50){
    title = '📚 قابل قبول';
    msg = 'پایه‌ی خوبی دارید. پیشنهاد می‌کنم ماژول‌های آموزشی را دوباره مرور کنید.';
  } else {
    title = '💪 نیاز به تلاش بیشتر';
    msg = 'نگران نباشید! با مطالعه‌ی ماژول‌های آموزشی و تمرین دوباره، پیشرفت خواهید کرد.';
  }

  document.getElementById('resultTitle').textContent = title;
  document.getElementById('resultMessage').textContent = msg;

  document.getElementById('resultScreen').scrollIntoView({behavior:'smooth', block:'start'});
}

/* ============================================================
   Page tabs
   ============================================================ */
function switchPage(page){
  const glossary = document.getElementById('glossaryPage');
  const quiz = document.getElementById('quizPage');

  if(page === 'glossary'){
    glossary.classList.remove('hidden');
    quiz.classList.add('hidden');
  } else {
    glossary.classList.add('hidden');
    quiz.classList.remove('hidden');
  }

  document.querySelectorAll('#pageTabs button').forEach(b => {
    b.classList.toggle('active', b.dataset.page === page);
  });
}

/* ============================================================
   Init
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Tabs
  document.querySelectorAll('#pageTabs button').forEach(btn => {
    btn.addEventListener('click', () => switchPage(btn.dataset.page));
  });

  // Glossary
  renderCategoryChips();
  renderGlossary();

  document.getElementById('termSearch').addEventListener('input', e => {
    currentSearch = e.target.value;
    renderGlossary();
  });

  // Quiz
  document.getElementById('btnStartQuiz').addEventListener('click', startQuiz);
  document.getElementById('btnRestartQuiz').addEventListener('click', startQuiz);
});