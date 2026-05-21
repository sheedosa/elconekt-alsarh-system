// View 2 — Sales Inventory
// Admin view: cost + margin visible per item
// Agent view: clean catalogue, NO cost/margin/container info

const { useState: useStateI } = React;

function InventoryView({ onOpenSidebar }) {
  const { role, inventory, isMobile, lang } = useApp();
  const [filter, setFilter] = useStateI('all');
  const [query, setQuery] = useStateI('');
  const [cat, setCat] = useStateI('all');

  const cats = ['all', ...Array.from(new Set(inventory.map(i => i.cat)))];

  const filtered = inventory.filter(item => {
    const stock = ELK.invStock(item);
    if (filter === 'low' && stock > 30) return false;
    if (filter === 'out' && stock > 0) return false;
    if (filter === 'available' && stock <= 0) return false;
    if (cat !== 'all' && item.cat !== cat) return false;
    if (query) {
      const q = query.toLowerCase();
      return item.name.toLowerCase().includes(q) || item.sku.toLowerCase().includes(q) || item.brand.toLowerCase().includes(q);
    }
    return true;
  });

  const totalUnits = inventory.reduce((s, i) => s + ELK.invStock(i), 0);
  const totalValue = inventory.reduce((s, i) => s + ELK.invStock(i) * i.priceLyd, 0);
  const totalCost = inventory.reduce((s, i) => s + ELK.invStock(i) * ELK.invAvgCostLyd(i), 0);

  return (
    <>
      <Topbar
        breadcrumbs={[{ label: t('workspace') }, { label: role === 'admin' ? t('salesInventory') : t('products') }]}
        title={role === 'admin' ? t('salesInventory') : t('products')}
        onOpenSidebar={onOpenSidebar}
        actions={
          <>
            {role === 'admin' && !isMobile && <Button variant="secondary" icon="filter">{t('filter')}</Button>}
            {role === 'admin' && !isMobile && <Button variant="secondary" size="md">{t('restock')}</Button>}
            {role === 'agent' && <Button variant="accent" icon="plus" size="md">{t('newInvoice')}</Button>}
          </>
        }
      />

      <div className="elk-scroll" style={{ flex: 1, overflow: 'auto' }}>
        {role === 'admin' && (
          <div style={{ padding: isMobile ? '16px 16px 0' : '20px 28px 0', display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: 10 }}>
            {[
              { label: t('skusInCatalogue'), value: inventory.length, sub: `${inventory.filter(i => ELK.invStock(i) < 30).length} ${t('lowOrOut')}`, accent: UI.navy },
              { label: t('unitsOnHand'), value: totalUnits.toLocaleString('en-US'), sub: t('availableToSell'), accent: UI.green },
              { label: t('inventoryAtCost'), value: ELK.fmtLyd(totalCost/1000, { decimals: 0 }) + 'K', suffix: ELK.currencyCode(), sub: t('weightedAcross'), accent: UI.accent },
              { label: t('sellableValueLabel'), value: ELK.fmtLyd(totalValue/1000, { decimals: 0 }) + 'K', suffix: ELK.currencyCode(), sub: t('atCurrentPrices'), accent: UI.violet },
            ].map((k, i) => (
              <Card key={i} padding={14} style={{ boxShadow: `inset 0 2px 0 ${k.accent}` }}>
                <div style={{ fontSize: 11.5, color: UI.muted, marginBottom: 6 }}>{k.label}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
                  <div className="elk-num" style={{ fontSize: 21, fontWeight: 600, letterSpacing: -0.3 }}>{k.value}</div>
                  {k.suffix && <div style={{ fontSize: 11.5, color: UI.muted, fontWeight: 500 }}>{k.suffix}</div>}
                </div>
                <div style={{ fontSize: 11, color: UI.faint, marginTop: 3 }}>{k.sub}</div>
              </Card>
            ))}
          </div>
        )}

        <div style={{ padding: isMobile ? '16px 16px 10px' : '20px 28px 10px', display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: t('all') },
            { id: 'available', label: t('inStock') },
            { id: 'low', label: t('lowStock') },
            { id: 'out', label: t('outOfStock') },
          ].map(tab => (
            <button key={tab.id} onClick={() => setFilter(tab.id)} style={{
              padding: '5px 11px', borderRadius: 999, fontSize: 12.5, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
              border: `1px solid ${filter === tab.id ? UI.text : UI.border}`,
              background: filter === tab.id ? UI.text : UI.surface,
              color: filter === tab.id ? '#fff' : UI.muted,
            }}>{tab.label}</button>
          ))}
          {!isMobile && cats.length > 1 && (
            <>
              <div style={{ height: 18, width: 1, background: UI.border, margin: '0 4px' }} />
              {cats.slice(0, 6).map(c => (
                <button key={c} onClick={() => setCat(c)} style={{
                  padding: '5px 10px', borderRadius: 999, fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
                  border: `1px solid ${cat === c ? UI.borderStrong : UI.border}`,
                  background: cat === c ? UI.hover : 'transparent',
                  color: cat === c ? UI.text : UI.muted,
                }}>{c === 'all' ? t('allCategories') : tCategory(c)}</button>
              ))}
            </>
          )}
          <div style={{ flex: 1 }} />
          {!isMobile && <Input icon="search" placeholder={t('searchSku')} value={query} onChange={(e) => setQuery(e.target.value)} style={{ width: 260 }} />}
        </div>

        {isMobile && <div style={{ padding: '0 16px 12px' }}><Input icon="search" placeholder={t('searchProducts')} value={query} onChange={(e) => setQuery(e.target.value)} /></div>}

        {role === 'admin' && !isMobile && (
          <div style={{ margin: '0 28px 28px', background: UI.surface, border: `1px solid ${UI.border}`, borderRadius: 10, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: UI.surfaceAlt, borderBottom: `1px solid ${UI.border}` }}>
                  {[
                    { l: t('skuCol2'), a: 'start' },
                    { l: t('product'), a: 'start' },
                    { l: t('stock'), a: 'end' },
                    { l: t('avgCostLyd'), a: 'end' },
                    { l: t('sellingLyd'), a: 'end' },
                    { l: t('marginPerUnit'), a: 'end' },
                    { l: t('containerOrigin'), a: 'start' },
                    { l: '', a: 'end' },
                  ].map((h, i) => (
                    <th key={i} style={{ textAlign: h.a, padding: '10px 14px', fontSize: 11, fontWeight: 600, color: UI.muted, textTransform: 'uppercase', letterSpacing: 0.4, whiteSpace: 'nowrap' }}>{h.l}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((item, idx) => {
                  const stock = ELK.invStock(item);
                  const avgCost = ELK.invAvgCostLyd(item);
                  const marginLyd = ELK.invMarginLyd(item);
                  const marginPct = ELK.invMarginPct(item);
                  return (
                    <tr key={item.sku} className="elk-row-hover" style={{ borderBottom: idx === filtered.length - 1 ? 'none' : `1px solid ${UI.borderHair}` }}>
                      <td className="elk-mono" style={{ padding: '12px 14px', fontSize: 12, color: UI.muted, whiteSpace: 'nowrap' }}>{item.sku}</td>
                      <td style={{ padding: '12px 14px' }}>
                        <div style={{ fontWeight: 500 }}>{tProductName(item.sku, item.name)}</div>
                        <div style={{ fontSize: 11.5, color: UI.muted, marginTop: 2 }}>{item.brand} · {tCategory(item.cat)}</div>
                      </td>
                      <td className="elk-num" style={{ padding: '12px 14px', textAlign: 'end' }}>
                        <div style={{ fontWeight: 500, color: stock === 0 ? UI.rose : stock < 30 ? UI.amber : UI.text }}>{stock}</div>
                        <div style={{ fontSize: 10.5, color: UI.faint }}>{t('of')} {ELK.invTotalQty(item)}</div>
                      </td>
                      <td className="elk-num" style={{ padding: '12px 14px', textAlign: 'end', color: UI.muted }}>
                        {ELK.fmtLyd(avgCost, { decimals: 2 })}
                      </td>
                      <td className="elk-num" style={{ padding: '12px 14px', textAlign: 'end', fontWeight: 500 }}>
                        {ELK.fmtLyd(item.priceLyd, { decimals: 2 })}
                      </td>
                      <td className="elk-num" style={{ padding: '12px 14px', textAlign: 'end', color: marginLyd >= 0 ? UI.green : UI.rose, fontWeight: 500 }}>
                        {ELK.fmtLyd(marginLyd, { decimals: 2, sign: true })} <span style={{ color: UI.faint, fontWeight: 400 }}>({marginPct.toFixed(0)}%)</span>
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                          {item.lots.map(l => (
                            <span key={l.container} className="elk-mono" style={{ fontSize: 10.5, padding: '2px 7px', background: UI.hover, borderRadius: 4, color: UI.muted }}>
                              {l.container.replace('ELK-', '')} <span style={{ color: UI.faint }}>·</span> {l.qty}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td style={{ padding: '12px 14px', textAlign: 'end' }}>
                        <button className="elk-btn-ghost" style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 4, color: UI.faint }}>
                          <Icon name="more" size={14} strokeWidth={2.5} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {role === 'agent' && !isMobile && (
          <div style={{ padding: '0 28px 28px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {filtered.map(item => {
              const stock = ELK.invStock(item);
              return (
                <Card key={item.sku} padding={16}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 8, background: UI.hover, display: 'flex', alignItems: 'center', justifyContent: 'center', color: UI.muted, flexShrink: 0 }}>
                      <Icon name="lock" size={20} strokeWidth={1.6} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 600, lineHeight: 1.3 }}>{tProductName(item.sku, item.name)}</div>
                      <div className="elk-mono" style={{ fontSize: 11, color: UI.muted, marginTop: 3 }}>{item.sku}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 11, color: UI.muted, marginBottom: 2 }}>{t('price')}</div>
                      <div className="elk-num" style={{ fontSize: 20, fontWeight: 700, letterSpacing: -0.3 }}>{ELK.fmtLyd(item.priceLyd)} <span style={{ fontSize: 12, color: UI.muted, fontWeight: 500 }}>{ELK.currencyCode()}</span></div>
                    </div>
                    <StockBadge stock={stock} />
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {isMobile && (
          <div style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {filtered.map(item => {
              const stock = ELK.invStock(item);
              return (
                <Card key={item.sku} padding={12}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 8, background: UI.hover, display: 'flex', alignItems: 'center', justifyContent: 'center', color: UI.muted, flexShrink: 0 }}>
                      <Icon name="lock" size={18} strokeWidth={1.6} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 600 }}>{tProductName(item.sku, item.name)}</div>
                      <div className="elk-mono" style={{ fontSize: 11, color: UI.muted, marginTop: 2 }}>{item.sku} · {item.brand}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
                        <div className="elk-num" style={{ fontSize: 15, fontWeight: 700 }}>{ELK.fmtLyd(item.priceLyd)} <span style={{ fontSize: 11, color: UI.muted, fontWeight: 500 }}>{ELK.currencyCode()}</span></div>
                        <StockBadge stock={stock} small />
                        {role === 'admin' && (() => { const m = ELK.invMarginLyd(item); return (
                          <span className="elk-num" style={{ marginInlineStart: 'auto', fontSize: 11.5, color: m >= 0 ? UI.green : UI.rose, fontWeight: 500 }}>
                            {ELK.fmtLyd(m, { sign: true })} {t('margin')}
                          </span>
                        ); })()}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

function StockBadge({ stock, small }) {
  const fontSize = small ? 10.5 : 11.5;
  const padding = small ? '1px 7px' : '3px 8px';
  if (stock === 0) return <span style={{ fontSize, fontWeight: 600, padding, borderRadius: 999, background: UI.roseSoft, color: UI.rose }}>{t('outOfStock')}</span>;
  if (stock < 30) return <span style={{ fontSize, fontWeight: 600, padding, borderRadius: 999, background: UI.amberSoft, color: UI.amber }}>{t('lowStock')} · {stock}</span>;
  return <span style={{ fontSize, fontWeight: 500, padding, borderRadius: 999, background: UI.greenSoft, color: UI.green }}>{stock} {t('inStockShort')}</span>;
}

window.InventoryView = InventoryView;
