/**
 * Velo Vault - Modern Fintech Dashboard Core Script
 * Uses localStorage for full state persistence.
 */

const STORAGE_KEY = 'velo_fintech_dashboard_state_v1';

// Initial Seed State Generator
function getInitialState() {
  return {
    balances: {
      checking: 28450.00,
      savings: 14200.00,
      investment: 5640.50
    },
    hideBalance: false,
    card: {
      isFrozen: false,
      isNumRevealed: false,
      number: "4532 8901 2341 8842",
      expiry: "10/29",
      cvv: "892"
    },
    contacts: [
      { name: "Sarah J.", full: "Sarah Jenkins", email: "sarah.j@example.com", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80" },
      { name: "Marcus V.", full: "Marcus Vance", email: "marcus.v@example.com", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" },
      { name: "Elena R.", full: "Elena Rostova", email: "elena.r@example.com", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80" },
      { name: "David M.", full: "David Miller", email: "david.m@example.com", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80" },
      { name: "Amara O.", full: "Amara Okafor", email: "amara.o@example.com", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80" }
    ],
    transactions: [
      {
        id: "TX-9042",
        title: "Apple Store - Watch Ultra 2",
        amount: 799.00,
        type: "OUTGOING",
        status: "PENDING",
        category: "Shopping",
        account: "checking",
        date: "2026-08-31 10:14",
        icon: "⌚",
        recipient: "Apple Retail US",
        note: "Awaiting bank clearance verification"
      },
      {
        id: "TX-9041",
        title: "Acme Corp - Monthly Salary",
        amount: 4850.00,
        type: "INCOMING",
        status: "COMPLETED",
        category: "Income",
        account: "checking",
        date: "2026-08-30 08:30",
        icon: "💰",
        recipient: "Acme Payroll Direct",
        note: "Direct deposit monthly payroll"
      },
      {
        id: "TX-9040",
        title: "Stripe Payout - Consulting",
        amount: 1250.00,
        type: "INCOMING",
        status: "PENDING",
        category: "Income",
        account: "checking",
        date: "2026-08-30 16:45",
        icon: "⚡",
        recipient: "Stripe Payouts",
        note: "P2P Consulting invoice hold"
      },
      {
        id: "TX-9039",
        title: "Whole Foods Organic Market",
        amount: 142.80,
        type: "OUTGOING",
        status: "COMPLETED",
        category: "Food & Dining",
        account: "checking",
        date: "2026-08-29 19:20",
        icon: "🛒",
        recipient: "Whole Foods Market",
        note: "Weekly grocery purchase"
      },
      {
        id: "TX-9038",
        title: "Elena R. - Dinner Split",
        amount: 45.00,
        type: "INCOMING",
        status: "COMPLETED",
        category: "Transfers",
        account: "checking",
        date: "2026-08-28 21:10",
        icon: "🍽️",
        recipient: "Elena Rostova",
        note: "Italian bistro dinner split"
      },
      {
        id: "TX-9037",
        title: "TechFund Growth ETF Dividend",
        amount: 320.50,
        type: "INCOMING",
        status: "COMPLETED",
        category: "Investment",
        account: "investment",
        date: "2026-08-27 11:00",
        icon: "📈",
        recipient: "Vanguard ETF Payout",
        note: "Q3 Dividend Payout"
      },
      {
        id: "TX-9036",
        title: "Netflix Premium Subscription",
        amount: 19.99,
        type: "OUTGOING",
        status: "COMPLETED",
        category: "Bills",
        account: "checking",
        date: "2026-08-26 14:00",
        icon: "🎬",
        recipient: "Netflix Inc.",
        note: "Recurring monthly entertainment"
      },
      {
        id: "TX-9035",
        title: "Uber Ride - Airport Express",
        amount: 42.50,
        type: "OUTGOING",
        status: "PENDING",
        category: "Transfers",
        account: "checking",
        date: "2026-08-26 09:15",
        icon: "🚗",
        recipient: "Uber Technologies",
        note: "Ride pre-authorization"
      },
      {
        id: "TX-9034",
        title: "CleanEnergy Utilities Settlement",
        amount: 134.50,
        type: "OUTGOING",
        status: "COMPLETED",
        category: "Bills",
        account: "checking",
        date: "2026-08-24 10:00",
        icon: "⚡",
        recipient: "CleanEnergy Utility Corp",
        note: "Electricity bill settlement"
      }
    ]
  };
}

// Global App State
let state = loadState();
let activeTab = 'ALL';
let activePeriod = '1M';

// Local Storage Handlers
function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to parse saved state, fallback to initial", e);
    }
  }
  const initial = getInitialState();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  return initial;
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// Currency Formatter
function formatCurrency(val) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(val);
}

// DOM Rendering Functions
function renderBalances() {
  const total = state.balances.checking + state.balances.savings + state.balances.investment;

  const totalEl = document.getElementById('totalBalanceDisplay');
  const checkingEl = document.getElementById('checkingBalanceDisplay');
  const savingsEl = document.getElementById('savingsBalanceDisplay');
  const investEl = document.getElementById('investmentBalanceDisplay');

  const optCheckingVal = document.getElementById('optCheckingVal');
  const optSavingsVal = document.getElementById('optSavingsVal');

  if (state.hideBalance) {
    totalEl.textContent = "••••••";
    checkingEl.textContent = "$••••••";
    savingsEl.textContent = "$••••••";
    investEl.textContent = "$••••••";
  } else {
    totalEl.textContent = formatCurrency(total);
    checkingEl.textContent = `$${formatCurrency(state.balances.checking)}`;
    savingsEl.textContent = `$${formatCurrency(state.balances.savings)}`;
    investEl.textContent = `$${formatCurrency(state.balances.investment)}`;
  }

  if (optCheckingVal) optCheckingVal.textContent = formatCurrency(state.balances.checking);
  if (optSavingsVal) optSavingsVal.textContent = formatCurrency(state.balances.savings);
}

function renderCard() {
  const cardContainer = document.getElementById('creditCardContainer');
  const cardNumDisplay = document.getElementById('cardNumberDisplay');
  const cvvDisplay = document.getElementById('cardCvvDisplay');
  const statusPill = document.getElementById('cardStatusPill');
  const statusDot = document.getElementById('statusDot');
  const statusText = document.getElementById('statusText');
  const freezeBtnText = document.getElementById('freezeBtnText');

  if (state.card.isFrozen) {
    cardContainer.classList.add('frozen');
    statusPill.classList.add('frozen-pill');
    statusDot.className = 'status-dot red-dot';
    statusText.textContent = 'Frozen';
    freezeBtnText.textContent = 'Unfreeze Card';
  } else {
    cardContainer.classList.remove('frozen');
    statusPill.classList.remove('frozen-pill');
    statusDot.className = 'status-dot green-dot';
    statusText.textContent = 'Active';
    freezeBtnText.textContent = 'Freeze Card';
  }

  if (state.card.isNumRevealed) {
    cardNumDisplay.textContent = state.card.number;
    cvvDisplay.textContent = state.card.cvv;
  } else {
    cardNumDisplay.textContent = "•••• •••• •••• " + state.card.number.slice(-4);
    cvvDisplay.textContent = "***";
  }
}

function renderContacts() {
  const container = document.getElementById('contactsContainer');
  container.innerHTML = state.contacts.map(c => `
    <div class="contact-avatar-item" data-contact="${c.full}">
      <div class="contact-img-wrapper">
        <img src="${c.avatar}" alt="${c.name}" class="contact-img">
      </div>
      <span class="contact-name">${c.name}</span>
    </div>
  `).join('');

  // Attach quick click event to prefill send money modal
  container.querySelectorAll('.contact-avatar-item').forEach(el => {
    el.addEventListener('click', () => {
      const contactName = el.getAttribute('data-contact');
      document.getElementById('recipientInput').value = contactName;
      openModal('sendMoneyModal');
    });
  });
}

function renderTransactions() {
  const listEl = document.getElementById('transactionList');
  const emptyState = document.getElementById('emptyState');
  const categoryFilter = document.getElementById('categoryFilterSelect').value;
  const searchQuery = document.getElementById('globalSearchInput').value.toLowerCase().trim();

  // Filter logic
  let filtered = state.transactions.filter(tx => {
    // Tab filter
    if (activeTab === 'PENDING' && tx.status !== 'PENDING') return false;
    if (activeTab === 'INCOMING' && tx.type !== 'INCOMING') return false;
    if (activeTab === 'OUTGOING' && (tx.type !== 'OUTGOING' || tx.status === 'PENDING')) return false;

    // Category filter
    if (categoryFilter !== 'ALL' && tx.category !== categoryFilter) return false;

    // Search query filter
    if (searchQuery) {
      const matchesTitle = tx.title.toLowerCase().includes(searchQuery);
      const matchesRecipient = tx.recipient.toLowerCase().includes(searchQuery);
      const matchesCat = tx.category.toLowerCase().includes(searchQuery);
      const matchesId = tx.id.toLowerCase().includes(searchQuery);
      return matchesTitle || matchesRecipient || matchesCat || matchesId;
    }

    return true;
  });

  // Calculate counts for tab badges
  const countAll = state.transactions.length;
  const countPending = state.transactions.filter(t => t.status === 'PENDING').length;
  const countIncoming = state.transactions.filter(t => t.type === 'INCOMING').length;
  const countOutgoing = state.transactions.filter(t => t.type === 'OUTGOING' && t.status !== 'PENDING').length;

  document.getElementById('countAll').textContent = countAll;
  document.getElementById('countPending').textContent = countPending;
  document.getElementById('countIncoming').textContent = countIncoming;
  document.getElementById('countOutgoing').textContent = countOutgoing;

  if (filtered.length === 0) {
    listEl.innerHTML = '';
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');

  listEl.innerHTML = filtered.map(tx => {
    const isIncoming = tx.type === 'INCOMING';
    const isPending = tx.status === 'PENDING';
    const sign = isIncoming ? '+' : '-';
    const amountColorClass = isIncoming ? 'green-text' : (isPending ? 'yellow-text' : 'f8fafc');

    let badgeMarkup = '';
    if (isPending) {
      badgeMarkup = `<span class="tx-badge badge-pending">⚡ Pending Clearance</span>`;
    } else if (isIncoming) {
      badgeMarkup = `<span class="tx-badge badge-incoming">↙ Incoming</span>`;
    } else {
      badgeMarkup = `<span class="tx-badge badge-outgoing">↗ Outgoing</span>`;
    }

    return `
      <div class="tx-item" data-tx-id="${tx.id}">
        <div class="tx-left">
          <div class="tx-icon-box ${isIncoming ? 'green-bg' : (isPending ? 'amber-bg' : 'indigo-bg')}">
            ${tx.icon || '💸'}
          </div>
          <div class="tx-details">
            <span class="tx-title">${escapeHTML(tx.title)}</span>
            <span class="tx-meta">${escapeHTML(tx.category)} • ${tx.date}</span>
          </div>
        </div>
        <div class="tx-right">
          <span class="tx-amount ${amountColorClass}">${sign}$${formatCurrency(tx.amount)}</span>
          ${badgeMarkup}
        </div>
      </div>
    `;
  }).join('');

  // Add click handlers for transaction detail receipt
  listEl.querySelectorAll('.tx-item').forEach(item => {
    item.addEventListener('click', () => {
      const txId = item.getAttribute('data-tx-id');
      openTxDetailModal(txId);
    });
  });
}

function renderAnalytics() {
  const canvas = document.getElementById('cashflowCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  // Set resolution based on devicePixelRatio
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = 180 * dpr;
  ctx.scale(dpr, dpr);

  const width = rect.width;
  const height = 180;

  ctx.clearRect(0, 0, width, height);

  // Compute metrics for last 30d
  const incomingSum = state.transactions
    .filter(t => t.type === 'INCOMING' && t.status === 'COMPLETED')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const expensesSum = state.transactions
    .filter(t => t.type === 'OUTGOING' && t.status === 'COMPLETED')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const pendingSum = state.transactions
    .filter(t => t.status === 'PENDING')
    .reduce((acc, curr) => acc + curr.amount, 0);

  document.getElementById('totalIncomingMetric').textContent = `$${formatCurrency(incomingSum)}`;
  document.getElementById('totalExpensesMetric').textContent = `$${formatCurrency(expensesSum)}`;
  document.getElementById('pendingLiquidityMetric').textContent = `$${formatCurrency(pendingSum)}`;

  // Draw smooth trend chart
  const incomePoints = [1200, 1800, 1500, 2900, 3200, 4850];
  const expensePoints = [800, 1100, 950, 1400, 1250, 1600];

  const step = width / (incomePoints.length - 1);
  const maxVal = 5500;

  // Grid Lines
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 1;
  for (let i = 1; i <= 3; i++) {
    const y = (height / 4) * i;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Income Line (Green Gradient fill)
  drawCurve(ctx, incomePoints, step, height, maxVal, '#10b981', 'rgba(16, 185, 129, 0.15)');

  // Expense Line (Indigo Line)
  drawCurve(ctx, expensePoints, step, height, maxVal, '#818cf8', 'rgba(99, 102, 241, 0.08)');
}

function drawCurve(ctx, points, step, height, maxVal, strokeColor, fillColor) {
  ctx.beginPath();
  const getX = i => i * step;
  const getY = val => height - (val / maxVal) * (height - 30) - 15;

  ctx.moveTo(getX(0), getY(points[0]));
  for (let i = 0; i < points.length - 1; i++) {
    const xc = (getX(i) + getX(i + 1)) / 2;
    const yc = (getY(points[i]) + getY(points[i + 1])) / 2;
    ctx.quadraticCurveTo(getX(i), getY(points[i]), xc, yc);
  }
  ctx.lineTo(getX(points.length - 1), getY(points[points.length - 1]));

  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = 3;
  ctx.stroke();

  // Fill gradient
  ctx.lineTo(getX(points.length - 1), height);
  ctx.lineTo(0, height);
  ctx.closePath();
  ctx.fillStyle = fillColor;
  ctx.fill();
}

// Modal Handlers
function openModal(modalId) {
  document.getElementById(modalId).classList.remove('hidden');
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.add('hidden');
}

function openTxDetailModal(txId) {
  const tx = state.transactions.find(t => t.id === txId);
  if (!tx) return;

  const detailBody = document.getElementById('txDetailBody');
  const isPending = tx.status === 'PENDING';
  const isIncoming = tx.type === 'INCOMING';

  detailBody.innerHTML = `
    <div class="receipt-box">
      <div class="receipt-row">
        <span class="receipt-key">Transaction ID</span>
        <span class="receipt-val">${tx.id}</span>
      </div>
      <div class="receipt-row">
        <span class="receipt-key">Title / Description</span>
        <span class="receipt-val">${escapeHTML(tx.title)}</span>
      </div>
      <div class="receipt-row">
        <span class="receipt-key">Recipient / Sender</span>
        <span class="receipt-val">${escapeHTML(tx.recipient || 'N/A')}</span>
      </div>
      <div class="receipt-row">
        <span class="receipt-key">Category</span>
        <span class="receipt-val">${escapeHTML(tx.category)}</span>
      </div>
      <div class="receipt-row">
        <span class="receipt-key">Timestamp</span>
        <span class="receipt-val">${tx.date}</span>
      </div>
      <div class="receipt-row">
        <span class="receipt-key">Funding Account</span>
        <span class="receipt-val">${tx.account.toUpperCase()}</span>
      </div>
      <div class="receipt-divider"></div>
      <div class="receipt-row">
        <span class="receipt-key">Amount</span>
        <span class="receipt-val ${isIncoming ? 'green-text' : (isPending ? 'yellow-text' : '')}" style="font-size: 18px;">
          ${isIncoming ? '+' : '-'}$${formatCurrency(tx.amount)}
        </span>
      </div>
      <div class="receipt-row">
        <span class="receipt-key">Status</span>
        <span class="tx-badge ${isPending ? 'badge-pending' : (isIncoming ? 'badge-incoming' : 'badge-outgoing')}">
          ${tx.status}
        </span>
      </div>
      ${tx.note ? `<div class="receipt-row"><span class="receipt-key">Note</span><span class="receipt-val">${escapeHTML(tx.note)}</span></div>` : ''}

      ${isPending ? `
        <button class="receipt-cancel-pending-btn" id="cancelPendingTxBtn" data-tx-id="${tx.id}">
          Cancel Pending Transaction & Refund
        </button>
      ` : ''}
    </div>
  `;

  openModal('txDetailModal');

  const cancelBtn = document.getElementById('cancelPendingTxBtn');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      cancelPendingTransaction(tx.id);
      closeModal('txDetailModal');
    });
  }
}

function cancelPendingTransaction(txId) {
  const index = state.transactions.findIndex(t => t.id === txId);
  if (index !== -1) {
    const tx = state.transactions[index];
    // Refund balance if it was outgoing pending
    if (tx.type === 'OUTGOING') {
      state.balances[tx.account] += tx.amount;
    }
    state.transactions.splice(index, 1);
    saveState();
    updateUI();
    showToast(`Pending transaction ${txId} cancelled & funds returned`, 'warning');
  }
}

// Toast Notifications
function showToast(msg, type = 'info') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast-message ${type}`;
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
    <span>${escapeHTML(msg)}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Utility HTML escape
function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

// Dynamic UI Refresh
function updateUI() {
  renderBalances();
  renderCard();
  renderContacts();
  renderTransactions();
  renderAnalytics();
}

// Setup Event Listeners
function initEventListeners() {
  // Balance Visibility Toggle
  document.getElementById('toggleBalanceBtn').addEventListener('click', () => {
    state.hideBalance = !state.hideBalance;
    saveState();
    renderBalances();
    showToast(state.hideBalance ? 'Privacy mode enabled' : 'Balances visible', 'info');
  });

  // Card Controls
  document.getElementById('revealCardNumBtn').addEventListener('click', () => {
    state.card.isNumRevealed = !state.card.isNumRevealed;
    saveState();
    renderCard();
  });

  document.getElementById('toggleFreezeBtn').addEventListener('click', () => {
    if (state.card.isFrozen) {
      state.card.isFrozen = false;
      showToast('Virtual card unfrozen and ready to use', 'success');
    } else {
      state.card.isFrozen = true;
      showToast('Virtual card frozen successfully', 'warning');
    }
    saveState();
    renderCard();
  });

  document.getElementById('copyCardNumBtn').addEventListener('click', () => {
    navigator.clipboard.writeText(state.card.number.replace(/\s+/g, ''));
    showToast('Card number copied to clipboard', 'success');
  });

  document.getElementById('cardLimitBtn').addEventListener('click', () => {
    showToast('Monthly card spending limit: $10,000.00 ($7,450 remaining)', 'info');
  });

  // Filter Tabs
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeTab = btn.getAttribute('data-tab');
      renderTransactions();
    });
  });

  // Category & Search Filters
  document.getElementById('categoryFilterSelect').addEventListener('change', renderTransactions);
  document.getElementById('globalSearchInput').addEventListener('input', renderTransactions);

  // Period Toggle for Analytics
  document.querySelectorAll('.period-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.period-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activePeriod = btn.getAttribute('data-period');
      renderAnalytics();
    });
  });

  // Modals Open Triggers
  document.getElementById('openSendModalBtn').addEventListener('click', () => openModal('sendMoneyModal'));
  document.getElementById('openDepositModalBtn').addEventListener('click', () => openModal('depositModal'));
  document.getElementById('openRequestModalBtn').addEventListener('click', () => openModal('requestModal'));
  document.getElementById('openBillsModalBtn').addEventListener('click', () => openModal('billsModal'));

  // Modals Close Triggers
  document.getElementById('closeSendModalBtn').addEventListener('click', () => closeModal('sendMoneyModal'));
  document.getElementById('cancelSendBtn').addEventListener('click', () => closeModal('sendMoneyModal'));

  document.getElementById('closeDepositModalBtn').addEventListener('click', () => closeModal('depositModal'));
  document.getElementById('cancelDepositBtn').addEventListener('click', () => closeModal('depositModal'));

  document.getElementById('closeRequestModalBtn').addEventListener('click', () => closeModal('requestModal'));
  document.getElementById('cancelRequestBtn').addEventListener('click', () => closeModal('requestModal'));

  document.getElementById('closeBillsModalBtn').addEventListener('click', () => closeModal('billsModal'));
  document.getElementById('closeTxDetailBtn').addEventListener('click', () => closeModal('txDetailModal'));

  // Form Submissions
  // 1. Send Money
  document.getElementById('sendMoneyForm').addEventListener('submit', (e) => {
    e.preventDefault();

    if (state.card.isFrozen) {
      showToast('Cannot process transfer while virtual card/account is frozen!', 'warning');
      return;
    }

    const fromAccount = document.getElementById('sendFromAccount').value;
    const recipient = document.getElementById('recipientInput').value.trim();
    const amount = parseFloat(document.getElementById('sendAmount').value);
    const category = document.getElementById('sendCategory').value;
    const execType = document.getElementById('sendExecutionType').value;
    const note = document.getElementById('sendNote').value.trim();

    if (isNaN(amount) || amount <= 0) {
      showToast('Please enter a valid transfer amount', 'warning');
      return;
    }

    if (state.balances[fromAccount] < amount) {
      showToast(`Insufficient funds in ${fromAccount} account!`, 'warning');
      return;
    }

    // Deduct balance
    state.balances[fromAccount] -= amount;

    const newTx = {
      id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
      title: `Transfer to ${recipient}`,
      amount: amount,
      type: "OUTGOING",
      status: execType,
      category: category,
      account: fromAccount,
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      icon: "↗",
      recipient: recipient,
      note: note || "P2P Transfer"
    };

    state.transactions.unshift(newTx);
    saveState();
    updateUI();
    closeModal('sendMoneyModal');
    document.getElementById('sendMoneyForm').reset();
    showToast(`Successfully transferred $${formatCurrency(amount)} to ${recipient}`, 'success');
  });

  // 2. Deposit Funds
  document.getElementById('depositForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const targetAcc = document.getElementById('depositTargetAccount').value;
    const source = document.getElementById('depositSource').value;
    const amount = parseFloat(document.getElementById('depositAmount').value);
    const statusType = document.getElementById('depositStatusType').value;

    if (isNaN(amount) || amount <= 0) {
      showToast('Please enter a valid deposit amount', 'warning');
      return;
    }

    if (statusType === 'INCOMING') {
      state.balances[targetAcc] += amount;
    }

    const newTx = {
      id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
      title: `Deposit from ${source}`,
      amount: amount,
      type: "INCOMING",
      status: statusType === 'INCOMING' ? 'COMPLETED' : 'PENDING',
      category: "Income",
      account: targetAcc,
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      icon: "📥",
      recipient: "Self Deposit",
      note: `Fund transfer via ${source}`
    };

    state.transactions.unshift(newTx);
    saveState();
    updateUI();
    closeModal('depositModal');
    document.getElementById('depositForm').reset();
    showToast(`Deposit of $${formatCurrency(amount)} processed`, 'success');
  });

  // 3. Request Money Form
  document.getElementById('requestForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const payer = document.getElementById('requestPayer').value.trim();
    const amount = parseFloat(document.getElementById('requestAmount').value);
    const reason = document.getElementById('requestReason').value.trim();

    if (isNaN(amount) || amount <= 0) {
      showToast('Please enter a valid requested amount', 'warning');
      return;
    }

    showToast(`Payment request invoice for $${formatCurrency(amount)} sent to ${payer}`, 'success');
    closeModal('requestModal');
    document.getElementById('requestForm').reset();
  });

  // 4. Pay Bills One-Click Buttons
  document.querySelectorAll('.bill-pay-now-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.bill-card-item');
      const biller = card.getAttribute('data-biller');
      const amount = parseFloat(card.getAttribute('data-amount'));

      if (state.balances.checking < amount) {
        showToast('Insufficient funds in Checking account to pay bill!', 'warning');
        return;
      }

      state.balances.checking -= amount;

      const newTx = {
        id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
        title: `${biller} Bill`,
        amount: amount,
        type: "OUTGOING",
        status: "COMPLETED",
        category: "Bills",
        account: "checking",
        date: new Date().toISOString().replace('T', ' ').slice(0, 16),
        icon: "🧾",
        recipient: biller,
        note: "One-click utility payment"
      };

      state.transactions.unshift(newTx);
      saveState();
      updateUI();
      closeModal('billsModal');
      showToast(`Paid $${formatCurrency(amount)} bill to ${biller}`, 'success');
    });
  });

  // Reset Demo State Button
  document.getElementById('resetDataBtn').addEventListener('click', () => {
    if (confirm("Reset dashboard to default demo data? All custom transactions will be refreshed.")) {
      state = getInitialState();
      saveState();
      updateUI();
      showToast('Dashboard reset to default demo data', 'info');
    }
  });

  // Notifications icon toast trigger
  document.getElementById('notificationsBtn').addEventListener('click', () => {
    showToast('You have 3 unread alerts: 2 Pending clearances & 1 Deposit received', 'info');
  });

  // Window Resize chart redraw
  window.addEventListener('resize', renderAnalytics);
}

// Application Entry Point
document.addEventListener('DOMContentLoaded', () => {
  initEventListeners();
  updateUI();
});
