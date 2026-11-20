/**
 * JILLELA JANARDHAN - PORTFOLIO INTERACTION ENGINE
 * Zero external dependencies. Fast, accessible, and responsive.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTypewriter();
  initNavigation();
  initSkillsFilter();
  initProjectsFilter();
  initProjectModals();
  initTerminal();
  initCopyButtons();
  initContactForm();
  initScrollTop();
});

/* ===================================================================
   1. THEME SWITCHER (Dark / Light with LocalStorage persistence)
   =================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('janardhan-theme') || (prefersDark ? 'dark' : 'dark'); // Default to dark for premium AI aesthetic

  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('janardhan-theme', newTheme);
      updateThemeIcon(newTheme);
      showToast(`Switched to ${newTheme} mode`);
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('theme-icon');
  if (!icon) return;
  if (theme === 'dark') {
    icon.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>`;
  } else {
    icon.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  }
}

/* ===================================================================
   2. TYPEWRITER EFFECT
   =================================================================== */
function initTypewriter() {
  const element = document.getElementById('typewriter');
  if (!element) return;

  const words = [
    'AI & Data Science Engineer',
    'Computer Vision (YOLOv8 / YOLOv9)',
    'Deep Learning & CNN Practitioner',
    'Streamlit Full-Stack Developer',
    'Predictive Modeling & Analytics'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 90;
  const deletingSpeed = 45;
  const pauseEnd = 1800;

  function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      element.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      element.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let delta = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentWord.length) {
      delta = pauseEnd;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delta = 400;
    }

    setTimeout(type, delta);
  }

  type();
}

/* ===================================================================
   3. NAVIGATION & SCROLL HIGHLIGHTING
   =================================================================== */
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Mobile drawer toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.innerHTML = isOpen
        ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });

    // Close menu when clicking link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      });
    });
  }

  // Active section indicator on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    if (scrollY > 50) {
      navbar.style.boxShadow = '0 10px 30px -10px rgba(0, 0, 0, 0.4)';
    } else {
      navbar.style.boxShadow = 'none';
    }

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelector(`.nav-link[href*="${sectionId}"]`)?.classList.add('active');
      } else {
        document.querySelector(`.nav-link[href*="${sectionId}"]`)?.classList.remove('active');
      }
    });
  });
}

/* ===================================================================
   4. SKILLS FILTER
   =================================================================== */
function initSkillsFilter() {
  const buttons = document.querySelectorAll('.skills-filter-btn');
  const cards = document.querySelectorAll('.skill-card');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });
}

/* ===================================================================
   5. PROJECTS FILTER
   =================================================================== */
function initProjectsFilter() {
  const buttons = document.querySelectorAll('.project-filter-btn');
  const cards = document.querySelectorAll('.project-card');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          card.style.animation = 'modalIn 0.35s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ===================================================================
   6. PROJECT DEEP DIVE MODAL
   =================================================================== */
const projectData = {
  'food-quality': {
    title: 'AI Food Quality Inspection & Defect Detection System',
    timeline: 'Feb 2026 – Apr 2026',
    category: 'Computer Vision & Deep Learning',
    banner: 'assets/images/food-quality-banner.svg',
    accuracy: '86.14% Test Accuracy | 96.19% Peak Val Accuracy',
    github: 'https://github.com/Janardhan-Jillela/AI-Food-Quality-Inspection',
    summary: 'A full-stack, enterprise-grade deep learning solution engineered to automate agricultural produce grading, defect localization, species taxonomy classification, and shelf-life degradation forecasting.',
    highlights: [
      'Engineered an end-to-end inference pipeline uniting ResNet-50 (Transfer Learning), YOLOv9 (Defect Bounding Box Localization), and MobileNetV2 produce taxonomy.',
      'Developed pixel-level surface defect segmentation using OpenCV in HSV & LAB color spaces to quantify bruise, rot, and dehydration percentages.',
      'Integrated a Bi-directional LSTM network operating over a 10-frame sliding window to predict produce degradation trends (Improving, Stable, Degrading).',
      'Deployed a full-stack Streamlit dashboard providing real-time image, video, and live webcam inference with interactive Plotly metrics and audit logging.',
      'Maintained strict version control, model artifact management, and documentation on GitHub.'
    ],
    tech: ['Python 3.10+', 'PyTorch', 'YOLOv9', 'ResNet50', 'Bi-LSTM', 'OpenCV', 'Streamlit', 'Git/GitHub']
  },
  'object-detection': {
    title: 'Real-Time Multi-Model Object Detection Dashboard',
    timeline: 'Sep 2025 – Nov 2025',
    category: 'Computer Vision & Real-Time AI',
    banner: 'assets/images/object-detection-preview.png',
    accuracy: '80+ FPS on GPU | 12.5 ms Latency',
    github: 'https://github.com/Janardhan-Jillela/Object-Detection-Dashboard',
    summary: 'An interactive, production-ready computer vision application that unifies state-of-the-art detection models into a single high-throughput dashboard for images, videos, and live webcam streams.',
    highlights: [
      'Unified single-stage and two-stage deep learning detectors: YOLOv8 (nano to extra-large variants), SSD MobileNetV3 Large, Faster R-CNN, and Haar Cascades.',
      'Implemented real-time Multi-Object Tracking (MOT) with persistent numeric IDs across video and webcam frames, enabling accurate cumulative counting.',
      'Created dynamic interactive controls: real-time confidence slider (0.10 to 1.00), frame-skipping interval adjustments, and per-class distribution counters across 80 COCO categories.',
      'Included one-click artifact export allowing users to download annotated images and processed MP4 videos directly from the browser.',
      'Implemented an alternative lightweight Flask REST backend for API-driven headless inference.'
    ],
    tech: ['Python', 'OpenCV', 'Streamlit', 'YOLOv8 (Ultralytics)', 'PyTorch', 'Torchvision', 'Flask']
  },
  'tesla-stock': {
    title: 'Stock Price Trend Prediction & Tesla Analytics',
    timeline: 'May 2025 – Jun 2025',
    category: 'Machine Learning & Financial Analytics',
    banner: 'assets/images/tesla-stock-preview.svg',
    accuracy: 'Directional Trend Accuracy: 82.4%',
    github: 'https://github.com/Janardhan-Jillela/tesla_stock_analytics',
    summary: 'A predictive machine learning and exploratory data analysis pipeline evaluating historical market data to classify and forecast Tesla (TSLA) stock price movement trends.',
    highlights: [
      'Executed systematic data cleaning, missing value imputation, outlier detection, and normalization on multi-year daily stock time series data.',
      'Engineered key technical indicators including Moving Averages (SMA 20/50), Relative Strength Index (RSI), Volatility spreads, and Price Momentum lags.',
      'Trained and evaluated Logistic Regression classification models to predict binary trend directions (Bullish / Bearish) with ROC-AUC analysis.',
      'Conducted exhaustive exploratory data analysis (EDA) using Matplotlib and Seaborn to visualize correlation heatmaps, volume surges, and seasonality.',
      'Structured modular Python code with documented Jupyter notebooks and reusable feature engineering modules.'
    ],
    tech: ['Python', 'Logistic Regression', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn']
  }
};

function initProjectModals() {
  const modalBackdrop = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-details-body');
  const closeBtn = document.getElementById('modal-close');
  const modalGithubLink = document.getElementById('modal-github-link');
  const openButtons = document.querySelectorAll('[data-open-modal]');

  if (!modalBackdrop || !modalContent) return;

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-open-modal');
      const data = projectData[projectId];

      if (!data) return;

      modalContent.innerHTML = `
        <div class="modal-media">
          <img src="${data.banner}" alt="${data.title}" style="width:100%; max-height: 280px; object-fit: cover;">
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem;">
          <span class="info-badge">${data.category}</span>
          <span class="timeline-badge">${data.timeline}</span>
        </div>
        <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">${data.title}</h3>
        <p style="color: var(--accent-emerald); font-weight: 700; font-family: var(--font-mono); font-size: 0.9rem; margin-bottom: 1rem;">
          ⚡ ${data.accuracy}
        </p>
        <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 1.25rem;">
          ${data.summary}
        </p>

        <h4 style="font-size: 1.1rem; color: var(--text-primary); margin-bottom: 0.5rem;">Key Architecture & Engineering Highlights</h4>
        <ul class="modal-details-list">
          ${data.highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>

        <h4 style="font-size: 1.1rem; color: var(--text-primary); margin-top: 1.25rem; margin-bottom: 0.5rem;">Tech Stack & Frameworks</h4>
        <div class="tech-stack-wrap" style="border-top: none; padding-top: 0;">
          ${data.tech.map(t => `<span class="tech-pill">${t}</span>`).join('')}
        </div>
      `;

      if (modalGithubLink) {
        modalGithubLink.href = data.github;
      }

      modalBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = 'auto';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

/* ===================================================================
   7. INTERACTIVE DEVELOPER TERMINAL
   =================================================================== */
function initTerminal() {
  const terminalInput = document.getElementById('terminal-input');
  const terminalOutput = document.getElementById('terminal-output');
  const terminalChips = document.querySelectorAll('.terminal-chip');

  if (!terminalInput || !terminalOutput) return;

  const commands = {
    help: () => `
<span style="color: var(--accent-cyan-bright); font-weight: 700;">Available Terminal Commands:</span>
  • <span style="color:#f59e0b;">about</span>       - Executive summary & bio
  • <span style="color:#f59e0b;">skills</span>      - Technical skill inventory
  • <span style="color:#f59e0b;">projects</span>    - Featured AI/ML repositories on GitHub
  • <span style="color:#f59e0b;">certs</span>       - Verified certifications & credentials
  • <span style="color:#f59e0b;">experience</span>  - Internship & industry background
  • <span style="color:#f59e0b;">education</span>   - B.Tech degree & academic metrics
  • <span style="color:#f59e0b;">contact</span>     - Email, phone, LinkedIn, and GitHub
  • <span style="color:#f59e0b;">github</span>      - Launch Janardhan's GitHub profile
  • <span style="color:#f59e0b;">clear</span>       - Clear the terminal screen
`,
    about: () => `
<span style="color: #38bdf8; font-weight: 700;">Jillela Janardhan</span> — B.Tech Graduate in Computer Science &amp; Engineering (Data Science) from RGMCET.
Passionate about engineering production-grade AI solutions, real-time computer vision (YOLOv8/v9, ResNet50, OpenCV),
and deploying interactive Streamlit applications. Proficient in Python, SQL, and Deep Learning pipelines.
`,
    skills: () => `
<span style="color: #38bdf8; font-weight: 700;">Core Technical Arsenal:</span>
  [<span style="color: #10b981;">AI/CV</span>]       PyTorch, OpenCV, YOLOv8, YOLOv9, ResNet-50, Bi-LSTM, Scikit-learn
  [<span style="color: #6366f1;">Languages</span>]   Python (Advanced), Java, MySQL, HTML5, CSS3, JavaScript
  [<span style="color: #a855f7;">Data</span>]        Pandas, NumPy, Matplotlib, Seaborn, Feature Engineering, EDA
  [<span style="color: #f59e0b;">Tools</span>]       Streamlit, Git, GitHub, VS Code, Google Colab, Jupyter, Excel
  [<span style="color: #06b6d4;">Theory</span>]      Object-Oriented Programming (OOP), Data Structures & Algorithms (DSA)
`,
    projects: () => `
<span style="color: #38bdf8; font-weight: 700;">Featured GitHub Repositories:</span>
  1. <a href="https://github.com/Janardhan-Jillela/AI-Food-Quality-Inspection" target="_blank" style="color:#10b981; text-decoration: underline;">AI-Food-Quality-Inspection</a>
     • 86.14% Test Accuracy | YOLOv9 + ResNet50 + Bi-LSTM Produce Quality Assessment
  2. <a href="https://github.com/Janardhan-Jillela/Object-Detection-Dashboard" target="_blank" style="color:#10b981; text-decoration: underline;">Object-Detection-Dashboard</a>
     • 80+ FPS | Real-time Webcam & Video Streamlit App using YOLOv8 & OpenCV
  3. <a href="https://github.com/Janardhan-Jillela/tesla_stock_analytics" target="_blank" style="color:#10b981; text-decoration: underline;">tesla_stock_analytics</a>
     • Logistic Regression Financial Trend Classifier & Seaborn EDA Suite
`,
    certs: () => `
<span style="color: #38bdf8; font-weight: 700;">Professional Certifications:</span>
  • <span style="color:#a855f7;">Oracle University</span>: Agentic AI Certified Foundations Associate (Aug 2026)
  • <span style="color:#06b6d4;">DataCamp</span>: Data Analyst Associate (Feb 2025 – Mar 2025)
  • <span style="color:#f59e0b;">Codio via edX</span>: Java Programming: Basic Skills (Apr 2024)
`,
    experience: () => `
<span style="color: #38bdf8; font-weight: 700;">Internship Experience:</span>
  • <span style="color: #10b981;">Data Analysis Using Python Intern</span> — APSSDC (May 2025 – Jul 2025)
    Conducted data cleaning, preprocessing, exploratory data analysis, and statistical visualization
    on real-world datasets with Python, Pandas, NumPy, and Seaborn. Version controlled via GitHub.
`,
    education: () => `
<span style="color: #38bdf8; font-weight: 700;">Academic Credentials:</span>
  • <span style="color: #38bdf8;">B.Tech in Computer Science and Engineering (Data Science)</span>
    RGM College of Engineering and Technology (RGMCET), Nandyal
    Status: <span style="color:#10b981; font-weight:700;">Graduated (Nov 2022 – Apr 2026)</span> | CGPA: <span style="color:#10b981; font-weight:700;">7.64 / 10</span>
`,
    contact: () => `
<span style="color: #38bdf8; font-weight: 700;">Contact & Profiles:</span>
  • Email:    <a href="mailto:jillella215@gmail.com" style="color:#38bdf8;">jillella215@gmail.com</a>
  • Phone:    <a href="tel:8688123239" style="color:#38bdf8;">+91 8688123239</a>
  • LinkedIn: <a href="https://www.linkedin.com/in/janardhan-jillella/" target="_blank" style="color:#38bdf8;">linkedin.com/in/janardhan-jillella/</a>
  • GitHub:   <a href="https://github.com/Janardhan-Jillela" target="_blank" style="color:#38bdf8;">github.com/Janardhan-Jillela</a>
`,
    github: () => {
      window.open('https://github.com/Janardhan-Jillela', '_blank');
      return `Navigating to <span style="color:#38bdf8;">https://github.com/Janardhan-Jillela</span>...`;
    },
    clear: () => {
      terminalOutput.innerHTML = '';
      return null;
    }
  };

  function executeCommand(rawInput) {
    const cmd = rawInput.trim().toLowerCase();
    if (!cmd) return;

    // Render input row in output history
    const inputHistoryLine = document.createElement('div');
    inputHistoryLine.className = 'terminal-line';
    inputHistoryLine.innerHTML = `<span class="prompt-symbol">janardhan@portfolio</span>:<span class="prompt-path">~</span>$ ${escapeHtml(rawInput)}`;
    terminalOutput.appendChild(inputHistoryLine);

    if (commands[cmd]) {
      const result = commands[cmd]();
      if (result) {
        const resultLine = document.createElement('div');
        resultLine.className = 'terminal-line';
        resultLine.style.marginBottom = '0.75rem';
        resultLine.innerHTML = result;
        terminalOutput.appendChild(resultLine);
      }
    } else {
      const errorLine = document.createElement('div');
      errorLine.className = 'terminal-line';
      errorLine.style.color = '#ef4444';
      errorLine.style.marginBottom = '0.5rem';
      errorLine.innerHTML = `command not found: "${escapeHtml(rawInput)}". Type <span style="color:#38bdf8; cursor:pointer;" onclick="runChipCommand('help')">'help'</span> for a list of commands.`;
      terminalOutput.appendChild(errorLine);
    }

    terminalInput.value = '';
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      executeCommand(terminalInput.value);
    }
  });

  terminalChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      executeCommand(cmd);
    });
  });

  window.runChipCommand = executeCommand;
}

function escapeHtml(string) {
  const div = document.createElement('div');
  div.textContent = string;
  return div.innerHTML;
}

/* ===================================================================
   8. ONE-CLICK COPY TO CLIPBOARD
   =================================================================== */
function initCopyButtons() {
  const copyButtons = document.querySelectorAll('[data-copy]');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied "${textToCopy}" to clipboard!`);
        const originalText = btn.innerHTML;
        btn.innerHTML = '✓ Copied';
        setTimeout(() => {
          btn.innerHTML = originalText;
        }, 2000);
      }).catch(() => {
        showToast('Failed to copy to clipboard');
      });
    });
  });
}

/* ===================================================================
   9. CONTACT FORM SIMULATION & MAILTO FALLBACK
   =================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const subject = document.getElementById('form-subject').value.trim() || 'Portfolio Inquiry';
    const message = document.getElementById('form-message').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in all required fields.');
      return;
    }

    const mailtoUri = `mailto:jillella215@gmail.com?subject=${encodeURIComponent(subject + ' - from ' + name)}&body=${encodeURIComponent("Sender Email: " + email + "\n\n" + message)}`;

    // Open user's mail client
    window.location.href = mailtoUri;
    showToast(`Launching email client to message Janardhan!`);
    form.reset();
  });
}

/* ===================================================================
   10. SCROLL TO TOP
   =================================================================== */
function initScrollTop() {
  const scrollBtn = document.getElementById('scroll-top');
  if (!scrollBtn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 400) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ===================================================================
   11. TOAST NOTIFICATION UTILITY
   =================================================================== */
function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span>✨</span><span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}
