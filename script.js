/**
 * ===================================================================
 * ANURAG KUSHWAHA - PORTFOLIO INTERACTIVITY SCRIPT
 * Features:
 *   1. Interactive Particle / Financial Signal Constellation Canvas
 *   2. Dynamic Typewriter Effect
 *   3. Interactive Quant Alpha Factor Lab & Live SVG Equity Curve
 *   4. ScrollSpy & Sticky Glassmorphism Header
 *   5. Mobile Drawer Toggle
 *   6. Contact Form Validation & Feedback
 *   7. Copy-to-Clipboard with Toast Notification
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Year in Footer
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Initialize Navigation & ScrollSpy
  initNavigation();

  // 3. Initialize Typewriter
  initTypewriter();

  // 4. Initialize Particle Canvas
  initParticleCanvas();

  // 5. Initialize Quant Alpha Lab
  initQuantLab();

  // 6. Initialize Contact Form & Clipboard
  initContactFeatures();
});

/* ===================================================================
   NAVIGATION & SCROLLSPY
   =================================================================== */
function initNavigation() {
  const header = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const backToTopBtn = document.getElementById('back-to-top');

  // Sticky Navbar blur transition on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // ScrollSpy active link detection
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile menu toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile nav when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Back to top button
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ===================================================================
   DYNAMIC TYPEWRITER EFFECT
   =================================================================== */
function initTypewriter() {
  const typewriterEl = document.getElementById('typewriter');
  if (!typewriterEl) return;

  const phrases = [
    'Quantitative Alpha Research 📈',
    'JavaScript & Web Development 💻',
    'Competitive BGMI LAN Tactics 🏆',
    'Building in 1st Year Undergrad 🚀'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function typeLoop() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      charIndex--;
      typewriterEl.textContent = currentPhrase.substring(0, charIndex);
      typingSpeed = 40;
    } else {
      charIndex++;
      typewriterEl.textContent = currentPhrase.substring(0, charIndex);
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      // Pause at end of phrase
      isDeleting = true;
      typingSpeed = 1800;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400;
    }

    setTimeout(typeLoop, typingSpeed);
  }

  typeLoop();
}

/* ===================================================================
   INTERACTIVE CANVAS (Particles & Financial Constellations)
   =================================================================== */
function initParticleCanvas() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width, height;
  let particles = [];
  const particleCount = 45;
  const maxDistance = 140;

  const mouse = {
    x: null,
    y: null,
    radius: 120
  };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.radius = Math.random() * 2 + 1;
      // Alternate between cyan and emerald tones
      this.color = Math.random() > 0.4 ? 'rgba(6, 182, 212, ' : 'rgba(16, 185, 129, ';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Bounce off screen borders
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse proximity interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const directionX = dx / dist;
          const directionY = dy / dist;
          this.x -= directionX * force * 1.5;
          this.y -= directionY * force * 1.5;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color + '0.7)';
      ctx.fill();
    }
  }

  // Populate particles
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Connect particles with lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const alpha = (1 - dist / maxDistance) * 0.22;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // Connect particles to mouse
    if (mouse.x !== null && mouse.y !== null) {
      for (let i = 0; i < particles.length; i++) {
        const dx = mouse.x - particles[i].x;
        const dy = mouse.y - particles[i].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const alpha = (1 - dist / mouse.radius) * 0.35;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    // Update & draw each particle
    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* ===================================================================
   QUANT ALPHA LAB (Interactive Factor Simulator & Equity Curve)
   =================================================================== */
const alphaData = {
  alpha1: {
    title: 'Alpha #101: Volume-Weighted Mean Reversion',
    category: 'Type: Reversion & Liquidity Dynamics',
    formula: 'rank(ts_decay_linear(correlation(vwap, volume, 10), 5)) * -1 + rank(close - ts_min(low, 20))',
    sharpe: '2.41',
    fitness: '2.15',
    returns: '26.8%',
    turnover: '18.4%',
    drawdown: '-3.8%',
    rationale: 'When large institutional volume drives prices to local extremes without sustained multi-day momentum, liquidity providers step in, causing a mean-reversion drift over the next 3 to 5 trading horizons.',
    curveSeed: [100, 102, 101, 105, 107, 106, 110, 114, 113, 118, 121, 120, 124, 128, 127, 131, 135, 134, 139, 143, 146, 150]
  },
  alpha2: {
    title: 'Alpha #42: Multi-Day Volatility Squeeze',
    category: 'Type: Volatility Breakout & Distribution',
    formula: '-1 * rank(delta(close, 3)) * rank(correlation(open, volume, 10)) / (ts_std(close, 20) + 1e-4)',
    sharpe: '2.18',
    fitness: '1.92',
    returns: '23.4%',
    turnover: '14.2%',
    drawdown: '-4.6%',
    rationale: 'Identifies assets experiencing abnormal volume compression ahead of directional volatility expansion, hedging exposure by shorting over-extended outliers.',
    curveSeed: [100, 101, 103, 102, 106, 108, 107, 111, 110, 115, 118, 117, 122, 125, 124, 129, 133, 131, 136, 140, 138, 144]
  },
  alpha3: {
    title: 'Alpha #77: Cross-Sectional Momentum Lag',
    category: 'Type: Statistical Momentum & Sector Neutrality',
    formula: 'rank(ts_rank(ts_decay_linear(returns(5), 10), 20)) - rank(industry_neutralize(ts_std(volume, 15), sector))',
    sharpe: '1.95',
    fitness: '1.78',
    returns: '21.2%',
    turnover: '22.1%',
    drawdown: '-5.2%',
    rationale: 'Captures lagged diffusion of positive industry performance across secondary sector equities while neutralizing idiosyncratic volume anomalies.',
    curveSeed: [100, 99, 102, 105, 104, 107, 109, 108, 112, 115, 113, 117, 121, 119, 124, 126, 129, 132, 130, 135, 137, 141]
  },
  alpha4: {
    title: 'Alpha #18: Order Book Flow Imbalance',
    category: 'Type: Microstructure & Price Pressure',
    formula: '(rank(vwap - close) / rank(vwap + close)) * rank(volume / ts_mean(volume, 20)) * -1',
    sharpe: '2.05',
    fitness: '1.85',
    returns: '24.1%',
    turnover: '26.5%',
    drawdown: '-4.1%',
    rationale: 'Exploits transient imbalances between closing prices and intraday VWAP, monetizing temporary liquidity exhaustion from execution algorithms.',
    curveSeed: [100, 103, 102, 106, 108, 107, 112, 115, 114, 118, 122, 120, 125, 129, 128, 133, 137, 136, 141, 145, 144, 148]
  }
};

function initQuantLab() {
  const tabs = document.querySelectorAll('.alpha-tab');
  const titleEl = document.getElementById('alpha-title');
  const catEl = document.getElementById('alpha-category');
  const formulaEl = document.getElementById('alpha-formula');
  const sharpeEl = document.getElementById('metric-sharpe');
  const fitnessEl = document.getElementById('metric-fitness');
  const returnsEl = document.getElementById('metric-returns');
  const turnoverEl = document.getElementById('metric-turnover');
  const drawdownEl = document.getElementById('metric-drawdown');
  const rationaleEl = document.getElementById('alpha-rationale');
  const simulateBtn = document.getElementById('simulate-btn');
  const chartSvg = document.getElementById('equity-chart');

  let currentKey = 'alpha1';

  function updateAlphaView(key, withNoise = false) {
    const data = alphaData[key];
    if (!data) return;

    currentKey = key;

    // Update text and metrics
    if (titleEl) titleEl.textContent = data.title;
    if (catEl) catEl.textContent = data.category;
    if (formulaEl) formulaEl.textContent = data.formula;
    if (sharpeEl) sharpeEl.textContent = data.sharpe;
    if (fitnessEl) fitnessEl.textContent = data.fitness;
    if (returnsEl) returnsEl.textContent = data.returns;
    if (turnoverEl) turnoverEl.textContent = data.turnover;
    if (drawdownEl) drawdownEl.textContent = data.drawdown;
    if (rationaleEl) rationaleEl.textContent = data.rationale;

    // Render SVG Equity Curve
    let points = [...data.curveSeed];
    if (withNoise) {
      // Add slight jitter for re-simulation visualization
      points = points.map((val, idx) => {
        if (idx === 0) return val;
        const delta = (Math.random() - 0.48) * 3;
        return Math.max(95, +(val + delta).toFixed(1));
      });
    }

    renderEquityChart(chartSvg, points);
  }

  // Handle Tab clicks
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const key = tab.getAttribute('data-alpha');
      updateAlphaView(key);
    });
  });

  // Handle Simulate Button click
  if (simulateBtn) {
    simulateBtn.addEventListener('click', () => {
      simulateBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Simulating...';
      setTimeout(() => {
        updateAlphaView(currentKey, true);
        simulateBtn.innerHTML = '<i class="fa-solid fa-rotate-right"></i> Re-Simulate';
      }, 350);
    });
  }

  // Initial render
  updateAlphaView('alpha1');
}

/**
 * Generates an SVG path representing the simulated equity curve
 */
function renderEquityChart(svg, points) {
  if (!svg || !points || points.length === 0) return;

  const width = 700;
  const height = 220;
  const paddingX = 40;
  const paddingY = 30;

  const minVal = Math.min(...points) * 0.98;
  const maxVal = Math.max(...points) * 1.02;

  const getX = (index) => paddingX + (index / (points.length - 1)) * (width - paddingX * 2);
  const getY = (val) => height - paddingY - ((val - minVal) / (maxVal - minVal)) * (height - paddingY * 2);

  // Generate SVG path string
  let pathD = `M ${getX(0)} ${getY(points[0])}`;
  for (let i = 1; i < points.length; i++) {
    const xPrev = getX(i - 1);
    const yPrev = getY(points[i - 1]);
    const xCurr = getX(i);
    const yCurr = getY(points[i]);
    const cpX = (xPrev + xCurr) / 2;
    pathD += ` C ${cpX} ${yPrev}, ${cpX} ${yCurr}, ${xCurr} ${yCurr}`;
  }

  // Generate area fill path
  const areaD = `${pathD} L ${getX(points.length - 1)} ${height - paddingY} L ${getX(0)} ${height - paddingY} Z`;

  // Draw Horizontal Gridlines & Values
  let gridHtml = '';
  const gridLevels = 4;
  for (let i = 0; i <= gridLevels; i++) {
    const levelVal = minVal + (i / gridLevels) * (maxVal - minVal);
    const yPos = getY(levelVal);
    gridHtml += `
      <line x1="${paddingX}" y1="${yPos}" x2="${width - paddingX}" y2="${yPos}" stroke="rgba(255,255,255,0.06)" stroke-dasharray="4" />
      <text x="${paddingX - 8}" y="${yPos + 4}" fill="#64748b" font-size="10" font-family="JetBrains Mono" text-anchor="end">${Math.round(levelVal)}</text>
    `;
  }

  // Time Axis Labels
  const timeLabels = ['Start', 'Day 60', 'Day 120', 'Day 180', 'Day 240', 'Present'];
  let timeHtml = '';
  timeLabels.forEach((label, i) => {
    const xPos = paddingX + (i / (timeLabels.length - 1)) * (width - paddingX * 2);
    timeHtml += `
      <text x="${xPos}" y="${height - 10}" fill="#64748b" font-size="10" font-family="JetBrains Mono" text-anchor="middle">${label}</text>
    `;
  });

  // End Point Pulsing Indicator
  const lastX = getX(points.length - 1);
  const lastY = getY(points[points.length - 1]);

  svg.innerHTML = `
    <defs>
      <linearGradient id="quantCurveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#10b981" stop-opacity="0.32" />
        <stop offset="100%" stop-color="#10b981" stop-opacity="0.0" />
      </linearGradient>
      <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    
    <!-- Grid -->
    ${gridHtml}
    ${timeHtml}

    <!-- Area Fill -->
    <path d="${areaD}" fill="url(#quantCurveGrad)" />

    <!-- Line Path -->
    <path d="${pathD}" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" filter="url(#neonGlow)" />

    <!-- Last Point Indicator -->
    <circle cx="${lastX}" cy="${lastY}" r="5" fill="#10b981" stroke="#080b12" stroke-width="2" />
    <circle cx="${lastX}" cy="${lastY}" r="9" fill="none" stroke="#10b981" opacity="0.6">
      <animate attributeName="r" values="6;12;6" dur="2s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite"/>
    </circle>
  `;
}

/* ===================================================================
   CONTACT FEATURES (Form Validation & Clipboard Copy)
   =================================================================== */
function initContactFeatures() {
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');
  const formToast = document.getElementById('form-toast');
  const submitBtn = document.getElementById('submit-btn');

  const copyEmailBtn = document.getElementById('copy-email-btn');
  const emailAddress = document.getElementById('email-address');
  const copyToast = document.getElementById('copy-toast');

  // Copy Email to Clipboard
  if (copyEmailBtn && emailAddress) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = emailAddress.textContent.trim();
      try {
        await navigator.clipboard.writeText(email);
        showCopyToast();
      } catch (err) {
        // Fallback for older browsers
        const tempInput = document.createElement('input');
        tempInput.value = email;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showCopyToast();
      }
    });
  }

  function showCopyToast() {
    if (!copyToast) return;
    copyToast.classList.add('show');
    setTimeout(() => {
      copyToast.classList.remove('show');
    }, 2800);
  }

  // Form Validation & Submission
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        nameError.style.display = 'block';
        isValid = false;
      } else {
        nameError.style.display = 'none';
      }

      // Validate Email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value.trim())) {
        emailError.style.display = 'block';
        isValid = false;
      } else {
        emailError.style.display = 'none';
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        messageError.style.display = 'block';
        isValid = false;
      } else {
        messageError.style.display = 'none';
      }

      if (isValid) {
        // Simulate sending
        const originalContent = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Sending...</span>';
        submitBtn.disabled = true;

        setTimeout(() => {
          submitBtn.innerHTML = originalContent;
          submitBtn.disabled = false;
          if (formToast) {
            formToast.classList.add('show');
            setTimeout(() => {
              formToast.classList.remove('show');
            }, 6000);
          }
          contactForm.reset();
        }, 800);
      }
    });

    // Clear error on input
    [nameInput, emailInput, messageInput].forEach(input => {
      if (input) {
        input.addEventListener('input', () => {
          const err = document.getElementById(`${input.id}-error`);
          if (err) err.style.display = 'none';
        });
      }
    });
  }
}
