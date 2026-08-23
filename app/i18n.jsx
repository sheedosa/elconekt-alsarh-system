// Elconekt — i18n module
// Comprehensive EN/AR translation dictionary + helpers.
// Numbers stay in Western Arabic digits (1,2,3) for financial clarity.
// Dates use locale-appropriate month names.
// Currency: LYD in English, د.ل in Arabic.

const STRINGS = {
  en: {
    // Brand / chrome
    workspace: 'Workspace',
    viewingAs: 'Viewing as',
    admin: 'Admin',
    sales: 'Sales',
    salesAgent: 'Sales agent',
    language: 'Language',

    // Nav
    overview: 'Overview',
    containers: 'Containers',
    inventory: 'Inventory',
    salesInventory: 'Sales inventory',
    products: 'Products',
    clients: 'Clients',
    invoices: 'Invoices',
    reports: 'Reports',

    // Common buttons
    new: 'New',
    filter: 'Filter',
    export: 'Export',
    import: 'Import',
    search: 'Search',
    searchEllipsis: 'Search...',
    back: 'Back',
    edit: 'Edit',
    cancel: 'Cancel',
    save: 'Save',
    create: 'Create',
    confirm: 'Confirm',
    delete: 'Delete',
    download: 'Download',
    downloadPdf: 'Download PDF',
    viewAll: 'View all',
    thisMonth: 'This month',
    exportReport: 'Export report',
    reconcile: 'Reconcile',
    change: 'Change',
    restock: 'Restock',

    // Statuses
    statusInTransit: 'In transit',
    statusArrived: 'Arrived',
    statusClosed: 'Closed',
    statusDraft: 'Draft',
    statusIssued: 'Issued',
    statusPaid: 'Paid',
    statusRefunded: 'Refunded',
    statusPriority: 'Priority',
    statusContractor: 'Contractor',
    statusRetailer: 'Retailer',
    statusIndividual: 'Individual',
    statusNet30: 'Net 30',
    statusHotel: 'Hotel',

    // Filter labels
    all: 'All',
    drafts: 'Drafts',
    refunded: 'Refunded',
    inStock: 'In stock',
    lowStock: 'Low stock',
    outOfStock: 'Out of stock',
    contractors: 'Contractors',
    retailers: 'Retailers',
    individuals: 'Individuals',
    allAgents: 'All agents',
    allCategories: 'All categories',

    // Containers view
    newContainer: 'New container',
    activeContainers: 'Active containers',
    capitalDeployed: 'Capital deployed',
    avgLockedRate: 'Avg. locked USD rate',
    unitsInInventory: 'Units in inventory',
    inTransitSub: 'in transit',
    arrivedSub: 'arrived',
    acrossShipments: 'Across all shipments',
    weightedAcross: 'Weighted across containers',
    pushedNotSold: 'Pushed, not yet sold',
    searchContainers: 'Search containers...',
    searchContainersFull: 'Search ID, B/L, origin...',
    container: 'Container',
    statusCol: 'Status',
    arrivalEta: 'Arrival / ETA',
    usdRate: 'USD rate',
    landedCost: 'Landed cost',
    units: 'Units',
    sellThrough: 'Sell-through',
    eta: 'ETA',

    // Container detail
    from: 'From',
    to: 'to',
    arrived: 'Arrived',
    pushToInventory: 'Push to inventory',
    push: 'Push',
    totalLandedCost: 'Total landed cost',
    projectedProfit: 'Projected profit',
    projectedGrossProfit: 'Projected gross profit',
    profit: 'Profit',
    loss: 'Loss',
    cost: 'Cost',
    convertedAt: 'converted at',
    perUnitCost: 'Per-unit cost',
    margin: 'margin',
    atLockedRate: 'at locked rate',
    expectedRevenue: 'Expected revenue',
    realised: 'Realised',
    costBreakdown: 'Cost breakdown',
    rateLocked: 'Rate locked',
    line: 'Line',
    purchasePriceGoods: 'Purchase price of goods',
    shippingLogistics: 'Shipping & logistics',
    customsImportFees: 'Customs & import fees',
    unitCostUsd: 'Unit cost (USD)',
    unitCostLyd: 'Unit cost (LYD)',
    totalUnits: 'Total units',
    shipment: 'Shipment',
    blNumber: 'B/L number',
    origin: 'Origin',
    destination: 'Destination',
    rateLockedOn: 'Rate locked on',
    inventoryPipeline: 'Inventory pipeline',
    sold: 'Sold',
    inSalesInventory: 'In sales inventory',
    inContainerNotPushed: 'In container (not yet pushed)',
    productsInContainer: 'Products in this container',
    skus: 'SKUs',
    editLines: 'Edit lines',
    skuCol: 'SKU',
    product: 'Product',
    brand: 'Brand',
    qty: 'Qty',
    costUsdShort: 'Cost USD',
    costLydShort: 'Cost LYD',
    sellLyd: 'Sell LYD',
    marginPerUnit: 'Margin / unit',
    noProductLinesYet: 'No product lines yet',
    closedOrArchived: 'Closed/archived container or product breakdown not entered.',

    // New container modal
    newContainerSubtitle: 'Record a new shipment. Costs and exchange rate lock to this container.',
    containerId: 'Container ID',
    billOfLading: 'Bill of lading',
    originPort: 'Origin port',
    expectedArrival: 'Expected arrival',
    costsUsd: 'Costs (USD)',
    purchasePrice: 'Purchase price',
    customsImport: 'Customs & import',
    exchangeRate: 'Exchange rate',
    usdRateAtPurchase: 'USD rate at purchase',
    rateLocksHint: 'This rate locks to this container.',
    totalLandedAuto: 'Total landed (auto)',
    createContainer: 'Create container',
    containerCreated: 'Container {id} created',

    // Push-to-inventory modal
    pushSubtitle: 'From container {id} · rate locked at {rate} LYD/$',
    selectQuantities: 'Select quantities to release to the sales floor. Cost prices and container origin stay with each unit but are',
    hiddenFromSales: 'hidden from sales agents',
    canBeReversed: '. This action can be reversed.',
    inContainerLabel: 'In container',
    alreadyPushed: 'Already pushed',
    pushNow: 'Push now',
    valueLyd: 'Value LYD',
    reviewUnits: 'Review · {n} units',
    confirmPush: 'Confirm push',
    pushedUnits: 'Pushed {n} units to sales inventory',
    summary: 'Summary',
    unitsPushed: 'Units pushed',
    costBasis: 'Cost basis',
    sellableValue: 'Sellable value',
    atCurrentPrice: 'at current sell price',
    linesBeingPushed: 'Lines being pushed',
    unitsLabel: 'units',

    // Inventory view
    skusInCatalogue: 'SKUs in catalogue',
    unitsOnHand: 'Units on hand',
    availableToSell: 'Available to sell',
    inventoryAtCost: 'Inventory at cost',
    sellableValueLabel: 'Sellable value',
    atCurrentPrices: 'At current prices',
    lowOrOut: 'low / out of stock',
    skuCol2: 'SKU',
    stock: 'Stock',
    avgCostLyd: 'Avg. cost LYD',
    sellingLyd: 'Selling LYD',
    containerOrigin: 'Container origin',
    of: 'of',
    searchProducts: 'Search products...',
    searchSku: 'Search SKU, brand, name...',
    price: 'Price',

    // Clients
    newClient: 'New client',
    client: 'Client',
    contact: 'Contact',
    city: 'City',
    orders: 'Orders',
    totalSpent: 'Total spent',
    tags: 'Tags',
    searchClients: 'Search clients...',
    searchClientsFull: 'Search clients by name or company...',
    individual: 'Individual',
    lifetimeSpend: 'Lifetime spend',
    totalInvoices: 'Total invoices',
    lastOrder: 'Last order',
    notes: 'Notes',
    noNotesYet: 'No notes yet.',
    quickActions: 'Quick actions',
    createInvoice: 'Create invoice',
    scheduleFollowUp: 'Schedule follow-up',
    sendStatement: 'Send statement',
    orderHistory: 'Order history',
    noOrdersYet: 'No orders yet',
    notInvoiced: "This client hasn't been invoiced.",
    invoice: 'Invoice',
    by: 'by',
    newClientSubtitle: 'New client',
    name: 'Name',
    nameRequired: 'Name is required',
    nameRequiredFull: 'Name *',
    company: 'Company',
    type: 'Type',
    phone: 'Phone',
    email: 'Email',
    createClient: 'Create client',
    clientAdded: '{name} added',
    notesPlaceholder: 'Project context, preferences...',

    // Invoices
    newInvoice: 'New invoice',
    invoiceShort: 'Invoice',
    date: 'Date',
    lines: 'Lines',
    total: 'Total',
    agent: 'Agent',
    revenuePaid: 'Revenue (paid)',
    grossProfitPaid: 'Gross profit (paid)',
    activeInvoices: 'Active invoices',
    awaitingAction: 'Awaiting action',
    awaitingPayment: 'Awaiting payment',
    paidInvoices: 'paid invoices',
    invoicesIssued: 'invoices issued',
    draftInvoices: 'draft invoices',
    returnsLabel: 'Returns',
    refundedInvoices: 'refunded invoices',
    returnedSuffix: 'returned',
    refundedCountSuffix: 'refunded',
    searchInvoices: 'Search invoices...',
    invoiceOrClient: 'Invoice ID or client...',
    issueInvoice: 'Issue invoice',
    markAsPaid: 'Mark as paid',
    refund: 'Refund',
    saveDraft: 'Save draft',
    invoiceIssued: '{id} issued',
    invoiceMarkedPaid: '{id} marked as paid',
    invoiceRefunded: '{id} refunded',
    issuedBy: 'Issued {date} · by {name}',
    billedTo: 'Billed to',
    fromShort: 'From',
    description: 'Description',
    unitPrice: 'Unit price',
    subtotal: 'Subtotal',
    vat: 'VAT',
    adminOnly: 'ADMIN ONLY',
    grossProfitOnInvoice: 'Gross profit on this invoice',
    calculatedFromLots: "Calculated using each line's lot cost at the originating container's locked rate",
    refundedExcluded: 'Refunded — this invoice is not included in revenue or profit totals',
    draftEstimate: 'Draft — estimate only, not yet counted in totals',
    selectClientFirst: 'Select a client first',
    addAtLeastOne: 'Add at least one product',
    invoiceSavedDraft: '{id} saved as draft',
    invoiceSavedIssued: '{id} issued',
    newInvoiceSubtitle: 'Build the invoice from sales inventory.',
    newInvoiceSubtitleAgent: 'Build the invoice from products in your catalogue.',
    lineItems: 'Line items',
    searchSkuToAdd: 'Search SKU or product name to add...',
    searchAboveAdd: 'Search above to add products. Quantities and prices can be adjusted per line.',
    lineTotal: 'Line total',
    inStockShort: 'in stock',
    noMatches: 'No matches.',
    noProductsMatch: 'No products match.',

    // Overview
    revenueMay: 'Revenue (May)',
    grossProfit: 'Gross profit',
    inventoryValue: 'Inventory value',
    revenueThisWeek: 'Revenue this week',
    dailyTotals: 'Daily totals — paid invoices',
    revenue: 'Revenue',
    agentLeaderboard: 'Agent leaderboard',
    paidRevenuePeriod: 'Paid revenue this period',
    topClients: 'Top clients',
    byLifetimeSpend: 'By lifetime spend',
    containerPipeline: 'Container pipeline',
    activeShipments: 'Active shipments',
    recentActivity: 'Recent activity',
    latestSales: 'Latest sales across all agents',

    // Reports stub
    reportsComing: 'Financial reports — coming next',
    reportsDesc: "Container ROI, agent performance, client revenue analysis, inventory turnover. Designed once we've validated the core flows.",

    // Misc
    notFound: 'Not found',
    fillRequired: 'Please fill required fields',
    notesLabel: 'Notes',
    fromTo: '{from} → {to}',

    // Days
    Mon: 'Mon', Tue: 'Tue', Wed: 'Wed', Thu: 'Thu', Fri: 'Fri', Sat: 'Sat', Sun: 'Sun',

    // Currency code
    currencyCode: 'LYD',
    currencyPair: 'LYD/$',
  },

  ar: {
    workspace: 'مساحة العمل',
    viewingAs: 'العرض كـ',
    admin: 'مسؤول',
    sales: 'مبيعات',
    salesAgent: 'مندوب مبيعات',
    language: 'اللغة',

    overview: 'نظرة عامة',
    containers: 'الحاويات',
    inventory: 'المخزون',
    salesInventory: 'مخزون المبيعات',
    products: 'المنتجات',
    clients: 'العملاء',
    invoices: 'الفواتير',
    reports: 'التقارير',

    new: 'جديد',
    filter: 'تصفية',
    export: 'تصدير',
    import: 'استيراد',
    search: 'بحث',
    searchEllipsis: 'بحث...',
    back: 'رجوع',
    edit: 'تعديل',
    cancel: 'إلغاء',
    save: 'حفظ',
    create: 'إنشاء',
    confirm: 'تأكيد',
    delete: 'حذف',
    download: 'تحميل',
    downloadPdf: 'تحميل PDF',
    viewAll: 'عرض الكل',
    thisMonth: 'هذا الشهر',
    exportReport: 'تصدير التقرير',
    reconcile: 'تسوية',
    change: 'تغيير',
    restock: 'إعادة تخزين',

    statusInTransit: 'قيد الشحن',
    statusArrived: 'تم الوصول',
    statusClosed: 'مغلقة',
    statusDraft: 'مسودة',
    statusIssued: 'صادرة',
    statusPaid: 'مدفوعة',
    statusRefunded: 'مستردة',
    statusPriority: 'أولوية',
    statusContractor: 'مقاول',
    statusRetailer: 'تاجر تجزئة',
    statusIndividual: 'فرد',
    statusNet30: 'صافي 30',
    statusHotel: 'فندق',

    all: 'الكل',
    drafts: 'المسودات',
    refunded: 'المستردة',
    inStock: 'متوفر',
    lowStock: 'مخزون منخفض',
    outOfStock: 'نفد المخزون',
    contractors: 'مقاولون',
    retailers: 'تجار التجزئة',
    individuals: 'أفراد',
    allAgents: 'جميع المندوبين',
    allCategories: 'كل الفئات',

    newContainer: 'حاوية جديدة',
    activeContainers: 'الحاويات النشطة',
    capitalDeployed: 'رأس المال المستثمر',
    avgLockedRate: 'متوسط سعر الدولار المثبت',
    unitsInInventory: 'وحدات في المخزون',
    inTransitSub: 'قيد الشحن',
    arrivedSub: 'وصلت',
    acrossShipments: 'عبر جميع الشحنات',
    weightedAcross: 'مرجح عبر الحاويات',
    pushedNotSold: 'تم إرسالها ولم تُبَع بعد',
    searchContainers: 'بحث في الحاويات...',
    searchContainersFull: 'بحث برقم الحاوية، البوليصة، الميناء...',
    container: 'حاوية',
    statusCol: 'الحالة',
    arrivalEta: 'الوصول / المتوقع',
    usdRate: 'سعر الدولار',
    landedCost: 'التكلفة الإجمالية',
    units: 'الوحدات',
    sellThrough: 'نسبة البيع',
    eta: 'الوصول المتوقع',

    from: 'من',
    to: 'إلى',
    arrived: 'وصلت',
    pushToInventory: 'إرسال إلى المخزون',
    push: 'إرسال',
    totalLandedCost: 'إجمالي تكلفة الوصول',
    projectedProfit: 'الربح المتوقع',
    projectedGrossProfit: 'إجمالي الربح المتوقع',
    profit: 'ربح',
    loss: 'خسارة',
    cost: 'التكلفة',
    convertedAt: 'محوّلة بسعر',
    perUnitCost: 'تكلفة الوحدة',
    margin: 'هامش',
    atLockedRate: 'بالسعر المثبت',
    expectedRevenue: 'الإيرادات المتوقعة',
    realised: 'محقق',
    costBreakdown: 'تفاصيل التكلفة',
    rateLocked: 'تثبيت السعر',
    line: 'البند',
    purchasePriceGoods: 'سعر شراء البضائع',
    shippingLogistics: 'الشحن والخدمات اللوجستية',
    customsImportFees: 'الجمارك ورسوم الاستيراد',
    unitCostUsd: 'تكلفة الوحدة (دولار)',
    unitCostLyd: 'تكلفة الوحدة (دينار)',
    totalUnits: 'إجمالي الوحدات',
    shipment: 'الشحنة',
    blNumber: 'رقم بوليصة الشحن',
    origin: 'ميناء المصدر',
    destination: 'الوجهة',
    rateLockedOn: 'تاريخ تثبيت السعر',
    inventoryPipeline: 'مسار المخزون',
    sold: 'مباع',
    inSalesInventory: 'في مخزون المبيعات',
    inContainerNotPushed: 'في الحاوية (لم يُرسل بعد)',
    productsInContainer: 'المنتجات في هذه الحاوية',
    skus: 'منتج',
    editLines: 'تعديل البنود',
    skuCol: 'الرمز',
    product: 'المنتج',
    brand: 'العلامة التجارية',
    qty: 'الكمية',
    costUsdShort: 'التكلفة (دولار)',
    costLydShort: 'التكلفة (دينار)',
    sellLyd: 'البيع (دينار)',
    marginPerUnit: 'هامش / وحدة',
    noProductLinesYet: 'لا توجد بنود منتجات بعد',
    closedOrArchived: 'حاوية مغلقة/مؤرشفة أو لم يتم إدخال تفاصيل المنتجات.',

    newContainerSubtitle: 'تسجيل شحنة جديدة. تُثبَّت التكاليف وسعر الصرف على هذه الحاوية.',
    containerId: 'رقم الحاوية',
    billOfLading: 'بوليصة الشحن',
    originPort: 'ميناء المصدر',
    expectedArrival: 'الوصول المتوقع',
    costsUsd: 'التكاليف (دولار)',
    purchasePrice: 'سعر الشراء',
    customsImport: 'الجمارك والاستيراد',
    exchangeRate: 'سعر الصرف',
    usdRateAtPurchase: 'سعر الدولار عند الشراء',
    rateLocksHint: 'يثبَّت هذا السعر على هذه الحاوية.',
    totalLandedAuto: 'الإجمالي (تلقائي)',
    createContainer: 'إنشاء الحاوية',
    containerCreated: 'تم إنشاء الحاوية {id}',

    pushSubtitle: 'من الحاوية {id} · السعر المثبت {rate} د.ل/$',
    selectQuantities: 'حدد الكميات المراد إرسالها إلى أرضية البيع. تبقى أسعار التكلفة ومصدر الحاوية مع كل وحدة لكنها',
    hiddenFromSales: 'مخفية عن مندوبي المبيعات',
    canBeReversed: '. يمكن التراجع عن هذا الإجراء.',
    inContainerLabel: 'في الحاوية',
    alreadyPushed: 'تم إرساله',
    pushNow: 'إرسال الآن',
    valueLyd: 'القيمة (د.ل)',
    reviewUnits: 'مراجعة · {n} وحدة',
    confirmPush: 'تأكيد الإرسال',
    pushedUnits: 'تم إرسال {n} وحدة إلى مخزون المبيعات',
    summary: 'الملخص',
    unitsPushed: 'الوحدات المرسلة',
    costBasis: 'أساس التكلفة',
    sellableValue: 'القيمة القابلة للبيع',
    atCurrentPrice: 'بسعر البيع الحالي',
    linesBeingPushed: 'البنود التي يتم إرسالها',
    unitsLabel: 'وحدة',

    skusInCatalogue: 'منتج في القائمة',
    unitsOnHand: 'الوحدات المتاحة',
    availableToSell: 'متاح للبيع',
    inventoryAtCost: 'قيمة المخزون بالتكلفة',
    sellableValueLabel: 'القيمة القابلة للبيع',
    atCurrentPrices: 'بالأسعار الحالية',
    lowOrOut: 'منخفض / نفد',
    skuCol2: 'الرمز',
    stock: 'المخزون',
    avgCostLyd: 'متوسط التكلفة (د.ل)',
    sellingLyd: 'سعر البيع (د.ل)',
    containerOrigin: 'مصدر الحاوية',
    of: 'من',
    searchProducts: 'بحث في المنتجات...',
    searchSku: 'بحث برمز، علامة تجارية، اسم...',
    price: 'السعر',

    newClient: 'عميل جديد',
    client: 'العميل',
    contact: 'جهة الاتصال',
    city: 'المدينة',
    orders: 'الطلبات',
    totalSpent: 'إجمالي الإنفاق',
    tags: 'الوسوم',
    searchClients: 'بحث في العملاء...',
    searchClientsFull: 'بحث بالاسم أو اسم الشركة...',
    individual: 'فرد',
    lifetimeSpend: 'إجمالي الإنفاق',
    totalInvoices: 'إجمالي الفواتير',
    lastOrder: 'آخر طلب',
    notes: 'الملاحظات',
    noNotesYet: 'لا توجد ملاحظات بعد.',
    quickActions: 'إجراءات سريعة',
    createInvoice: 'إنشاء فاتورة',
    scheduleFollowUp: 'جدولة متابعة',
    sendStatement: 'إرسال كشف حساب',
    orderHistory: 'سجل الطلبات',
    noOrdersYet: 'لا توجد طلبات بعد',
    notInvoiced: 'لم تُصدَر فواتير لهذا العميل.',
    invoice: 'فاتورة',
    by: 'بواسطة',
    newClientSubtitle: 'عميل جديد',
    name: 'الاسم',
    nameRequired: 'الاسم مطلوب',
    nameRequiredFull: 'الاسم *',
    company: 'الشركة',
    type: 'النوع',
    phone: 'الهاتف',
    email: 'البريد الإلكتروني',
    createClient: 'إنشاء العميل',
    clientAdded: 'تمت إضافة {name}',
    notesPlaceholder: 'سياق المشروع، التفضيلات...',

    newInvoice: 'فاتورة جديدة',
    invoiceShort: 'فاتورة',
    date: 'التاريخ',
    lines: 'البنود',
    total: 'الإجمالي',
    agent: 'المندوب',
    revenuePaid: 'الإيرادات (مدفوعة)',
    grossProfitPaid: 'إجمالي الربح (مدفوع)',
    activeInvoices: 'الفواتير النشطة',
    awaitingAction: 'في انتظار الإجراء',
    awaitingPayment: 'في انتظار الدفع',
    paidInvoices: 'فاتورة مدفوعة',
    invoicesIssued: 'فاتورة صادرة',
    draftInvoices: 'مسودة فاتورة',
    returnsLabel: 'المرتجعات',
    refundedInvoices: 'فاتورة مستردة',
    returnedSuffix: 'مرتجعات',
    refundedCountSuffix: 'مستردة',
    searchInvoices: 'بحث في الفواتير...',
    invoiceOrClient: 'رقم الفاتورة أو العميل...',
    issueInvoice: 'إصدار الفاتورة',
    markAsPaid: 'تحديد كمدفوعة',
    refund: 'استرداد',
    saveDraft: 'حفظ كمسودة',
    invoiceIssued: 'تم إصدار {id}',
    invoiceMarkedPaid: 'تم تحديد {id} كمدفوعة',
    invoiceRefunded: 'تم استرداد {id}',
    issuedBy: 'صادرة في {date} · بواسطة {name}',
    billedTo: 'الفاتورة إلى',
    fromShort: 'من',
    description: 'الوصف',
    unitPrice: 'سعر الوحدة',
    subtotal: 'المجموع الفرعي',
    vat: 'ضريبة القيمة المضافة',
    adminOnly: 'للمسؤول فقط',
    grossProfitOnInvoice: 'إجمالي الربح من هذه الفاتورة',
    calculatedFromLots: 'محسوب باستخدام تكلفة كل بند من حاويته الأصلية بالسعر المثبت',
    refundedExcluded: 'مستردة — هذه الفاتورة غير مشمولة في إجماليات الإيرادات أو الأرباح',
    draftEstimate: 'مسودة — تقدير فقط، لم تُحتسب في الإجماليات بعد',
    selectClientFirst: 'يرجى اختيار عميل أولاً',
    addAtLeastOne: 'أضف منتجاً واحداً على الأقل',
    invoiceSavedDraft: 'تم حفظ {id} كمسودة',
    invoiceSavedIssued: 'تم إصدار {id}',
    newInvoiceSubtitle: 'أنشئ الفاتورة من مخزون المبيعات.',
    newInvoiceSubtitleAgent: 'أنشئ الفاتورة من منتجات قائمتك.',
    lineItems: 'بنود الفاتورة',
    searchSkuToAdd: 'بحث برمز أو اسم منتج للإضافة...',
    searchAboveAdd: 'ابحث أعلاه لإضافة المنتجات. يمكن تعديل الكميات والأسعار لكل بند.',
    lineTotal: 'إجمالي البند',
    inStockShort: 'متوفر',
    noMatches: 'لا توجد نتائج.',
    noProductsMatch: 'لا توجد منتجات مطابقة.',

    revenueMay: 'الإيرادات (مايو)',
    grossProfit: 'إجمالي الربح',
    inventoryValue: 'قيمة المخزون',
    revenueThisWeek: 'إيرادات هذا الأسبوع',
    dailyTotals: 'الإجماليات اليومية — الفواتير المدفوعة',
    revenue: 'الإيرادات',
    agentLeaderboard: 'ترتيب المندوبين',
    paidRevenuePeriod: 'الإيرادات المدفوعة في هذه الفترة',
    topClients: 'أفضل العملاء',
    byLifetimeSpend: 'حسب إجمالي الإنفاق',
    containerPipeline: 'مسار الحاويات',
    activeShipments: 'الشحنات النشطة',
    recentActivity: 'النشاط الأخير',
    latestSales: 'أحدث المبيعات عبر جميع المندوبين',

    reportsComing: 'التقارير المالية — قريباً',
    reportsDesc: 'العائد على الاستثمار لكل حاوية، أداء المندوبين، تحليل إيرادات العملاء، دوران المخزون. سيتم تصميمها بعد التحقق من التدفقات الأساسية.',

    notFound: 'غير موجود',
    fillRequired: 'يرجى ملء الحقول المطلوبة',
    notesLabel: 'الملاحظات',
    fromTo: '{from} ← {to}',

    Mon: 'الإثنين', Tue: 'الثلاثاء', Wed: 'الأربعاء', Thu: 'الخميس', Fri: 'الجمعة', Sat: 'السبت', Sun: 'الأحد',

    currencyCode: 'د.ل',
    currencyPair: 'د.ل/$',
  },
};

// City translations
const CITIES = {
  Tripoli: { en: 'Tripoli', ar: 'طرابلس' },
  Misrata: { en: 'Misrata', ar: 'مصراتة' },
  Zawiya: { en: 'Zawiya', ar: 'الزاوية' },
  Benghazi: { en: 'Benghazi', ar: 'بنغازي' },
};
const TRANSLATE_LOC = {
  'Tripoli, LY': { en: 'Tripoli, LY', ar: 'طرابلس، ليبيا' },
};

// Client name translations (full Arabic forms)
const CLIENT_NAMES = {
  'C-0042': { en: 'Khaled Buhliga',     ar: 'خالد بوحليقة' },
  'C-0038': { en: 'Mariam Al-Fitouri',  ar: 'مريم الفيتوري' },
  'C-0029': { en: 'Omar Trabelsi',      ar: 'عمر طرابلسي' },
  'C-0061': { en: 'Fatima Ben Said',    ar: 'فاطمة بن سعيد' },
  'C-0044': { en: 'Tarek Al-Mansoori',  ar: 'طارق المنصوري' },
  'C-0017': { en: 'Hossam Gargash',     ar: 'حسام قرقش' },
  'C-0053': { en: 'Nawal Shibani',      ar: 'نوال الشيباني' },
  'C-0024': { en: 'Ahmed Zarroug',      ar: 'أحمد زروق' },
};
const COMPANY_NAMES = {
  'Buhliga Construction':    { en: 'Buhliga Construction',    ar: 'بوحليقة للمقاولات' },
  'Al-Fitouri Hardware Store': { en: 'Al-Fitouri Hardware Store', ar: 'متجر الفيتوري للأدوات' },
  'Trabelsi Property Group': { en: 'Trabelsi Property Group', ar: 'مجموعة طرابلسي العقارية' },
  'Mansoori & Sons':         { en: 'Mansoori & Sons',         ar: 'المنصوري وأولاده' },
  'Gargash Hospitality':     { en: 'Gargash Hospitality',     ar: 'قرقش للضيافة' },
  'Zarroug Locks Co.':       { en: 'Zarroug Locks Co.',       ar: 'شركة زروق للأقفال' },
};
const AGENT_NAMES = {
  'U-001': { en: 'Hamza Ali',       ar: 'حمزة علي' },
  'U-002': { en: 'Layla Ben Ammar', ar: 'ليلى بن عمار' },
  'U-003': { en: 'Yusef Marghani',  ar: 'يوسف المرغني' },
  'U-004': { en: 'Salma Drira',     ar: 'سلمى دريرة' },
};
const NOTE_TEXT = {
  'Repeat client, 6 projects. Prefers Yale & Kaba. Site visits Tue/Thu.':
    { en: 'Repeat client, 6 projects. Prefers Yale & Kaba. Site visits Tue/Thu.',
      ar: 'عميل متكرر، 6 مشاريع. يفضل ييل وكابا. زيارات الموقع الثلاثاء/الخميس.' },
  'Monthly bulk orders. Wants 30-day terms.':
    { en: 'Monthly bulk orders. Wants 30-day terms.',
      ar: 'طلبات شهرية بالجملة. يريد شروط دفع 30 يوم.' },
  'Builds high-end residential. Wants Mul-T-Lock spec.':
    { en: 'Builds high-end residential. Wants Mul-T-Lock spec.',
      ar: 'يبني عقارات سكنية فاخرة. يريد مواصفات مَل-تي-لوك.' },
  'Walk-in, full apartment retrofit.':
    { en: 'Walk-in, full apartment retrofit.',
      ar: 'عميل مباشر، تجديد كامل لشقة.' },
  'Hotel chain refit. 200+ doors. Active negotiation.':
    { en: 'Hotel chain refit. 200+ doors. Active negotiation.',
      ar: 'تجديد سلسلة فنادق. أكثر من 200 باب. تفاوض جارٍ.' },
  'Wholesale. Pays late but reliable.':
    { en: 'Wholesale. Pays late but reliable.',
      ar: 'بالجملة. يتأخر في الدفع لكن موثوق.' },
};

// Product name translations
const PRODUCT_NAMES = {
  'YL-CYL-60':   { en: 'Yale cylinder lock 60mm',     ar: 'قفل أسطواني ييل 60 مم' },
  'CS-DBT-45':   { en: 'Cisa deadbolt 45mm',          ar: 'قفل ميت سيسا 45 مم' },
  'AB-PAD-70':   { en: 'Abus padlock 70mm',           ar: 'قفل حلقة أبوس 70 مم' },
  'YL-MOR-EU':   { en: 'Yale euro-mortise body',      ar: 'جسم قفل غاطس ييل أوروبي' },
  'KB-HND-SS':   { en: 'Kaba handle set, stainless',  ar: 'طقم مقابض كابا، ستانلس' },
  'MTL-DBT-PRO': { en: 'Mul-T-Lock deadbolt pro',     ar: 'قفل ميت مَل-تي-لوك برو' },
  'YL-CYL-80':   { en: 'Yale cylinder lock 80mm',     ar: 'قفل أسطواني ييل 80 مم' },
  'CS-MOR-SR':   { en: 'Cisa mortise, security',      ar: 'قفل غاطس سيسا، أمني' },
  'AB-PAD-50':   { en: 'Abus padlock 50mm',           ar: 'قفل حلقة أبوس 50 مم' },
  'KB-CYL-EU':   { en: 'Kaba euro cylinder',          ar: 'أسطوانة كابا أوروبية' },
};

const CATEGORIES = {
  Cylinder: { en: 'Cylinder', ar: 'أسطواني' },
  Deadbolt: { en: 'Deadbolt', ar: 'قفل ميت' },
  Padlock:  { en: 'Padlock',  ar: 'قفل حلقة' },
  Mortise:  { en: 'Mortise',  ar: 'غاطس' },
  Handle:   { en: 'Handle',   ar: 'مقابض' },
};

// Lang accessors. window.ELK_LANG is the source of truth; React state syncs it.
window.ELK_LANG = window.ELK_LANG || 'en';
function getLang() { return window.ELK_LANG; }
function setLang(l) {
  window.ELK_LANG = l;
  document.documentElement.lang = l;
  document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
}

function t(key, vars) {
  const lang = getLang();
  let s = (STRINGS[lang] && STRINGS[lang][key]) || STRINGS.en[key] || key;
  if (vars) for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, v);
  return s;
}

function tCity(name) {
  const lang = getLang();
  const r = CITIES[name];
  if (r) return r[lang] || r.en;
  return name;
}
function tProductName(sku, fallback) {
  const lang = getLang();
  const r = PRODUCT_NAMES[sku];
  if (r) return r[lang] || r.en;
  return fallback;
}
function tCategory(cat) {
  const lang = getLang();
  const r = CATEGORIES[cat];
  if (r) return r[lang] || r.en;
  return cat;
}
function tLocation(loc) {
  const lang = getLang();
  const r = TRANSLATE_LOC[loc];
  if (r) return r[lang] || r.en;
  return loc;
}
function tClientName(id, fallback) {
  const r = CLIENT_NAMES[id];
  if (r) return r[getLang()] || r.en;
  return fallback;
}
function tCompanyName(name) {
  if (!name) return '';
  const r = COMPANY_NAMES[name];
  if (r) return r[getLang()] || r.en;
  return name;
}
function tAgentName(id, fallback) {
  const r = AGENT_NAMES[id];
  if (r) return r[getLang()] || r.en;
  return fallback;
}
function tNote(note) {
  if (!note) return '';
  const r = NOTE_TEXT[note];
  if (r) return r[getLang()] || r.en;
  return note;
}

function dirLang() { return getLang() === 'ar' ? 'rtl' : 'ltr'; }
function isRtl() { return getLang() === 'ar'; }

// Localized date format
function fmtDateLocal(d) {
  if (!d) return '—';
  const dt = new Date(d);
  const lang = getLang();
  if (lang === 'ar') return dt.toLocaleDateString('ar-LY', { day: '2-digit', month: 'short', year: 'numeric' });
  return dt.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}
function fmtDateShortLocal(d) {
  if (!d) return '—';
  const dt = new Date(d);
  const lang = getLang();
  if (lang === 'ar') return dt.toLocaleDateString('ar-LY', { day: '2-digit', month: 'short' });
  return dt.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
}

// React hook — re-renders consumers when language changes
const LangContext = React.createContext({ lang: 'en' });

window.ELK_I18N = { STRINGS, CITIES, PRODUCT_NAMES, CATEGORIES, getLang, setLang, t, tCity, tProductName, tCategory, tLocation, tClientName, tCompanyName, tAgentName, tNote, dirLang, isRtl, fmtDateLocal, fmtDateShortLocal, LangContext };

// Convenience aliases on global so view files can use them.
window.t = t;
window.tCity = tCity;
window.tProductName = tProductName;
window.tCategory = tCategory;
window.tLocation = tLocation;
window.tClientName = tClientName;
window.tCompanyName = tCompanyName;
window.tAgentName = tAgentName;
window.tNote = tNote;
window.fmtDateLocal = fmtDateLocal;
window.fmtDateShortLocal = fmtDateShortLocal;
window.isRtl = isRtl;
