# Anurag Kushwaha — Personal Portfolio

An ultra-modern, high-performance portfolio website built for **Anurag Kushwaha** — 1st Year Undergrad, Aspiring Quantitative Researcher, Web Developer, and Competitive Esports Strategist.

---

## 🌟 Highlights & Features

- **Personalized 1st-Year Identity**:
  - **Quantitative Finance**: Highlights alpha factor modeling, mathematical formulations, backtesting metrics (Sharpe ratio, turnover, fitness, drawdown), and platform submissions.
  - **4th Place Vortex Clash (LAN)**: Dedicated esports championship showcase emphasizing composure, tactical rotations, and split-second team decision-making.
  - **Hacktoberfest Hackathon**: Collegiate hackathon experience celebrating team sprints, rapid prototyping, and collaborative Git version control.
  - **Web Development Journey**: Clean JavaScript, semantic HTML5, and modern CSS architecture.
- **Interactive Quant Alpha Lab**:
  - Live interactive factor playground where visitors can switch between 4 quantitative trading alphas (*Volume-Weighted Mean Reversion*, *Multi-Day Volatility Squeeze*, *Cross-Sectional Momentum Lag*, *Order Book Flow Imbalance*).
  - Dynamic **SVG Equity Curve Generator** with animated gradient fills, pulsing indicators, and a live re-simulation feature.
- **Visual Design & Micro-Interactions**:
  - **Interactive Constellation Canvas**: Real-time particle physics reacting to cursor movement.
  - **Dynamic Typewriter**: Smooth multi-phrase typing effect.
  - **Glassmorphism Theme**: Obsidian/Midnight dark aesthetic accented with glowing cyan, emerald, purple, and gold.
  - **Mobile Responsive**: Custom drawer menu and flexible grid adaptations for phones, tablets, and desktops.
  - **Contact & Clipboard Integration**: Direct validated contact form + 1-click email copy button with toast notification.

---

## 📁 Project Structure

```
Portfolio/
├── index.html          # Semantic HTML5 markup, accessible landmarks & metadata
├── styles.css          # Glassmorphism styling, CSS variables & responsive layout
├── script.js           # Interactive particle canvas, typewriter, quant lab simulator & form logic
├── assets/
│   └── favicon.svg     # Stylized AK & Alpha monogram logo
└── README.md           # Documentation & customization guide
```

---

## 🚀 How to Run Locally

You don't need any complex build tools or `npm install`.

### Option A: Using Python (Recommended)
Open your terminal in this directory and run:
```bash
python3 -m http.server 3000
```
Then visit [http://localhost:3000](http://localhost:3000) in your browser.

### Option B: Direct Browser Open
Simply double-click `index.html` or drag it into any modern web browser (Chrome, Safari, Firefox, Edge, Arc).

---

## 🛠️ Easy Customization Guide

1. **Update Your Social Links**:
   In [index.html](file:///Users/anuragkushwaha/Portfolio/index.html), search for `class="social-icons"` and replace the `href` values with your actual profile URLs:
   - GitHub: `https://github.com/your-username`
   - LinkedIn: `https://linkedin.com/in/your-username`
   - X / Twitter: `https://twitter.com/your-username`
   - Email: `anuragkushwaha.dev@gmail.com` (also update in `email-address` span)

2. **Add Your Resume (CV)**:
   Place your `resume.pdf` inside the `assets/` folder, and link it in the hero or nav section:
   ```html
   <a href="assets/resume.pdf" target="_blank" class="btn btn-outline">View Resume</a>
   ```

3. **Add Your Own Alpha Signals or Projects**:
   In [script.js](file:///Users/anuragkushwaha/Portfolio/script.js), modify the `alphaData` object with your own mathematical expressions, backtest numbers, and economic hypotheses.

---

## 🌐 Free 1-Click Deployment

### Deploy with GitHub Pages:
1. Initialize git (if not already done) and push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Anurag Kushwaha Portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/portfolio.git
   git push -u origin main
   ```
2. Go to your repository settings on GitHub $\rightarrow$ **Pages** $\rightarrow$ select `main` branch $\rightarrow$ Click **Save**.
3. Your portfolio is live at `https://<your-username>.github.io/portfolio/`!

### Deploy with Vercel or Netlify:
- Simply drag and drop the `Portfolio` folder into [Netlify Drop](https://app.netlify.com/drop) or import the GitHub repo into [Vercel](https://vercel.com).
