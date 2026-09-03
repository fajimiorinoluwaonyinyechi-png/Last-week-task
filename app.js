/**
 * FinSight - Core Application Logic
 * Interactive Fintech Dashboard with Card Payment & Card Management
 */

const STORAGE_KEY = 'finsight_dashboard_state_v2';

// --------------------------------------------------------------------------
// Default State Generator
// --------------------------------------------------------------------------
function getInitialState() {
  return {
    income: 78000.00,
    expense: 43000.00,
    savings: 56000.00,
    earningTotal: 678897.00,
    dailySpent: 2500.00,
    dailyLimit: 20000.00,
    activeCardIndex: 0,
    cards: [
      {
        id: "card-01",
        holder: "Fokhrul Islam",
        number: "4532 8901 2341 0335",
        exp: "12/26",
        cvv: "335",
        balance: 68000.00,
        theme: "mint"
      },
      {
        id: "card-02",
        holder: "Fokhrul Islam",
        number: "5412 9044 1120 8842",
        exp: "10/28",
        cvv: "912",
        balance: 14500.00,
        theme: "obsidian"
      }
    ],
    monthlyData: [
      { month: "Jan", income: 3200, expense: 1800 },
      { month: "Feb", income: 1200, expense: 2100 },
      { month: "Mar", income: 2400, expense: 4100 },
      { month: "Apr", income: 4000, expense: 6000 },
      { month: "May", income: 1800, expense: 2300 },
      { month: "Jun", income: 1900, expense: 4800 },
      { month: "Jul", income: 5800, expense: 1200 },
      { month: "Aug", income: 3400, expense: 1500 },
      { month: "Sep", income: 4900, expense: 2100 },
      { month: "Oct", income: 2400, expense: 1800 },
      { month: "Nov", income: 2100, expense: 2400 },
      { month: "Dec", income: 1800, expense: 1200 }
    ],
    transactions: [
      {
        id: "TX-1001",
        name: "Electricity Bill",
        sub: "Payments",
        date: "2025-03-01 04:28:48",
        amount: 295.81,
        note: "Payment for monthly electricity bill",
        status: "Failed",
        category: "Payments",
        year: "2025"
      },
      {
        id: "TX-1002",
        name: "Weekly Groceries",
        sub: "Shopping",
        date: "2025-03-01 04:28:48",
        amount: 226.25,
        note: "Groceries shopping at local supermarket",
        status: "Completed",
        category: "Shopping",
        year: "2025"
      },
      {
        id: "TX-1003",
        name: "Acme Payroll Direct",
        sub: "Income",
        date: "2025-02-28 09:00:00",
        amount: 4850.00,
        note: "Monthly salary direct deposit",
        status: "Completed",
        category: "Income",
        year: "2025"
      },
      {
        id: "TX-1004",
        name: "Apple Store Watch Ultra",
        sub: "Shopping",
        date: "2025-02-25 14:12:00",
        amount: 799.00,
        note: "Apple Store card purchase",
        status: "Pending",
        category: "Shopping",
        year: "2025"
      },
      {
        id: "TX-1005",
        name: "Fiber Internet Gigabit",
        sub: "Payments",
        date: "2025-02-20 11:45:00",
        amount: 89.99,
        note: "Monthly high-speed internet subscription",
        status: "Completed",
        category: "Payments",
        year: "2025"
      }
    ],
    activities: [
      {
        id: "act-1",
        name: "Jamie Smith",
        text: "updated account settings",
        time: "16:05 am",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
      },
      {
        id: "act-2",
        name: "Taylor Green",
        text: "reviewed recent transaction...",
        time: "21:05 pm",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
      },
      {
        id: "act-3",
        name: "Taylor Green",
        text: "reviewed recent transaction...",
        time: "21:05 pm",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
      }
    ]
  };
}

// Global App State
let state = loadState();

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : getInitialState();
  } catch (e) {
    return getInitialState();
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error("Failed to save state", e);
  }
}

// --------------------------------------------------------------------------
// DOM Elements Initialization
// --------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  initUI();
  renderAll();
});

let currentSort = { col: 'date', dir: 'desc' };
let filterCriteria = { status: 'ALL', category: 'ALL', year: 'ALL', query: '' };
let pendingCardPayment = null;

function initUI() {
  // Navigation accordions
  const navPayments = document.getElementById("navPayments");
  const paymentsSub = document.getElementById("paymentsSubMenu");
  navPayments?.addEventListener("click", (e) => {
    e.preventDefault();
    paymentsSub?.classList.toggle("open");
  });

  const navCards = document.getElementById("navCards");
  const cardsSub = document.getElementById("cardsSubMenu");
  navCards?.addEventListener("click", (e) => {
    e.preventDefault();
    cardsSub?.classList.toggle("open");
  });

  // Mobile sidebar toggle
  const sidebarToggle = document.getElementById("sidebarToggle");
  const sidebar = document.getElementById("sidebar");
  sidebarToggle?.addEventListener("click", () => {
    sidebar?.classList.toggle("mobile-open");
  });

  // Quick Nav Modal Triggers
  document.getElementById("openCardPaymentModalNav")?.addEventListener("click", (e) => {
    e.preventDefault();
    openCardPaymentModal();
  });
  document.getElementById("openQuickSendNav")?.addEventListener("click", (e) => {
    e.preventDefault();
    openModal("transferModal");
  });
  document.getElementById("openRequestMoneyNav")?.addEventListener("click", (e) => {
    e.preventDefault();
    openModal("requestModal");
  });
  document.getElementById("navAddCardBtn")?.addEventListener("click", (e) => {
    e.preventDefault();
    openModal("addCardModal");
  });
  document.getElementById("navTopUpCardBtn")?.addEventListener("click", (e) => {
    e.preventDefault();
    openModal("topUpCardModal");
  });

  // Main Action Buttons
  document.getElementById("openAddCardBtn")?.addEventListener("click", () => openModal("addCardModal"));
  document.getElementById("openTopUpModalBtn")?.addEventListener("click", () => openModal("topUpCardModal"));
  document.getElementById("openTransferModalBtn")?.addEventListener("click", () => openModal("transferModal"));
  document.getElementById("openRequestModalBtn")?.addEventListener("click", () => openModal("requestModal"));
  document.getElementById("openHistoryModalBtn")?.addEventListener("click", () => {
    document.querySelector('.table-card')?.scrollIntoView({ behavior: 'smooth' });
  });

  // Filter Buttons
  document.getElementById("openFilterBtn")?.addEventListener("click", () => openModal("filterModal"));
  document.getElementById("applyFilterBtn")?.addEventListener("click", () => {
    filterCriteria.status = document.getElementById("filterStatus").value;
    filterCriteria.category = document.getElementById("filterCategory").value;
    closeModal("filterModal");
    renderTable();
  });
  document.getElementById("resetFilterBtn")?.addEventListener("click", () => {
    document.getElementById("filterStatus").value = "ALL";
    document.getElementById("filterCategory").value = "ALL";
    filterCriteria.status = "ALL";
    filterCriteria.category = "ALL";
    closeModal("filterModal");
    renderTable();
  });

  // Global Search
  const globalSearch = document.getElementById("globalSearch");
  globalSearch?.addEventListener("input", (e) => {
    filterCriteria.query = e.target.value.toLowerCase().trim();
    renderTable();
  });

  // Table Year Filter
  document.getElementById("tableYearFilter")?.addEventListener("change", (e) => {
    filterCriteria.year = e.target.value;
    renderTable();
  });

  // Sortable Columns
  document.querySelectorAll(".finsight-table th.sortable").forEach(th => {
    th.addEventListener("click", () => {
      const col = th.getAttribute("data-sort");
      if (currentSort.col === col) {
        currentSort.dir = currentSort.dir === 'asc' ? 'desc' : 'asc';
      } else {
        currentSort.col = col;
        currentSort.dir = 'asc';
      }
      renderTable();
    });
  });

  // Modal Close Buttons
  document.querySelectorAll(".modal-close-btn, .btn-secondary").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const modal = e.target.closest(".modal-backdrop");
      if (modal) modal.classList.add("hidden");
    });
  });

  // Forms Submissions
  setupFormHandlers();

  // Window Resize re-render chart
  window.addEventListener("resize", renderChart);
}

// --------------------------------------------------------------------------
// Render Functions
// --------------------------------------------------------------------------
function renderAll() {
  renderMetrics();
  renderActiveCard();
  renderChart();
  renderTable();
  renderDailyLimit();
  renderActivities();
}

function renderMetrics() {
  document.getElementById("incomeDisplay").textContent = `$${state.income.toLocaleString()}`;
  document.getElementById("expenseDisplay").textContent = `$${state.expense.toLocaleString()}`;
  document.getElementById("savingsDisplay").textContent = `$${state.savings.toLocaleString()}`;
  document.getElementById("earningTotalDisplay").textContent = `$${state.earningTotal.toLocaleString()}`;
}

function renderActiveCard() {
  if (!state.cards || state.cards.length === 0) return;
  const activeCard = state.cards[state.activeCardIndex || 0];

  document.getElementById("cardHolderDisplay").textContent = activeCard.holder;
  document.getElementById("cardBalanceDisplay").textContent = `$${activeCard.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  document.getElementById("cardExpDisplay").textContent = activeCard.exp;
  document.getElementById("cardCvvDisplay").textContent = activeCard.cvv;

  const cardGraphic = document.getElementById("activeDebitCard");
  if (cardGraphic) {
    if (activeCard.theme === 'obsidian') {
      cardGraphic.style.background = "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)";
      cardGraphic.style.color = "#ffffff";
    } else if (activeCard.theme === 'royal') {
      cardGraphic.style.background = "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)";
      cardGraphic.style.color = "#ffffff";
    } else if (activeCard.theme === 'gold') {
      cardGraphic.style.background = "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)";
      cardGraphic.style.color = "#ffffff";
    } else { // mint
      cardGraphic.style.background = "linear-gradient(135deg, #a7f3d0 0%, #6ee7b7 50%, #34d399 100%)";
      cardGraphic.style.color = "#064e3b";
    }
  }

  // Render Carousel Dots
  const dotsContainer = document.getElementById("cardCarouselDots");
  if (dotsContainer) {
    dotsContainer.innerHTML = state.cards.map((c, idx) => `
      <span class="dot ${idx === (state.activeCardIndex || 0) ? 'active' : ''}" data-index="${idx}"></span>
    `).join("");

    dotsContainer.querySelectorAll(".dot").forEach(dot => {
      dot.addEventListener("click", (e) => {
        state.activeCardIndex = parseInt(e.target.getAttribute("data-index"));
        saveState();
        renderActiveCard();
      });
    });
  }
}

// --------------------------------------------------------------------------
// Duo-Tone Bar Chart Canvas Rendering
// --------------------------------------------------------------------------
function renderChart() {
  const canvas = document.getElementById("earningChartCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  // Adjust canvas crisp resolution
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = 240 * dpr;
  ctx.scale(dpr, dpr);

  const width = rect.width;
  const height = 240;
  const paddingBottom = 30;
  const paddingTop = 20;
  const chartHeight = height - paddingBottom - paddingTop;

  ctx.clearRect(0, 0, width, height);

  const data = state.monthlyData;
  const maxVal = 7000;
  const barWidth = Math.min(28, (width / data.length) * 0.45);
  const gap = width / data.length;

  data.forEach((item, i) => {
    const x = i * gap + gap / 2;

    // Y positions
    const incomeH = (item.income / maxVal) * chartHeight;
    const expenseH = (item.expense / maxVal) * chartHeight;

    const incomeY = height - paddingBottom - incomeH;
    const expenseY = height - paddingBottom - expenseH;

    // Draw Expense Bar (Light Grey background bar)
    ctx.fillStyle = "#E2E8F0";
    ctx.beginPath();
    ctx.roundRect(x - barWidth / 2, expenseY, barWidth, expenseH, [6, 6, 6, 6]);
    ctx.fill();

    // Draw Income Bar (Vibrant Mint Green)
    ctx.fillStyle = "#34C759";
    ctx.beginPath();
    ctx.roundRect(x - barWidth / 2, incomeY, barWidth, incomeH, [6, 6, 6, 6]);
    ctx.fill();

    // Month Label
    ctx.fillStyle = (i === 3) ? "#0F172A" : "#94A3B8"; // April highlighted
    ctx.font = (i === 3) ? "bold 12px 'Plus Jakarta Sans'" : "12px 'Plus Jakarta Sans'";
    ctx.textAlign = "center";
    ctx.fillText(item.month, x, height - 8);
  });

  // Canvas Hover Tooltip Interaction
  canvas.onmousemove = (e) => {
    const r = canvas.getBoundingClientRect();
    const mouseX = e.clientX - r.left;
    const index = Math.floor(mouseX / gap);

    const tooltip = document.getElementById("chartTooltip");
    if (index >= 0 && index < data.length) {
      const item = data[index];
      document.getElementById("ttMonth").textContent = `${item.month} 2029`;
      document.getElementById("ttIncome").textContent = `$${item.income.toLocaleString()}`;
      document.getElementById("ttExpense").textContent = `$${item.expense.toLocaleString()}`;

      tooltip.classList.remove("hidden");
      tooltip.style.left = `${(index * gap + gap / 2)}px`;
      tooltip.style.top = `${height - paddingBottom - Math.max(item.income, item.expense) * (chartHeight / maxVal) - 10}px`;
    }
  };

  canvas.onmouseleave = () => {
    document.getElementById("chartTooltip")?.classList.add("hidden");
  };
}

// --------------------------------------------------------------------------
// Transaction Table Rendering & Sorting
// --------------------------------------------------------------------------
function renderTable() {
  const tbody = document.getElementById("transactionTableBody");
  const emptyState = document.getElementById("tableEmptyState");
  if (!tbody) return;

  let list = [...state.transactions];

  // Filtering
  if (filterCriteria.query) {
    list = list.filter(t => 
      t.name.toLowerCase().includes(filterCriteria.query) ||
      t.note.toLowerCase().includes(filterCriteria.query) ||
      t.category.toLowerCase().includes(filterCriteria.query)
    );
  }
  if (filterCriteria.status !== 'ALL') {
    list = list.filter(t => t.status === filterCriteria.status);
  }
  if (filterCriteria.category !== 'ALL') {
    list = list.filter(t => t.category === filterCriteria.category);
  }
  if (filterCriteria.year !== 'ALL') {
    list = list.filter(t => t.year === filterCriteria.year);
  }

  // Sorting
  list.sort((a, b) => {
    let valA = a[currentSort.col];
    let valB = b[currentSort.col];
    if (typeof valA === 'string') valA = valA.toLowerCase();
    if (typeof valB === 'string') valB = valB.toLowerCase();

    if (valA < valB) return currentSort.dir === 'asc' ? -1 : 1;
    if (valA > valB) return currentSort.dir === 'asc' ? 1 : -1;
    return 0;
  });

  if (list.length === 0) {
    tbody.innerHTML = "";
    emptyState?.classList.remove("hidden");
    return;
  }
  emptyState?.classList.add("hidden");

  tbody.innerHTML = list.map(tx => {
    const pillClass = tx.status === 'Completed' ? 'pill-completed' : (tx.status === 'Failed' ? 'pill-failed' : 'pill-pending');
    return `
      <tr data-id="${tx.id}">
        <td>
          <div class="tx-name-cell">
            <span class="tx-title-bold">${escapeHtml(tx.name)}</span>
            <span class="tx-cat-sub">${escapeHtml(tx.sub || tx.category)}</span>
          </div>
        </td>
        <td>${escapeHtml(tx.date)}</td>
        <td style="font-weight:700;">$${tx.amount.toFixed(2)}</td>
        <td style="color:#64748B;">${escapeHtml(tx.note)}</td>
        <td><span class="tx-status-pill ${pillClass}">${tx.status}</span></td>
      </tr>
    `;
  }).join("");

  // Add click to view receipt
  tbody.querySelectorAll("tr").forEach(tr => {
    tr.addEventListener("click", () => {
      const id = tr.getAttribute("data-id");
      const tx = state.transactions.find(t => t.id === id);
      if (tx) showReceiptModal(tx);
    });
  });
}

function renderDailyLimit() {
  const pct = Math.min(100, Math.round((state.dailySpent / state.dailyLimit) * 100));
  document.getElementById("dailyLimitText").innerHTML = `<strong>$${state.dailySpent.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong> spent of $${state.dailyLimit.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  document.getElementById("dailyLimitBar").style.width = `${pct}%`;
  document.getElementById("dailyLimitPct").textContent = `${pct}%`;
}

function renderActivities() {
  const container = document.getElementById("activityList");
  if (!container) return;
  container.innerHTML = state.activities.map(act => `
    <div class="activity-item">
      <img src="${act.avatar}" alt="${escapeHtml(act.name)}" class="act-avatar">
      <div class="act-content">
        <p class="act-text"><strong>${escapeHtml(act.name)}</strong> ${escapeHtml(act.text)}</p>
        <span class="act-time">${escapeHtml(act.time)}</span>
      </div>
    </div>
  `).join("");
}

// --------------------------------------------------------------------------
// Card Payment Checkout & Form Handlers
// --------------------------------------------------------------------------
function openCardPaymentModal() {
  const select = document.getElementById("payCardSelect");
  if (select) {
    select.innerHTML = state.cards.map((c, idx) => `
      <option value="${idx}">
        ${c.holder} (${c.number.slice(-4)}) - Balance: $${c.balance.toLocaleString()}
      </option>
    `).join("");
  }
  openModal("cardPaymentModal");
}

function setupFormHandlers() {
  // Card Payment Form -> OTP Verification
  const cardPayForm = document.getElementById("cardPaymentForm");
  cardPayForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const cardIdx = parseInt(document.getElementById("payCardSelect").value);
    const recipient = document.getElementById("payRecipient").value.trim();
    const amount = parseFloat(document.getElementById("payAmount").value);
    const category = document.getElementById("payCategory").value;
    const note = document.getElementById("payNote").value.trim() || "Card payment settlement";

    const card = state.cards[cardIdx];
    if (!card) return;

    if (amount > card.balance) {
      showToast("❌ Card payment failed: Insufficient balance on card.", "error");
      return;
    }

    pendingCardPayment = { cardIdx, recipient, amount, category, note };
    closeModal("cardPaymentModal");
    openModal("otpModal");
  });

  // OTP Confirmation
  document.getElementById("confirmOtpBtn")?.addEventListener("click", () => {
    if (!pendingCardPayment) return;

    closeModal("otpModal");
    showToast("⚡ Processing card payment with bank clearance...", "info");

    setTimeout(() => {
      const { cardIdx, recipient, amount, category, note } = pendingCardPayment;
      const card = state.cards[cardIdx];

      // Deduct balance
      card.balance -= amount;
      state.dailySpent += amount;
      state.expense += amount;
      state.earningTotal += amount * 0.1;

      // Log transaction
      const newTx = {
        id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
        name: recipient,
        sub: category,
        date: new Date().toISOString().replace('T', ' ').substring(0, 19),
        amount: amount,
        note: note,
        status: "Completed",
        category: category,
        year: "2026"
      };

      state.transactions.unshift(newTx);
      state.activities.unshift({
        id: `act-${Date.now()}`,
        name: "Fokhrul Islam",
        text: `completed card payment of $${amount.toFixed(2)} to ${recipient}`,
        time: "Just now",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
      });

      saveState();
      renderAll();
      showToast(`✅ Payment of $${amount.toFixed(2)} to ${recipient} completed successfully!`);
      showReceiptModal(newTx);
      pendingCardPayment = null;
    }, 1200);
  });

  // Add Card Form
  document.getElementById("addCardForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const holder = document.getElementById("newCardHolder").value.trim();
    const number = document.getElementById("newCardNumber").value.trim();
    const exp = document.getElementById("newCardExp").value.trim();
    const cvv = document.getElementById("newCardCvv").value.trim();
    const balance = parseFloat(document.getElementById("newCardBalance").value) || 1000;
    const theme = document.getElementById("newCardTheme").value;

    state.cards.push({
      id: `card-${Date.now()}`,
      holder, number, exp, cvv, balance, theme
    });
    state.activeCardIndex = state.cards.length - 1;

    saveState();
    renderAll();
    closeModal("addCardModal");
    showToast(`💳 New ${theme.toUpperCase()} payment card added successfully!`);
  });

  // Top Up Form
  document.getElementById("topUpForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const amount = parseFloat(document.getElementById("topUpAmount").value);
    const card = state.cards[state.activeCardIndex || 0];

    if (card && amount > 0) {
      card.balance += amount;
      state.income += amount;
      saveState();
      renderAll();
      closeModal("topUpCardModal");
      showToast(`💰 Added $${amount.toFixed(2)} to ${card.holder}'s card!`);
    }
  });

  // Direct Transfer Form
  document.getElementById("transferForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const recipient = document.getElementById("transferRecipient").value.trim();
    const amount = parseFloat(document.getElementById("transferAmount").value);
    const note = document.getElementById("transferNote").value.trim() || "P2P Transfer";

    const card = state.cards[state.activeCardIndex || 0];
    if (card && amount <= card.balance) {
      card.balance -= amount;
      state.transactions.unshift({
        id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
        name: recipient,
        sub: "Transfers",
        date: new Date().toISOString().replace('T', ' ').substring(0, 19),
        amount: amount,
        note: note,
        status: "Completed",
        category: "Transfers",
        year: "2026"
      });
      saveState();
      renderAll();
      closeModal("transferModal");
      showToast(`↗ Transferred $${amount.toFixed(2)} to ${recipient}!`);
    } else {
      showToast("❌ Transfer failed: Insufficient funds.", "error");
    }
  });

  // Request Money Form
  document.getElementById("requestForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const payer = document.getElementById("reqPayer").value.trim();
    const amount = parseFloat(document.getElementById("reqAmount").value);

    showToast(`📩 Payment request for $${amount.toFixed(2)} sent to ${payer}!`);
    closeModal("requestModal");
  });
}

// --------------------------------------------------------------------------
// Receipt Modal & Helper Utilities
// --------------------------------------------------------------------------
function showReceiptModal(tx) {
  const content = document.getElementById("receiptModalContent");
  if (!content) return;

  content.innerHTML = `
    <div style="text-align:center; padding:10px 0; border-bottom:1px dashed #E2E8F0; margin-bottom:16px;">
      <div style="font-size:24px; font-weight:800; color:#0F172A;">FinSight</div>
      <div style="font-size:12px; color:#64748B;">Official Payment Receipt</div>
    </div>
    <div style="display:flex; flex-direction:column; gap:10px; font-size:13px;">
      <div style="display:flex; justify-content:space-between;"><span>Transaction ID:</span> <strong>${tx.id}</strong></div>
      <div style="display:flex; justify-content:space-between;"><span>Recipient / Name:</span> <strong>${escapeHtml(tx.name)}</strong></div>
      <div style="display:flex; justify-content:space-between;"><span>Date & Time:</span> <span>${tx.date}</span></div>
      <div style="display:flex; justify-content:space-between;"><span>Category:</span> <span>${tx.category}</span></div>
      <div style="display:flex; justify-content:space-between;"><span>Status:</span> <span class="tx-status-pill ${tx.status === 'Completed' ? 'pill-completed' : (tx.status === 'Failed' ? 'pill-failed' : 'pill-pending')}">${tx.status}</span></div>
      <div style="display:flex; justify-content:space-between; font-size:16px; margin-top:10px; padding-top:10px; border-top:1px solid #EAEFEA;"><span>Total Amount:</span> <strong style="color:#22C55E;">$${tx.amount.toFixed(2)}</strong></div>
    </div>
  `;

  openModal("receiptModal");

  const printBtn = document.getElementById("printReceiptBtn");
  if (printBtn) printBtn.onclick = () => window.print();
  const closeBtn = document.getElementById("closeReceiptBtn");
  if (closeBtn) closeBtn.onclick = () => closeModal("receiptModal");
}

function openModal(id) {
  document.getElementById(id)?.classList.remove("hidden");
}

function closeModal(id) {
  document.getElementById(id)?.classList.add("hidden");
}

function showToast(msg, type = "success") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  if (type === "error") toast.style.backgroundColor = "#991B1B";
  toast.textContent = msg;

  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3500);
}

function escapeHtml(str) {
  return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
