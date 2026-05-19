// Elconekt — extended mock data
// Door locks importer, Tripoli. LYD currency, per-container USD rate lock.

// ─── Containers ────────────────────────────────────────────────────────────
const CONTAINERS = [
  {
    id: 'ELK-2025-007', bl: 'BL-MSCU-7841902', origin: 'Shanghai, CN',
    arrival: '2025-04-28', eta: null, status: 'arrived',
    rate: 5.42, rateDate: '2025-04-12',
    purchaseUsd: 84_500, shippingUsd: 6_400, customsUsd: 9_870,
    units: 1840,
    products: [
      { sku: 'YL-CYL-60',  name: 'Yale cylinder lock 60mm',     brand: 'Yale',       cat: 'Cylinder',    qty: 420, costUsd: 28.40, priceLyd: 375 },
      { sku: 'CS-DBT-45',  name: 'Cisa deadbolt 45mm',          brand: 'Cisa',       cat: 'Deadbolt',    qty: 280, costUsd: 41.20, priceLyd: 530 },
      { sku: 'AB-PAD-70',  name: 'Abus padlock 70mm',           brand: 'Abus',       cat: 'Padlock',     qty: 540, costUsd: 18.10, priceLyd: 260 },
      { sku: 'YL-MOR-EU',  name: 'Yale euro-mortise body',      brand: 'Yale',       cat: 'Mortise',     qty: 320, costUsd: 52.80, priceLyd: 640 },
      { sku: 'KB-HND-SS',  name: 'Kaba handle set, stainless',  brand: 'Kaba',       cat: 'Handle',      qty: 280, costUsd: 36.50, priceLyd: 460 },
    ],
  },
  {
    id: 'ELK-2025-008', bl: 'BL-ONEY-1290847', origin: 'Guangzhou, CN',
    arrival: null, eta: '2025-05-22', status: 'in_transit',
    rate: 5.48, rateDate: '2025-05-01',
    purchaseUsd: 102_300, shippingUsd: 7_120, customsUsd: 11_450,
    units: 2240,
    products: [
      { sku: 'MTL-DBT-PRO', name: 'Mul-T-Lock deadbolt pro',     brand: 'Mul-T-Lock', cat: 'Deadbolt',  qty: 360, costUsd: 64.20, priceLyd: 820 },
      { sku: 'YL-CYL-80',   name: 'Yale cylinder lock 80mm',     brand: 'Yale',       cat: 'Cylinder',  qty: 480, costUsd: 32.10, priceLyd: 420 },
      { sku: 'CS-MOR-SR',   name: 'Cisa mortise, security',      brand: 'Cisa',       cat: 'Mortise',   qty: 320, costUsd: 78.40, priceLyd: 990 },
      { sku: 'AB-PAD-50',   name: 'Abus padlock 50mm',           brand: 'Abus',       cat: 'Padlock',   qty: 720, costUsd: 12.80, priceLyd: 180 },
      { sku: 'KB-CYL-EU',   name: 'Kaba euro cylinder',          brand: 'Kaba',       cat: 'Cylinder',  qty: 360, costUsd: 44.50, priceLyd: 570 },
    ],
  },
  {
    id: 'ELK-2025-006', bl: 'BL-MSCU-7128401', origin: 'Istanbul, TR',
    arrival: '2025-03-14', eta: null, status: 'closed',
    rate: 5.28, rateDate: '2025-02-26',
    purchaseUsd: 61_200, shippingUsd: 4_800, customsUsd: 7_140,
    units: 1520, products: [],
  },
  {
    id: 'ELK-2025-005', bl: 'BL-COSU-9012387', origin: 'Shanghai, CN',
    arrival: '2025-02-20', eta: null, status: 'arrived',
    rate: 5.18, rateDate: '2025-02-04',
    purchaseUsd: 73_400, shippingUsd: 5_900, customsUsd: 8_280,
    units: 1680,
    products: [
      { sku: 'YL-CYL-60',   name: 'Yale cylinder lock 60mm',     brand: 'Yale',       cat: 'Cylinder',  qty: 600, costUsd: 27.10, priceLyd: 365 },
      { sku: 'CS-DBT-45',   name: 'Cisa deadbolt 45mm',          brand: 'Cisa',       cat: 'Deadbolt',  qty: 320, costUsd: 39.80, priceLyd: 515 },
      { sku: 'AB-PAD-70',   name: 'Abus padlock 70mm',           brand: 'Abus',       cat: 'Padlock',   qty: 380, costUsd: 17.50, priceLyd: 250 },
      { sku: 'KB-HND-SS',   name: 'Kaba handle set, stainless',  brand: 'Kaba',       cat: 'Handle',    qty: 380, costUsd: 35.10, priceLyd: 445 },
    ],
  },
  {
    id: 'ELK-2025-004', bl: 'BL-HMM-4408215', origin: 'Ningbo, CN',
    arrival: '2025-01-18', eta: null, status: 'arrived',
    rate: 4.96, rateDate: '2024-12-30',
    purchaseUsd: 58_700, shippingUsd: 5_100, customsUsd: 6_810,
    units: 1340, products: [],
  },
  {
    id: 'ELK-2025-009', bl: 'BL-ONEY-1304502', origin: 'Shenzhen, CN',
    arrival: null, eta: '2025-06-04', status: 'in_transit',
    rate: 5.51, rateDate: '2025-05-09',
    purchaseUsd: 96_800, shippingUsd: 6_980, customsUsd: 10_240,
    units: 2080, products: [],
  },
  {
    id: 'ELK-2024-018', bl: 'BL-MSCU-6094112', origin: 'Hamburg, DE',
    arrival: '2024-12-11', eta: null, status: 'closed',
    rate: 4.84, rateDate: '2024-11-22',
    purchaseUsd: 47_500, shippingUsd: 4_200, customsUsd: 5_910,
    units: 1080, products: [],
  },
];

// ─── Sales Inventory (pushed from containers) ──────────────────────────────
// Each entry = a SKU available to sales. Inventory tracks which container
// each unit came from (so cost is traced back to the container's locked rate).
const INVENTORY = [
  { sku: 'YL-CYL-60',   name: 'Yale cylinder lock 60mm',     brand: 'Yale',       cat: 'Cylinder', priceLyd: 375,
    lots: [ { container: 'ELK-2025-007', qty: 280, costUsd: 28.40, rate: 5.42 },
            { container: 'ELK-2025-005', qty: 140, costUsd: 27.10, rate: 5.18 } ], sold: 248 },
  { sku: 'CS-DBT-45',   name: 'Cisa deadbolt 45mm',          brand: 'Cisa',       cat: 'Deadbolt', priceLyd: 530,
    lots: [ { container: 'ELK-2025-007', qty: 180, costUsd: 41.20, rate: 5.42 } ], sold: 92 },
  { sku: 'AB-PAD-70',   name: 'Abus padlock 70mm',           brand: 'Abus',       cat: 'Padlock',  priceLyd: 260,
    lots: [ { container: 'ELK-2025-007', qty: 300, costUsd: 18.10, rate: 5.42 } ], sold: 184 },
  { sku: 'YL-MOR-EU',   name: 'Yale euro-mortise body',      brand: 'Yale',       cat: 'Mortise',  priceLyd: 640,
    lots: [ { container: 'ELK-2025-007', qty: 180, costUsd: 52.80, rate: 5.42 } ], sold: 64 },
  { sku: 'KB-HND-SS',   name: 'Kaba handle set, stainless',  brand: 'Kaba',       cat: 'Handle',   priceLyd: 460,
    lots: [ { container: 'ELK-2025-007', qty: 160, costUsd: 36.50, rate: 5.42 },
            { container: 'ELK-2025-005', qty: 220, costUsd: 35.10, rate: 5.18 } ], sold: 162 },
  { sku: 'YL-CYL-80',   name: 'Yale cylinder lock 80mm',     brand: 'Yale',       cat: 'Cylinder', priceLyd: 420,
    lots: [ { container: 'ELK-2025-005', qty: 220, costUsd: 30.40, rate: 5.18 } ], sold: 184 },
  { sku: 'CS-MOR-SR',   name: 'Cisa mortise, security',      brand: 'Cisa',       cat: 'Mortise',  priceLyd: 990,
    lots: [ { container: 'ELK-2025-005', qty: 160, costUsd: 74.20, rate: 5.18 } ], sold: 38 },
  { sku: 'MTL-DBT-PRO', name: 'Mul-T-Lock deadbolt pro',     brand: 'Mul-T-Lock', cat: 'Deadbolt', priceLyd: 820,
    lots: [ { container: 'ELK-2025-005', qty: 140, costUsd: 62.80, rate: 5.18 } ], sold: 18 },
  { sku: 'AB-PAD-50',   name: 'Abus padlock 50mm',           brand: 'Abus',       cat: 'Padlock',  priceLyd: 180,
    lots: [ { container: 'ELK-2025-005', qty: 480, costUsd: 12.40, rate: 5.18 } ], sold: 312 },
  { sku: 'KB-CYL-EU',   name: 'Kaba euro cylinder',          brand: 'Kaba',       cat: 'Cylinder', priceLyd: 570,
    lots: [ { container: 'ELK-2025-005', qty: 180, costUsd: 43.20, rate: 5.18 } ], sold: 24 },
];

// ─── Clients ───────────────────────────────────────────────────────────────
const CLIENTS = [
  { id: 'C-0042', name: 'Khaled Buhliga',  company: 'Buhliga Construction',    type: 'contractor', phone: '+218 91 4023 778', email: 'khaled@buhliga.ly',   city: 'Tripoli',  tags: ['priority', 'net-30'], notes: 'Repeat client, 6 projects. Prefers Yale & Kaba. Site visits Tue/Thu.' },
  { id: 'C-0038', name: 'Mariam Al-Fitouri', company: 'Al-Fitouri Hardware Store', type: 'retailer',  phone: '+218 92 5512 304', email: 'orders@fitouri.ly',   city: 'Misrata',  tags: ['retailer'],         notes: 'Monthly bulk orders. Wants 30-day terms.' },
  { id: 'C-0029', name: 'Omar Trabelsi',   company: 'Trabelsi Property Group', type: 'contractor', phone: '+218 93 8847 109', email: 'omar.t@trabelsi.ly',  city: 'Tripoli',  tags: ['priority'],         notes: 'Builds high-end residential. Wants Mul-T-Lock spec.' },
  { id: 'C-0061', name: 'Fatima Ben Said', company: '—',                       type: 'individual', phone: '+218 94 2210 558', email: 'fatima.bs@gmail.com', city: 'Tripoli',  tags: [],                   notes: 'Walk-in, full apartment retrofit.' },
  { id: 'C-0044', name: 'Tarek Al-Mansoori', company: 'Mansoori & Sons',         type: 'retailer',  phone: '+218 91 7723 891', email: 'tarek@mansoori.ly',  city: 'Zawiya',   tags: ['retailer'],         notes: '' },
  { id: 'C-0017', name: 'Hossam Gargash',  company: 'Gargash Hospitality',     type: 'contractor', phone: '+218 92 4419 002', email: 'h.gargash@ghg.ly',   city: 'Benghazi', tags: ['priority', 'hotel'],notes: 'Hotel chain refit. 200+ doors. Active negotiation.' },
  { id: 'C-0053', name: 'Nawal Shibani',   company: '—',                       type: 'individual', phone: '+218 93 5523 117', email: 'nawal.sh@outlook.com', city: 'Tripoli', tags: [],                   notes: '' },
  { id: 'C-0024', name: 'Ahmed Zarroug',   company: 'Zarroug Locks Co.',       type: 'retailer',  phone: '+218 91 1124 778', email: 'ahmed@zarrouglocks.ly', city: 'Tripoli', tags: ['retailer', 'net-30'], notes: 'Wholesale. Pays late but reliable.' },
];

// ─── Sales Agents ──────────────────────────────────────────────────────────
const AGENTS = [
  { id: 'U-001', name: 'Hamza Ali',        role: 'admin', initials: 'HA', city: 'Tripoli', email: 'hamza@elconekt.ly' },
  { id: 'U-002', name: 'Layla Ben Ammar',  role: 'agent', initials: 'LB', city: 'Tripoli', email: 'layla@elconekt.ly' },
  { id: 'U-003', name: 'Yusef Marghani',   role: 'agent', initials: 'YM', city: 'Misrata', email: 'yusef@elconekt.ly' },
  { id: 'U-004', name: 'Salma Drira',      role: 'agent', initials: 'SD', city: 'Benghazi', email: 'salma@elconekt.ly' },
];

// ─── Invoices ──────────────────────────────────────────────────────────────
const INVOICES = [
  { id: 'INV-2025-0184', date: '2025-05-12', clientId: 'C-0042', agentId: 'U-002', status: 'paid',
    lines: [
      { sku: 'YL-CYL-60', qty: 24, priceLyd: 375 },
      { sku: 'KB-HND-SS', qty: 24, priceLyd: 460 },
      { sku: 'CS-DBT-45', qty: 12, priceLyd: 530 },
    ],
  },
  { id: 'INV-2025-0183', date: '2025-05-11', clientId: 'C-0038', agentId: 'U-003', status: 'issued',
    lines: [
      { sku: 'AB-PAD-70', qty: 60, priceLyd: 260 },
      { sku: 'AB-PAD-50', qty: 80, priceLyd: 180 },
    ],
  },
  { id: 'INV-2025-0182', date: '2025-05-11', clientId: 'C-0061', agentId: 'U-002', status: 'paid',
    lines: [
      { sku: 'YL-CYL-60', qty: 4, priceLyd: 375 },
      { sku: 'YL-MOR-EU', qty: 2, priceLyd: 640 },
    ],
  },
  { id: 'INV-2025-0181', date: '2025-05-10', clientId: 'C-0017', agentId: 'U-004', status: 'draft',
    lines: [
      { sku: 'MTL-DBT-PRO', qty: 18, priceLyd: 820 },
      { sku: 'KB-CYL-EU', qty: 18, priceLyd: 570 },
    ],
  },
  { id: 'INV-2025-0180', date: '2025-05-09', clientId: 'C-0029', agentId: 'U-002', status: 'paid',
    lines: [
      { sku: 'YL-MOR-EU', qty: 14, priceLyd: 640 },
      { sku: 'CS-MOR-SR', qty: 6, priceLyd: 990 },
    ],
  },
  { id: 'INV-2025-0179', date: '2025-05-08', clientId: 'C-0044', agentId: 'U-003', status: 'issued',
    lines: [
      { sku: 'YL-CYL-60', qty: 40, priceLyd: 375 },
      { sku: 'AB-PAD-70', qty: 30, priceLyd: 260 },
    ],
  },
  { id: 'INV-2025-0178', date: '2025-05-07', clientId: 'C-0042', agentId: 'U-002', status: 'paid',
    lines: [
      { sku: 'YL-CYL-80', qty: 18, priceLyd: 420 },
    ],
  },
  { id: 'INV-2025-0177', date: '2025-05-06', clientId: 'C-0053', agentId: 'U-002', status: 'refunded',
    lines: [
      { sku: 'AB-PAD-50', qty: 8, priceLyd: 180 },
    ],
  },
  { id: 'INV-2025-0176', date: '2025-05-04', clientId: 'C-0024', agentId: 'U-002', status: 'paid',
    lines: [
      { sku: 'CS-DBT-45', qty: 50, priceLyd: 530 },
      { sku: 'YL-CYL-60', qty: 50, priceLyd: 375 },
      { sku: 'KB-HND-SS', qty: 50, priceLyd: 460 },
    ],
  },
  { id: 'INV-2025-0175', date: '2025-05-02', clientId: 'C-0017', agentId: 'U-004', status: 'paid',
    lines: [
      { sku: 'KB-CYL-EU', qty: 40, priceLyd: 570 },
    ],
  },
];

// ─── Helpers ───────────────────────────────────────────────────────────────
function landedUsd(c) { return c.purchaseUsd + c.shippingUsd + c.customsUsd; }
function landedLyd(c) { return landedUsd(c) * c.rate; }
function unitCostLyd(c) { return landedLyd(c) / c.units; }
function unitCostUsd(c) { return landedUsd(c) / c.units; }

// Inventory helpers
function invStock(item) { return item.lots.reduce((s,l) => s + l.qty, 0) - item.sold; }
function invTotalQty(item) { return item.lots.reduce((s,l) => s + l.qty, 0); }
function invAvgCostLyd(item) {
  // Weighted-avg cost in LYD using each lot's container rate.
  const totalCost = item.lots.reduce((s,l) => s + l.qty * l.costUsd * l.rate, 0);
  const totalQty = invTotalQty(item);
  return totalCost / totalQty;
}
function invMarginLyd(item) { return item.priceLyd - invAvgCostLyd(item); }
function invMarginPct(item) { return (invMarginLyd(item) / item.priceLyd) * 100; }

// Container helpers
function containerSold(c) {
  // Sum sold qty across all inventory items that have a lot from this container
  let total = 0;
  INVENTORY.forEach(item => {
    const lot = item.lots.find(l => l.container === c.id);
    if (!lot) return;
    // approximate sold per lot proportional to lot share
    const lotShare = lot.qty / invTotalQty(item);
    total += Math.round(item.sold * lotShare);
  });
  return total;
}
function containerInInventory(c) {
  // Sum of units from this container currently in inventory
  return INVENTORY.reduce((s, item) => {
    const lot = item.lots.find(l => l.container === c.id);
    return s + (lot ? lot.qty : 0);
  }, 0);
}
function expectedRevenueLyd(c) {
  if (!c.products.length) {
    return c.units * unitCostLyd(c) * 1.42;
  }
  return c.products.reduce((s, p) => s + p.qty * p.priceLyd, 0);
}
function expectedProfitLyd(c) { return expectedRevenueLyd(c) - landedLyd(c); }
function marginPct(c) { return (expectedProfitLyd(c) / expectedRevenueLyd(c)) * 100; }

// Invoice helpers
function invoiceTotal(inv) { return inv.lines.reduce((s,l) => s + l.qty * l.priceLyd, 0); }
function invoiceCost(inv) {
  return inv.lines.reduce((s,l) => {
    const it = INVENTORY.find(i => i.sku === l.sku);
    if (!it) return s;
    return s + l.qty * invAvgCostLyd(it);
  }, 0);
}
function invoiceProfit(inv) { return invoiceTotal(inv) - invoiceCost(inv); }
function clientInvoices(clientId) { return INVOICES.filter(i => i.clientId === clientId); }
function clientSpend(clientId) { return clientInvoices(clientId).filter(i => i.status === 'paid').reduce((s,i) => s + invoiceTotal(i), 0); }
function agentSales(agentId, status = null) {
  return INVOICES.filter(i => i.agentId === agentId && (!status || i.status === status)).reduce((s,i) => s + invoiceTotal(i), 0);
}

// Formatters
function fmtLyd(n, opts={}) {
  const { decimals = 0, sign = false } = opts;
  if (!isFinite(n)) return '—';
  const lang = (typeof window !== 'undefined' && window.ELK_LANG) || 'en';
  const s = Math.abs(n).toLocaleString(lang === 'ar' ? 'en-US' : 'en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  const prefix = n < 0 ? '−' : (sign && n > 0 ? '+' : '');
  return prefix + s;
}
function fmtUsd(n, opts={}) {
  const { decimals = 0 } = opts;
  return '$' + Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}
function fmtDate(d) {
  if (typeof window !== 'undefined' && window.fmtDateLocal) return window.fmtDateLocal(d);
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}
function fmtDateShort(d) {
  if (typeof window !== 'undefined' && window.fmtDateShortLocal) return window.fmtDateShortLocal(d);
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
}
function statusLabel(s) {
  if (typeof window !== 'undefined' && window.t) {
    const map = { in_transit: 'statusInTransit', arrived: 'statusArrived', closed: 'statusClosed', draft: 'statusDraft', issued: 'statusIssued', paid: 'statusPaid', refunded: 'statusRefunded' };
    if (map[s]) return window.t(map[s]);
  }
  return { in_transit: 'In transit', arrived: 'Arrived', closed: 'Closed',
           draft: 'Draft', issued: 'Issued', paid: 'Paid', refunded: 'Refunded' }[s] || s;
}
// Currency code for inline labels (LYD / د.ل)
function currencyCode() {
  if (typeof window !== 'undefined' && window.t) return window.t('currencyCode');
  return 'LYD';
}
function currencyPair() {
  if (typeof window !== 'undefined' && window.t) return window.t('currencyPair');
  return 'LYD/$';
}
function findClient(id) { return CLIENTS.find(c => c.id === id); }
function findAgent(id) { return AGENTS.find(a => a.id === id); }
function findInvSku(sku) { return INVENTORY.find(i => i.sku === sku); }
function findContainer(id) { return CONTAINERS.find(c => c.id === id); }

window.ELK = {
  CONTAINERS, INVENTORY, CLIENTS, AGENTS, INVOICES,
  landedUsd, landedLyd, unitCostUsd, unitCostLyd,
  invStock, invTotalQty, invAvgCostLyd, invMarginLyd, invMarginPct,
  containerSold, containerInInventory,
  expectedRevenueLyd, expectedProfitLyd, marginPct,
  invoiceTotal, invoiceCost, invoiceProfit, clientInvoices, clientSpend, agentSales,
  fmtLyd, fmtUsd, fmtDate, fmtDateShort, statusLabel,
  currencyCode, currencyPair,
  findClient, findAgent, findInvSku, findContainer,
};
