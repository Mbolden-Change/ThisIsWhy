// ── Sticky price ticker ──
  const hookSection = document.getElementById('hook');
  const stickyTicker = document.getElementById('sticky-ticker');
  const tickerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => stickyTicker.classList.toggle('visible', !entry.isIntersecting));
  }, { threshold: 0.1 });
  if (hookSection) tickerObserver.observe(hookSection);

  // ── Scroll reveal ──
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ── Indictment moment uses the existing revealObserver above ──

  // ── Villain modal system ──
  const villainData = {
    groceries: {
      domain: 'Groceries',
      names: 'JBS · Tyson · Cargill · National Beef · Algorithmic Pricing',
      stats: [
        { num: '85%', label: 'of beef processing controlled by four companies' },
        { num: '+23.6%', label: 'grocery prices since 2020' }
      ],
      narrative: 'Your cart costs $40 more a month. Linda, 62, chooses between blood pressure meds and a full week of meals. Four companies set the price of beef for 330 million people. Congress just cut the only program — <strong>SNAP</strong> — that pushed back. Now the pricing is going digital. Instacart charges different customers different prices for identical items — the FTC is investigating. Kroger and Walmart are installing digital shelf labels that adjust prices in real time. Consolidation set the floor. Algorithms are raising the ceiling.',
      sources: 'CBO SNAP scoring · USDA ERS/BLS CPI · White House/Farm Action (beef concentration) · FTC (Instacart investigation) · Commonwealth Fund'
    },
    healthcare: {
      domain: 'Healthcare',
      names: 'Consolidated Hospital Systems · No Competition · No Oversight',
      stats: [
        { num: '$27K', label: 'average family premium per year' },
        { num: '100M', label: 'Americans carrying medical debt' }
      ],
      narrative: 'Maria\'s rural hospital closed — not enough Medicaid revenue. The nearest hospital raised prices <strong>3.6%</strong> because there\'s no competition left. David\'s family premium is $27K with a $6K deductible. He has "good" insurance. Different lives, same consolidated system setting prices with no accountability.',
      sources: 'CBO Medicaid scoring · KFF 2025 Employer Health Benefits Survey · Peterson-KFF/CFPB (medical debt) · AHA hospital closure data'
    },
    housing: {
      domain: 'Housing',
      names: 'Institutional Investors · RealPage Algorithm · Tech-Driven Displacement · Decades of Underbuilding',
      stats: [
        { num: '$422K', label: 'median home — up 50% in 5 years' },
        { num: '25%', label: 'of rentals owned by institutional investors in some markets' }
      ],
      narrative: 'Nina\'s rent went up $200 this month. Her landlord didn\'t renovate anything — <strong>RealPage\'s algorithm</strong> told every major landlord in her zip code to raise rents simultaneously. James\'s daughter is a credentialed teacher who will never afford to buy. The same investors driving up his property values are pricing her out entirely. And the displacement has an engine: every major tech campus announcement drives home prices up 7% in surrounding neighborhoods. Google, Apple, and Meta pledged billions for housing — while creating jobs that outpace new units 8 to 1. The pattern exports wherever tech expands.',
      sources: 'NAR Q2 2024 · DOJ v. RealPage (Aug 2024) · Census ACS 2024/Harvard JCHS · GAO (institutional investors) · San Jose city planning (Google campus)'
    },
    childcare: {
      domain: 'Childcare',
      names: '$15/hr Workforce · Vanishing Subsidies · Tens of Thousands of Programs Closed',
      stats: [
        { num: '$26K', label: 'annual cost for two kids' },
        { num: '$3/hr', label: 'Priya\'s net take-home after childcare' }
      ],
      narrative: 'Priya ran the numbers. After childcare and taxes, her second income nets <strong>$3 an hour</strong>. She\'s working full-time for free. The entire system depends on workers earning $15/hr and subsidies that just got cut. When it collapses, every family — at every income level — scrambles for the same disappearing spots.',
      sources: 'Child Care Aware 2024 · Care.com/Dept of Labor · CLASP (closures) · National Women\'s Law Center · BLS (worker wages)'
    },
    wages: {
      domain: 'The Wage Gap',
      names: 'Corporate Profits Outpaced Wages Nearly 4 to 1 Since 1979 · Gig Economy · Contractor Classification',
      stats: [
        { num: '4:1', label: 'profit growth vs. wage growth ratio' },
        { num: '12 yrs', label: 'to save a down payment — was 3' }
      ],
      narrative: 'Tyler earns $72K with a CS degree and saves $200 a month. His parents are subsidizing his car insurance at 55. The difference between what companies earned and what they paid went to shareholders. Housing, healthcare, childcare, and education all inflated faster than any salary. The gig economy didn\'t just create new jobs — it reclassified old ones. Uber, Lyft, DoorDash, and Instacart turned millions of workers into "independent contractors" to avoid minimum wage, overtime, and benefits. Tech companies spent over <strong>$200 million</strong> on Prop 22 in California alone to keep it that way. The same companies have fought unionization at warehouses, delivery hubs, and retail stores. The industry that talks most about disruption worked hardest to make sure workers couldn\'t organize against it. The ladder is pulling up behind an entire generation.',
      sources: 'EPI (wage-productivity gap) · BLS · Savings.com 2025 / Bankrate 2024 (parent costs) · CA Secretary of State (Prop 22) · Federal Reserve'
    },
    education: {
      domain: 'Education',
      names: 'SAVE Plan Killed · Credential Inflation · Defunded Public Education',
      stats: [
        { num: '$1.83T', label: 'total outstanding student debt' },
        { num: '27%', label: 'of tuition covered by Pell Grants today (was 80% in 1975)' },
        { num: '1 in 8', label: 'teaching positions unfilled or filled by uncertified teachers' }
      ],
      narrative: 'Tyler graduated with $38K in debt and saves $200 a month. His parents subsidize his bills at 55. Twenty minutes away, a kid just as sharp is stocking shelves for $17/hr — his high school lost three math teachers in two years. Pell Grants that once covered 80% of tuition now cover <strong>27%</strong>. The job he\'s qualified for now says "bachelor\'s preferred." The SAVE repayment plan was killed and aggressive collections restarted on <strong>28 million borrowers</strong>. Tuition has increased <strong>1,200%</strong> since 1980. The crisis isn\'t just about debt. It\'s about an economy that made credentials mandatory and then made them unaffordable.',
      sources: 'Federal Reserve/FSA (student debt) · Protect Borrowers (SAVE impact) · NCES (Pell Grant coverage) · BLS (teacher vacancies)'
    },
    energy: {
      domain: 'Energy & Environment',
      names: 'Fossil Fuel Subsidies · AI Data Centers · Deregulation as Cost Shift',
      stats: [
        { num: '$35B/yr', label: 'federal subsidies to fossil fuel industry' },
        { num: '$183B', label: '2024 weather disaster costs' },
        { num: '100:1', label: 'lobbying return on investment' }
      ],
      narrative: 'The fossil fuel industry receives <strong>$35 billion a year</strong> in federal subsidies and spent <strong>$219 million</strong> to influence the 2024 election. They got $40 billion more in 2025. Solar and wind are now 41–53% cheaper than fossil fuels. Rolling back environmental regulations doesn\'t lower your bills — it lowers costs for the companies that raised them. Repealing EPA carbon standards will cost households <strong>$130 billion</strong> in health impacts. The Clean Air Act returned $10 for every $1 spent. Deregulation reverses that math. Meanwhile, AI data centers consume 4% of all U.S. electricity and are driving up bills in communities across the country. In 2024, 27 billion-dollar weather disasters caused <strong>$183 billion</strong> in damage. Insurance premiums rose 24%. They\'re not paying for the damage. You are.',
      sources: 'IMF/Oil Change Int\'l (subsidies) · IRENA/Lazard (renewables cost) · IEA (data centers) · NOAA (weather disasters) · Consumer Federation of America (insurance) · EPA (Clean Air Act ROI)'
    }
  };
  const overlay = document.getElementById('villain-modal-overlay');
  const modal = document.getElementById('villain-modal');
  function openVillain(key) {
    const d = villainData[key]; if (!d) return;
    document.getElementById('vm-domain').textContent = d.domain;
    document.getElementById('vm-names').textContent = d.names;
    document.getElementById('vm-stats').innerHTML = d.stats.map(s =>
      '<div><span class="villain-modal-stat-num">' + s.num + '</span><span class="villain-modal-stat-label">' + s.label + '</span></div>'
    ).join('');
    document.getElementById('vm-narrative').innerHTML = d.narrative + (d.sources ? '<p style="margin-top:20px;padding-top:16px;border-top:1px solid rgba(255,255,255,0.08);font-size:11px;color:#555;font-style:italic;">Sources: ' + d.sources + '</p>' : '');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeVillain() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
  document.querySelectorAll('.villain-index-row').forEach(row => {
    row.addEventListener('click', () => openVillain(row.dataset.villain));
    row.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openVillain(row.dataset.villain); } });
  });
  document.getElementById('villain-modal-close').addEventListener('click', closeVillain);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeVillain(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeVillain(); });

  // ── Receipt printing ──
  const receiptContainer = document.getElementById('receipt-container');
  let receiptPrinted = false;
  const receiptObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !receiptPrinted) {
        receiptPrinted = true;
        const leftItems = receiptContainer.querySelectorAll('.receipt-left .receipt-item');
        const rightItems = receiptContainer.querySelectorAll('.receipt-right .receipt-item');
        const pairs = Math.max(leftItems.length, rightItems.length);
        for (let i = 0; i < pairs; i++) {
          const delay = i * 400;
          if (leftItems[i]) setTimeout(() => leftItems[i].classList.add('printed'), delay);
          if (rightItems[i]) setTimeout(() => rightItems[i].classList.add('printed'), delay + 100);
        }
        receiptObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  if (receiptContainer) receiptObserver.observe(receiptContainer);

  // ── Receipt row-height sync (equalise left/right items) ──
  function syncReceiptRows() {
    if (window.innerWidth <= 768) return; // skip on mobile (stacked)
    const left = document.querySelectorAll('.receipt-left .receipt-item');
    const right = document.querySelectorAll('.receipt-right .receipt-item');
    const pairs = Math.min(left.length, right.length);
    for (let i = 0; i < pairs; i++) {
      left[i].style.minHeight = '';
      right[i].style.minHeight = '';
      const h = Math.max(left[i].offsetHeight, right[i].offsetHeight);
      left[i].style.minHeight = h + 'px';
      right[i].style.minHeight = h + 'px';
    }
  }
  // run after fonts load
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(syncReceiptRows);
  } else {
    window.addEventListener('load', syncReceiptRows);
  }
  window.addEventListener('resize', syncReceiptRows);

  // ── Carousel init (shared) ──
  function initCarousel(trackId, dotsId, prevId, nextId) {
    const track = document.getElementById(trackId);
    const dots = document.querySelectorAll('#' + dotsId + ' > div');
    const prevBtn = document.getElementById(prevId);
    const nextBtn = document.getElementById(nextId);
    if (!track) return;
    function getCardWidth() {
      const card = track.children[0];
      return card ? card.offsetWidth + 24 : 400;
    }
    function getCurrentIndex() { return Math.round(track.scrollLeft / getCardWidth()); }
    function scrollToCard(index) { track.scrollTo({ left: index * getCardWidth(), behavior: 'smooth' }); }
    function updateDots() {
      const idx = getCurrentIndex();
      dots.forEach((dot, i) => dot.classList.toggle('active', i === idx));
    }
    if (prevBtn) prevBtn.addEventListener('click', () => scrollToCard(Math.max(0, getCurrentIndex() - 1)));
    if (nextBtn) nextBtn.addEventListener('click', () => scrollToCard(Math.min(dots.length - 1, getCurrentIndex() + 1)));
    track.addEventListener('scroll', () => requestAnimationFrame(updateDots));
  }
  initCarousel('carousel-track', 'carousel-dots', 'carousel-prev', 'carousel-next');

  // ── Card expand/collapse ──
  document.querySelectorAll('.carousel-card').forEach(card => {
    const preview = card.querySelector('.card-preview');
    if (preview) preview.addEventListener('click', () => card.classList.toggle('expanded'));
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.classList.toggle('expanded'); } });
  });

  // ── Populate share URLs on load ──
  (function() {
    const url = encodeURIComponent(window.location.href);
    document.querySelectorAll('.share-btn[href*="twitter.com"]').forEach(a => {
      a.href = a.href.replace('&url=', '&url=' + url);
    });
    document.querySelectorAll('.share-btn[href^="mailto:"]').forEach(a => {
      a.href = a.href.replace(/%3A%20$/, '%3A%20' + url);
    });
    // Update OG meta with canonical URL
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage && !ogImage.content.startsWith('http')) {
      ogImage.content = window.location.origin + window.location.pathname.replace(/[^/]*$/, '') + ogImage.content;
    }
  })();