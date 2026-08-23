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
      { sku: 'YL-CYL-60',   name: 'Yale cylinder lock 60mm',     brand: 'Yale',       cat: 'Cylinder',  qty: 160, costUsd: 27.10, priceLyd: 365 },
      { sku: 'CS-DBT-45',   name: 'Cisa deadbolt 45mm',          brand: 'Cisa',       cat: 'Deadbolt',  qty: 60,  costUsd: 39.80, priceLyd: 515 },
      { sku: 'AB-PAD-70',   name: 'Abus padlock 70mm',           brand: 'Abus',       cat: 'Padlock',   qty: 60,  costUsd: 17.50, priceLyd: 250 },
      { sku: 'KB-HND-SS',   name: 'Kaba handle set, stainless',  brand: 'Kaba',       cat: 'Handle',    qty: 220, costUsd: 35.10, priceLyd: 445 },
      { sku: 'YL-CYL-80',   name: 'Yale cylinder lock 80mm',     brand: 'Yale',       cat: 'Cylinder',  qty: 220, costUsd: 30.40, priceLyd: 420 },
      { sku: 'CS-MOR-SR',   name: 'Cisa mortise, security',      brand: 'Cisa',       cat: 'Mortise',   qty: 160, costUsd: 74.20, priceLyd: 990 },
      { sku: 'MTL-DBT-PRO', name: 'Mul-T-Lock deadbolt pro',     brand: 'Mul-T-Lock', cat: 'Deadbolt',  qty: 140, costUsd: 62.80, priceLyd: 820 },
      { sku: 'AB-PAD-50',   name: 'Abus padlock 50mm',           brand: 'Abus',       cat: 'Padlock',   qty: 480, costUsd: 12.40, priceLyd: 180 },
      { sku: 'KB-CYL-EU',   name: 'Kaba euro cylinder',          brand: 'Kaba',       cat: 'Cylinder',  qty: 180, costUsd: 43.20, priceLyd: 570 },
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
// Sold quantities are NOT stored here — they are derived from invoices
// (issued + paid) so stock can never disagree with the invoice ledger.
const INVENTORY = [
  { sku: 'YL-CYL-60',   name: 'Yale cylinder lock 60mm',     brand: 'Yale',       cat: 'Cylinder', priceLyd: 375,
    lots: [ { container: 'ELK-2025-007', qty: 280, costUsd: 28.40, rate: 5.42 },
            { container: 'ELK-2025-005', qty: 140, costUsd: 27.10, rate: 5.18 } ] },
  { sku: 'CS-DBT-45',   name: 'Cisa deadbolt 45mm',          brand: 'Cisa',       cat: 'Deadbolt', priceLyd: 530,
    lots: [ { container: 'ELK-2025-007', qty: 180, costUsd: 41.20, rate: 5.42 } ] },
  { sku: 'AB-PAD-70',   name: 'Abus padlock 70mm',           brand: 'Abus',       cat: 'Padlock',  priceLyd: 260,
    lots: [ { container: 'ELK-2025-007', qty: 300, costUsd: 18.10, rate: 5.42 } ] },
  { sku: 'YL-MOR-EU',   name: 'Yale euro-mortise body',      brand: 'Yale',       cat: 'Mortise',  priceLyd: 640,
    lots: [ { container: 'ELK-2025-007', qty: 180, costUsd: 52.80, rate: 5.42 } ] },
  { sku: 'KB-HND-SS',   name: 'Kaba handle set, stainless',  brand: 'Kaba',       cat: 'Handle',   priceLyd: 460,
    lots: [ { container: 'ELK-2025-007', qty: 160, costUsd: 36.50, rate: 5.42 },
            { container: 'ELK-2025-005', qty: 220, costUsd: 35.10, rate: 5.18 } ] },
  { sku: 'YL-CYL-80',   name: 'Yale cylinder lock 80mm',     brand: 'Yale',       cat: 'Cylinder', priceLyd: 420,
    lots: [ { container: 'ELK-2025-005', qty: 220, costUsd: 30.40, rate: 5.18 } ] },
  { sku: 'CS-MOR-SR',   name: 'Cisa mortise, security',      brand: 'Cisa',       cat: 'Mortise',  priceLyd: 990,
    lots: [ { container: 'ELK-2025-005', qty: 160, costUsd: 74.20, rate: 5.18 } ] },
  { sku: 'MTL-DBT-PRO', name: 'Mul-T-Lock deadbolt pro',     brand: 'Mul-T-Lock', cat: 'Deadbolt', priceLyd: 820,
    lots: [ { container: 'ELK-2025-005', qty: 140, costUsd: 62.80, rate: 5.18 } ] },
  { sku: 'AB-PAD-50',   name: 'Abus padlock 50mm',           brand: 'Abus',       cat: 'Padlock',  priceLyd: 180,
    lots: [ { container: 'ELK-2025-005', qty: 480, costUsd: 12.40, rate: 5.18 } ] },
  { sku: 'KB-CYL-EU',   name: 'Kaba euro cylinder',          brand: 'Kaba',       cat: 'Cylinder', priceLyd: 570,
    lots: [ { container: 'ELK-2025-005', qty: 180, costUsd: 43.20, rate: 5.18 } ] },
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

// ─── Live state registry ───────────────────────────────────────────────────
// The app shell mirrors its React state here on every render, so every helper
// below computes from exactly the data the views are rendering. Before this,
// helpers closed over the static arrays while views mutated React copies —
// a source of stale, page-dependent numbers.
const STATE = { containers: CONTAINERS, inventory: INVENTORY, invoices: INVOICES };
function syncState(patch) { Object.assign(STATE, patch); }

// Stock levels below this are flagged "low" everywhere (KPIs, badges, filters).
const LOW_STOCK = 30;

// ─── Container helpers ─────────────────────────────────────────────────────
function landedUsd(c) { return c.purchaseUsd + c.shippingUsd + c.customsUsd; }
function landedLyd(c) { return landedUsd(c) * c.rate; }
function unitCostLyd(c) { return c.units > 0 ? landedLyd(c) / c.units : null; }
function unitCostUsd(c) { return c.units > 0 ? landedUsd(c) / c.units : null; }

// Null-safe percentage: returns null (rendered as —) instead of NaN/Infinity.
function pct(part, whole) { return whole ? (part / whole) * 100 : null; }

// ─── Sales ledger (single source of truth for sold / cost / revenue) ───────
// One FIFO replay of all issued + paid invoices in date order, consuming
// inventory lots oldest-container-first. Every sold count, cost-of-goods and
// per-container revenue figure in the app derives from this single pass, so
// no two pages can disagree, and an invoice's cost is locked to the lots it
// actually consumed (it no longer drifts when later lots arrive).
let _ledgerCache = null;
function ledger() {
  const { containers, inventory, invoices } = STATE;
  if (_ledgerCache && _ledgerCache.containers === containers && _ledgerCache.inventory === inventory && _ledgerCache.invoices === invoices) {
    return _ledgerCache.value;
  }
  const lotDate = (l) => {
    const c = containers.find(x => x.id === l.container);
    return String(c?.arrival || c?.eta || '');
  };
  const lots = {};
  inventory.forEach(item => {
    lots[item.sku] = [...item.lots]
      .sort((a, b) => lotDate(a).localeCompare(lotDate(b)))
      .map(l => ({ container: l.container, qty: l.qty, costLyd: l.costUsd * l.rate, left: l.qty }));
  });
  const costByInvoice = {};
  const soldByContainer = {};
  const paidRevenueByContainer = {};
  const soldBySku = {};
  invoices
    .filter(i => i.status === 'issued' || i.status === 'paid')
    .sort((a, b) => (a.date === b.date ? a.id.localeCompare(b.id) : a.date.localeCompare(b.date)))
    .forEach(inv => {
      let cost = 0;
      inv.lines.forEach(line => {
        soldBySku[line.sku] = (soldBySku[line.sku] || 0) + line.qty;
        let need = line.qty;
        const skuLots = lots[line.sku] || [];
        for (const lot of skuLots) {
          if (need <= 0) break;
          const take = Math.min(lot.left, need);
          if (!take) continue;
          lot.left -= take; need -= take;
          cost += take * lot.costLyd;
          soldByContainer[lot.container] = (soldByContainer[lot.container] || 0) + take;
          if (inv.status === 'paid') paidRevenueByContainer[lot.container] = (paidRevenueByContainer[lot.container] || 0) + take * line.priceLyd;
        }
        if (need > 0 && skuLots.length) {
          // Oversold beyond recorded lots: price the shortfall at the newest lot.
          const last = skuLots[skuLots.length - 1];
          cost += need * last.costLyd;
          soldByContainer[last.container] = (soldByContainer[last.container] || 0) + need;
          if (inv.status === 'paid') paidRevenueByContainer[last.container] = (paidRevenueByContainer[last.container] || 0) + need * line.priceLyd;
        }
      });
      costByInvoice[inv.id] = cost;
    });
  const value = { lots, costByInvoice, soldByContainer, paidRevenueByContainer, soldBySku };
  _ledgerCache = { containers, inventory, invoices, value };
  return value;
}

// ─── Inventory helpers ─────────────────────────────────────────────────────
// Units sold = invoiced on issued + paid invoices. Drafts don't reserve
// stock; refunded invoices return their units to stock.
function soldQty(sku) { return ledger().soldBySku[sku] || 0; }
function invTotalQty(item) { return item.lots.reduce((s, l) => s + l.qty, 0); }
function invStock(item) { return Math.max(0, invTotalQty(item) - soldQty(item.sku)); }
function invAvgCostLyd(item) {
  // Weighted-avg cost in LYD of the REMAINING lot composition (FIFO-consumed),
  // at each lot's locked container rate. Null when out of stock.
  const skuLots = ledger().lots[item.sku] || [];
  const qty = skuLots.reduce((s, l) => s + l.left, 0);
  if (!qty) return null;
  return skuLots.reduce((s, l) => s + l.left * l.costLyd, 0) / qty;
}
function invMarginLyd(item) {
  const cost = invAvgCostLyd(item);
  return cost == null ? null : item.priceLyd - cost;
}
function invMarginPct(item) {
  const m = invMarginLyd(item);
  return m == null ? null : pct(m, item.priceLyd);
}

// ─── Container pipeline helpers ────────────────────────────────────────────
function containerPushed(c) {
  // Total units ever pushed from this container into sales inventory.
  return STATE.inventory.reduce((s, item) => {
    const lot = item.lots.find(l => l.container === c.id);
    return s + (lot ? lot.qty : 0);
  }, 0);
}
function containerSold(c) { return ledger().soldByContainer[c.id] || 0; }
function containerInInventory(c) {
  // Units from this container currently on the shelf (pushed minus sold).
  return containerPushed(c) - containerSold(c);
}
function containerNotPushed(c) { return c.units - containerPushed(c); }
function realisedRevenueLyd(c) {
  // Actual paid-invoice revenue attributed to this container's lots (FIFO).
  return ledger().paidRevenueByContainer[c.id] || 0;
}
function expectedRevenueLyd(c) {
  // Only computable when the product manifest is entered — no invented markup.
  if (!c.products.length) return null;
  return c.products.reduce((s, p) => s + p.qty * p.priceLyd, 0);
}
function expectedProfitLyd(c) {
  const rev = expectedRevenueLyd(c);
  return rev == null ? null : rev - landedLyd(c);
}
function marginPct(c) { return pct(expectedProfitLyd(c), expectedRevenueLyd(c)); }

// ─── Invoice helpers ───────────────────────────────────────────────────────
function invoiceTotal(inv) { return inv.lines.reduce((s, l) => s + l.qty * l.priceLyd, 0); }
function invoiceCost(inv) {
  if (inv.status === 'issued' || inv.status === 'paid') {
    const c = ledger().costByInvoice[inv.id];
    if (c != null) return c;
  }
  // Drafts / refunds: estimate at the current remaining-stock average cost.
  return inv.lines.reduce((s, l) => {
    const it = STATE.inventory.find(i => i.sku === l.sku);
    const cost = it ? invAvgCostLyd(it) : null;
    return s + l.qty * (cost ?? 0);
  }, 0);
}
function invoiceProfit(inv) { return invoiceTotal(inv) - invoiceCost(inv); }
// Returns are excluded from revenue/profit by design; these make them visible.
function returnedStats() {
  const refunded = STATE.invoices.filter(i => i.status === 'refunded');
  return {
    count: refunded.length,
    value: refunded.reduce((s, i) => s + invoiceTotal(i), 0),
    units: refunded.reduce((s, i) => s + i.lines.reduce((ls, l) => ls + l.qty, 0), 0),
  };
}
function clientInvoices(clientId) { return STATE.invoices.filter(i => i.clientId === clientId); }
// "Orders" are completed sales (issued + paid) — drafts and refunds don't
// count, so order counts always agree with spend.
function clientOrderCount(clientId) { return clientInvoices(clientId).filter(i => i.status === 'issued' || i.status === 'paid').length; }
function clientRefundCount(clientId) { return clientInvoices(clientId).filter(i => i.status === 'refunded').length; }
function clientSpend(clientId) { return clientInvoices(clientId).filter(i => i.status === 'paid').reduce((s, i) => s + invoiceTotal(i), 0); }
function agentSales(agentId, status = null) {
  return STATE.invoices.filter(i => i.agentId === agentId && (!status || i.status === status)).reduce((s, i) => s + invoiceTotal(i), 0);
}

// Next sequential IDs derived from the highest existing numeric suffix,
// so created records never skip or collide.
function nextNumericSuffix(list) {
  return list.reduce((m, x) => {
    const n = parseInt((String(x.id).match(/(\d+)$/) || [])[1] || '0', 10);
    return Math.max(m, n);
  }, 0);
}
function nextInvoiceId(invoices = STATE.invoices) { return `INV-2025-${String(nextNumericSuffix(invoices) + 1).padStart(4, '0')}`; }
function nextContainerId(containers = STATE.containers) { return `ELK-2025-${String(nextNumericSuffix(containers) + 1).padStart(3, '0')}`; }

// ─── Formatters ────────────────────────────────────────────────────────────
function fmtLyd(n, opts = {}) {
  const { decimals = 0, sign = false } = opts;
  if (n == null || !isFinite(n)) return '—';
  const s = Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  const prefix = n < 0 ? '−' : (sign && n > 0 ? '+' : '');
  return prefix + s;
}
function fmtUsd(n, opts = {}) {
  const { decimals = 0, sign = false } = opts;
  if (n == null || !isFinite(n)) return '—';
  const s = Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  const prefix = n < 0 ? '−' : (sign && n > 0 ? '+' : '');
  return prefix + '$' + s;
}
// Compact money for KPI cards — one convention everywhere (142.7K, 2.79M).
function fmtCompactLyd(n) {
  if (n == null || !isFinite(n)) return '—';
  const a = Math.abs(n), prefix = n < 0 ? '−' : '';
  if (a >= 1_000_000) return prefix + (a / 1_000_000).toFixed(2) + 'M';
  if (a >= 1_000) return prefix + (a / 1_000).toFixed(1) + 'K';
  return prefix + Math.round(a).toLocaleString('en-US');
}
// Null-safe percent display (pairs with pct()).
function fmtPct(p, decimals = 1) {
  if (p == null || !isFinite(p)) return '—';
  return p.toFixed(decimals) + '%';
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
function findInvSku(sku) { return STATE.inventory.find(i => i.sku === sku); }
function findContainer(id) { return STATE.containers.find(c => c.id === id); }

window.ELK = {
  CONTAINERS, INVENTORY, CLIENTS, AGENTS, INVOICES,
  STATE, syncState, LOW_STOCK,
  landedUsd, landedLyd, unitCostUsd, unitCostLyd, pct,
  soldQty, invStock, invTotalQty, invAvgCostLyd, invMarginLyd, invMarginPct,
  containerPushed, containerSold, containerInInventory, containerNotPushed,
  expectedRevenueLyd, expectedProfitLyd, marginPct, realisedRevenueLyd,
  invoiceTotal, invoiceCost, invoiceProfit, returnedStats,
  clientInvoices, clientOrderCount, clientRefundCount, clientSpend, agentSales,
  nextInvoiceId, nextContainerId,
  fmtLyd, fmtUsd, fmtCompactLyd, fmtPct, fmtDate, fmtDateShort, statusLabel,
  currencyCode, currencyPair,
  findClient, findAgent, findInvSku, findContainer,
};
