# FinSight — Advanced Fintech Dashboard & Card Payment Platform

**FinSight** is a modern, high-performance fintech web application built with a light mint green UI identity inspired by state-of-the-art financial management tools. It provides users with a comprehensive dashboard to monitor income, expenses, and savings, inspect cash flow bar charts, manage transaction history, issue virtual debit/credit cards, and process card payments with simulated 3D Secure verification.

---

## 🎯 Target Audience

FinSight is designed for everyday banking users, freelancers, financial managers, and digital nomads who need a unified dashboard to:
- Track financial health across **Total Income** ($78,000), **Total Expense** ($43,000), **Total Savings** ($56,000), and **Annual Earning** ($678,897).
- Execute online card payments for bills, merchants, and P2P transfers with 3D Secure authorization.
- Issue and manage virtual credit/debit cards with custom design themes.
- Monitor daily spending limits and recent team/account activities.

---

## 💡 Key Solutions Provided

1. **FinSight Visual Design System**:
   - **Sidebar Navigation**: Quick navigation across `Dashboard` (active), `Payments`, `Transactions`, `Invoices`, `Cards`, `Saving Plans`, `Investments`, `Inbox` (badge "21"), `Insights`, and `Settings`.
   - **Go Pro! Banner**: Upgrade promo widget with lock icon and upgrade action.
   - **Header Bar**: Rounded pill search bar (`🔍 Search`), notification icons, and user profile widget (**Fokhrul Islam**, **Finance**).
2. **Card Payment & 3D Secure Verification**:
   - Dedicated **Make Card Payment** modal with card selection, recipient entry, category assignment, 16-digit card formatting, EXP, CVV, and reference note.
   - Simulated 3D Secure OTP verification modal (demo code: `1 2 3 4`).
   - Automated balance deduction, transaction logging, daily limit recalculation, and printable digital receipts.
3. **Card Management & Multi-Card Swiper**:
   - Interactive mint green debit card graphic (`Fokhrul Islam`, balance `$68,000`, EXP `12/26`, CVV `335`).
   - `+ Add Card` modal to issue new cards with custom themes (Mint Emerald, Obsidian Black, Royal Blue, Rose Gold).
   - Quick action buttons: **Top Up**, **Transfer**, **Request**, **History**.
4. **Duo-Tone Bar Chart Analytics**:
   - High-DPI HTML5 Canvas bar chart displaying monthly Income (mint green `#34C759`) vs Expense (light grey) from Jan to Dec.
   - Interactive hover tooltips displaying detailed monthly stats (*e.g., June 2029: Income $4,000, Expense $6,000*).
5. **Dynamic Transaction History Table**:
   - Columns: `Transaction Name`, `Date & Time`, `Amount`, `Note`, `Status`.
   - Status pills (`Completed` green, `Failed` red/pink, `Pending` yellow/amber).
   - Real-time global text search, year filter (`This Year`, `2025`, `2026`), category filters, and column header sorting.

---

## 🛠️ Technologies Used

- **HTML5**: Semantic document layout, sidebar navigation, top header, stats cards, tables, SVG icon vectors, and modal dialogs.
- **Vanilla CSS3**: Custom FinSight mint green palette (`#34C759`, `#22C55E`, `#D4F4DD`, `#EBF9F1`), responsive CSS Grid & Flexbox, glassmorphism overlays, custom scrollbars, and smooth modal pop transitions.
- **Vanilla JavaScript (ES6+)**: Custom Canvas bar chart renderer, card payment engine, OTP verification workflow, table sorting algorithms, global search filtering, toast notification system, and state management.
- **Web Storage API (`localStorage`)**: Persists account cards, balance metrics, transaction logs, daily spending limits, and recent activities locally.

---

## 🚀 How to Run the Application

1. Open a terminal and navigate to the project directory:
   ```bash
   cd "/Users/test/Desktop/Last week task"
   ```
2. Start a simple HTTP server (Python 3):
   ```bash
   python3 -m http.server 8085
   ```
3. Open your browser and navigate to:
   ```
   http://localhost:8085
   ```
