# Velo Vault — Modern Fintech Dashboard

Velo Vault is a high-performance, responsive, modern fintech web application built to enable users to view real-time account balances, track pending and incoming transactions, execute money transfers and deposits, manage virtual credit card security, and inspect financial analytics.

---

## 🎯 Target Audience

Velo Vault is designed for everyday banking users, freelancers, and digital nomads who need a unified, zero-friction dashboard to:
- Monitor multi-account liquidity (Checking, Savings, Investments).
- Inspect pending transaction clearance holds and incoming direct deposits.
- Transfer money to contacts or IBANs instantly.
- Control virtual debit/credit card security (card freezing and credentials masking).

---

## 💡 The Problem It Solves

Traditional banking interfaces often obscure pending clearance transactions, present cluttered transaction feeds, or require complex backend server setups to test offline workflows. **Velo Vault** solves these challenges by:
1. **Clear Transaction Status Visibility**: Categorizes every transaction with explicit status badges (`⚡ Pending Clearance`, `↙ Incoming`, `↗ Outgoing`).
2. **Instant Multi-Filter Navigation**: Allows users to slice transaction history by status tabs (`All`, `Pending`, `Incoming`, `Outgoing`), categories, or real-time search queries.
3. **Zero-Dependency Web Persistence**: Guarantees complete client-side data persistence across browser reloads using the HTML5 `localStorage` Web Storage API.
4. **Proactive Security Controls**: Enables one-click freezing and unfreezing of virtual card credentials.

---

## 🛠️ Technologies & Tools Used

- **HTML5**: Semantic document layout, modal dialog containers, accessible form elements, and SVG icon vectors.
- **Vanilla CSS3**: Responsive grid and flexbox layouts, glassmorphism background filters, micro-animations, modal transitions, and custom dark mode styling.
  - *Strict Constraint*: **Zero CSS variables** (`--...` or `var()`) and **Zero Tailwind CSS** frameworks.
- **Vanilla JavaScript (ES6+)**: State management, DOM manipulation, functional filtering pipelines, HTML5 Canvas chart renderer, and toast notifications.
- **Web Storage API (`localStorage`)**: Persists account balances, transaction history, virtual card states, and user preferences locally.
- **Git**: Version control repository.

---

## ⚙️ Important Decisions Made

1. **Strict Direct-Color CSS Styling**:
   - Rather than relying on CSS custom properties (`var(--name)`), all design tokens (HEX `#0b0f19`, `#141c2e`, `#6366f1`, `#10b981`, RGBA, HSL) were applied directly to guarantee compatibility with strict non-variable CSS specifications.
2. **Self-Healing Persistent State**:
   - Designed a robust `loadState()` and `saveState()` workflow. If `localStorage` is empty, it automatically populates realistic initial seed data containing pending transfers, incoming salary deposits, and completed purchases.
3. **High-DPI HTML5 Canvas Chart Engine**:
   - Built a lightweight, zero-dependency custom canvas renderer for 30-day income vs. expense analytics with resolution scaling using `window.devicePixelRatio`.
4. **Interactive Pending Clearance Management**:
   - Provided a receipt modal for every transaction, complete with a **Cancel Pending Transaction & Refund** capability that returns held funds back to the user's account.

---

## 🚧 Challenges Encountered & Solutions

1. **Challenge**: Maintaining responsive, crisp canvas rendering without blurry graph line artifacts on Retina/High-DPI displays.
   - **Solution**: Implemented dynamic scaling based on `window.devicePixelRatio` before drawing bezier curves for income and expense lines.
2. **Challenge**: Efficiently filtering transactions across multiple concurrent criteria (Search query string + Category dropdown + Active status tab).
   - **Solution**: Built a single functional array pipeline in `renderTransactions()` that evaluates all filter predicates deterministically before updating UI badge counts and DOM nodes.
3. **Challenge**: Ensuring 100% compliance with the "no CSS variables" rule while retaining a polished glassmorphic dark theme.
   - **Solution**: Utilized explicit HEX and RGBA color declarations and refined `box-shadow` depth layers across cards, modals, and input fields.
