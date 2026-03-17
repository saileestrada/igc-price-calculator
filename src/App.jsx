import React, { useState, useEffect, useCallback } from 'react'
import './App.css'

const PROMOS = [
  { name: 'BFY',               start: '2026-01-05', end: '2026-02-27' },
  { name: 'Easter',            start: '2026-03-30', end: '2026-04-24' },
  { name: 'Cinco de Mayo',     start: '2026-04-27', end: '2026-05-29' },
  { name: '4th of July',       start: '2026-06-29', end: '2026-07-24' },
  { name: 'Hisp. Heritage',    start: '2026-09-07', end: '2026-10-16' },
  { name: 'Thanksgiving',      start: '2026-11-02', end: '2026-11-27' },
  { name: 'Christmas/Holiday', start: '2026-11-30', end: '2027-01-01' },
]

const PRODUCTS = [
  { cat: 'Maltin Polar', id: 'B-1-07-001', name: 'Maltin Bottle 4/6',         sub: '7 oz · 4/case',   units: 4,  igcR: 13.83, igcP: 11.83, trp: 5.29, currentSell: 14.45 },
  { cat: 'Maltin Polar', id: 'B-1-07-002', name: 'Maltin Bottle 4/6',         sub: '12 oz · 4/case',  units: 4,  igcR: 18.30, igcP: 15.30, trp: 6.79, currentSell: 19.87 },
  { cat: 'Maltin Polar', id: 'B-1-07-003', name: 'Maltin Loose Can 24',       sub: '12 oz · 24/case', units: 24, igcR: 16.21, igcP: 14.21, trp: 1.09, currentSell: 18.49 },
  { cat: 'Maltin Polar', id: 'B-1-07-007', name: 'Maltin Bottle 3/8 NEW',     sub: '7 oz · 3/case',   units: 3,  igcR: 13.37, igcP: 10.37, trp: 5.49, currentSell: 15.30 },
  { cat: 'P.A.N Flour',  id: 'G-1-01-002', name: 'Harina White 4/5',          sub: '5 lb · 4/case',   units: 4,  igcR: 17.88, igcP: 15.88, trp: 6.99, currentSell: 22.47 },
  { cat: 'P.A.N Flour',  id: 'G-1-01-003', name: 'Harina White 10/1',         sub: '1 Kg · 10/case',  units: 10, igcR: 21.13, igcP: 18.63, trp: 3.29, currentSell: 26.13 },
  { cat: 'P.A.N Flour',  id: 'G-1-01-004', name: 'Harina Whole Grain 10/1',   sub: '1 Kg · 10/case',  units: 10, igcR: 21.13, igcP: 18.63, trp: 3.29, currentSell: 26.13 },
  { cat: 'P.A.N Flour',  id: 'G-1-01-005', name: 'Harina Yellow 10/1',        sub: '1 Kg · 10/case',  units: 10, igcR: 17.88, igcP: 15.88, trp: 6.99, currentSell: 27.13 },
  { cat: 'P.A.N Flour',  id: 'G-1-01-006', name: 'Harina Yellow 4/5',         sub: '5 lb · 4/case',   units: 4,  igcR: 17.88, igcP: 15.88, trp: 6.99, currentSell: 22.47 },
  { cat: 'P.A.N Flour',  id: 'G-1-01-007', name: 'Harina Mezcla Cachapas 18', sub: '500g · 18/case',  units: 18, igcR: 28.47, igcP: 26.47, trp: 2.59, currentSell: 35.35 },
]


const REF_DATA = {
  'P.A.N FLOUR - RETAIL': [
    { id: 'H1013', name: 'P.A.N Pre Cooked White Cornmeal',       size: '2.2 lb', units: 10, price: 21.13, disc: 2.50, net: 18.63, regUnit: 2.82, promoUnit: 2.48, srpMfr: 3.49, trpMfr: 3.29 },
    { id: 'H1018', name: 'P.A.N Pre Cooked Yellow Cornmeal',      size: '2.2 lb', units: 10, price: 21.13, disc: 2.50, net: 18.63, regUnit: 2.82, promoUnit: 2.48, srpMfr: 3.49, trpMfr: 3.29 },
    { id: 'H1101', name: 'P.A.N Pre Cooked Whole Grain Cornmeal', size: '2.2 lb', units: 10, price: 21.13, disc: 2.50, net: 18.63, regUnit: 2.82, promoUnit: 2.48, srpMfr: 3.49, trpMfr: 3.29 },
    { id: 'H1016', name: 'P.A.N Pre Cooked White Cornmeal',       size: '5 lb',   units: 4,  price: 17.88, disc: 2.00, net: 15.88, regUnit: 5.96, promoUnit: 5.29, srpMfr: 7.59, trpMfr: 6.99 },
    { id: 'H1023', name: 'P.A.N Pre Cooked Yellow Cornmeal',      size: '5 lb',   units: 4,  price: 17.88, disc: 2.00, net: 15.88, regUnit: 5.96, promoUnit: 5.29, srpMfr: 7.59, trpMfr: 6.99 },
    { id: 'H1021', name: 'P.A.N Sweet Corn Mix',                  size: '1.1 lb', units: 18, price: 28.47, disc: 2.00, net: 26.47, regUnit: 2.11, promoUnit: 1.96, srpMfr: 3.49, trpMfr: 2.59 },
    { id: 'H1028', name: 'P.A.N Pre Cooked White Cornmeal',       size: '1.1 lb', units: 18, price: 20.37, disc: 3.00, net: 17.37, regUnit: 1.51, promoUnit: 1.29, srpMfr: 3.49, trpMfr: 1.79 },
  ],
  'MALT BEVERAGE / MALTIN POLAR': [
    { id: 'MP1101', name: 'Maltin Polar Bottles 6-Pack',  size: '7 oz',  units: 4,  price: 13.83, disc: 2.00, net: 11.83, regUnit: 4.61, promoUnit: 3.94, srpMfr: 5.49, trpMfr: 5.29 },
    { id: 'MP1102', name: 'Maltin Polar Bottles 6-Pack',  size: '12 oz', units: 4,  price: 18.30, disc: 3.00, net: 15.30, regUnit: 6.10, promoUnit: 5.10, srpMfr: 6.97, trpMfr: 6.79 },
    { id: 'MP1103', name: 'Maltin Polar Cans Loose',      size: '12 oz', units: 24, price: 16.21, disc: 2.00, net: 14.21, regUnit: 0.90, promoUnit: 0.79, srpMfr: 1.10, trpMfr: 1.09 },
    { id: 'MP1104', name: 'Maltin Polar Bottles Loose',   size: '12 oz', units: 24, price: 17.61, disc: 1.50, net: 16.11, regUnit: 0.98, promoUnit: 0.89, srpMfr: 1.20, trpMfr: 1.19 },
    { id: 'MP1105', name: 'Maltin Polar Cans 6-Pack',     size: '12 oz', units: 4,  price: 16.77, disc: 3.00, net: 13.77, regUnit: 5.59, promoUnit: 4.59, srpMfr: 6.39, trpMfr: 6.19 },
    { id: 'MP1107', name: 'Maltin Polar Bottles 8-Pack',  size: '7 oz',  units: 3,  price: 13.37, disc: 3.00, net: 10.37, regUnit: 5.94, promoUnit: 4.61, srpMfr: 6.79, trpMfr: 5.49 },
  ],
}

function encodeState(d) {
  try { return btoa(unescape(encodeURIComponent(JSON.stringify(d)))) } catch { return '' }
}
function decodeState(s) {
  try { return JSON.parse(decodeURIComponent(escape(atob(s)))) } catch { return null }
}
function getStateFromUrl() {
  const p = new URLSearchParams(window.location.hash.replace(/^#/, ''))
  const s = p.get('s')
  return s ? decodeState(s) : null
}
function setStateInUrl(d) {
  window.location.hash = 's=' + encodeState(d)
}
function todayStr() { return new Date().toISOString().slice(0, 10) }
function activePromo() {
  const t = todayStr()
  return PROMOS.find(p => t >= p.start && t <= p.end) || null
}

function Badge({ pct }) {
  let bg, color
  if (pct < 15)      { bg = '#FCEBEB'; color = '#791F1F' }
  else if (pct < 20) { bg = '#FAEEDA'; color = '#633806' }
  else               { bg = '#EAF3DE'; color = '#27500A' }
  return (
    <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: 10, fontSize: 11, fontWeight: 500, background: bg, color, whiteSpace: 'nowrap' }}>
      {pct.toFixed(1)}%
    </span>
  )
}

function MetricCard({ val, label, accent }) {
  return (
    <div style={{ background: accent ? '#E6F1FB' : '#eeede8', borderRadius: 8, padding: '10px 14px', flex: 1, minWidth: 120 }}>
      <div style={{ fontSize: 20, fontWeight: 600, color: accent ? '#0C447C' : '#1a1a1a' }}>{val}</div>
      <div style={{ fontSize: 10, color: accent ? '#185FA5' : '#888', marginTop: 2, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
    </div>
  )
}

function EditableCell({ placeholder, commitValue, width }) {
  const [local, setLocal] = useState('')
  const [focused, setFocused] = useState(false)
  const ref = React.useRef()
  const commit = (val) => {
    const parsed = parseFloat(val)
    if (!isNaN(parsed) && parsed >= 0) commitValue(parsed)
  }
  return (
    <input
      ref={ref}
      type="number"
      step="0.01"
      min="0"
      placeholder={placeholder}
      value={focused ? local : ''}
      onFocus={() => { setLocal(''); setFocused(true) }}
      onBlur={() => { setFocused(false); commit(local); setLocal('') }}
      onChange={e => setLocal(e.target.value)}
      onKeyDown={e => {
        if (e.key === 'Enter') { commit(local); ref.current.blur() }
        if (e.key === 'Escape') { setLocal(''); ref.current.blur() }
      }}
      style={{ width, padding: '3px 6px', fontSize: 12, border: '1px solid #ddd', borderRadius: 5, textAlign: 'right', background: '#fff', fontFamily: 'inherit' }}
    />
  )
}

export default function App() {
  const [newPrices, setNewPrices] = useState(() => {
    const saved = getStateFromUrl()
    return saved?.prices ?? Object.fromEntries(PRODUCTS.map(p => [p.id, p.currentSell]))
  })
  const [freight, setFreight] = useState(() => {
    const saved = getStateFromUrl()
    return saved?.freight ?? Object.fromEntries(PRODUCTS.map(p => [p.id, 0]))
  })
  const [target, setTarget] = useState(() => {
    const saved = getStateFromUrl()
    return saved?.target ?? 20
  })
  const [tab, setTab] = useState('calculator')
  const [copied, setCopied] = useState(false)

  useEffect(() => { setStateInUrl({ prices: newPrices, freight, target }) }, [newPrices, freight, target])

  const shareLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  const ap = activePromo()
  const updatePrice   = useCallback((id, val) => setNewPrices(prev => ({ ...prev, [id]: val })), [])
  const updateFreight = useCallback((id, val) => setFreight(prev => ({ ...prev, [id]: val })), [])

  const cats = {}
  PRODUCTS.forEach(p => { if (!cats[p.cat]) cats[p.cat] = []; cats[p.cat].push(p) })

  let totSell = 0, totMR = 0, totMP = 0, belowR = 0, belowP = 0
  PRODUCTS.forEach(p => {
    const sell = newPrices[p.id], fr = freight[p.id] || 0
    totSell += sell; totMR += (sell - p.igcR - fr); totMP += (sell - p.igcP - fr)
    if (sell > 0 && (sell - p.igcR - fr) / sell * 100 < target) belowR++
    if (sell > 0 && (sell - p.igcP - fr) / sell * 100 < target) belowP++
  })

  const bmR  = totSell > 0 ? (totMR / totSell * 100).toFixed(1) : '0.0'
  const bmP  = totSell > 0 ? (totMP / totSell * 100).toFixed(1) : '0.0'
  const lift = (parseFloat(bmP) - parseFloat(bmR)).toFixed(1)

  const th = (align = 'right', extra = {}) => ({ padding: '5px 8px 7px', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#666', textAlign: align, whiteSpace: 'nowrap', borderBottom: '1px solid #ddd', ...extra })
  const td = (align = 'right', extra = {}) => ({ padding: '7px 8px', fontSize: 12, textAlign: align, verticalAlign: 'middle', ...extra })

  return (
    <div style={{ minHeight: '100vh', background: '#f5f4f0', padding: '24px 16px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Tany Foods</div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1a1a1a', marginBottom: 2 }}>IGC Promo Price Calculator 2026</h1>
            <p style={{ fontSize: 12, color: '#888' }}>Vendor incentive scenario tool — flour &amp; Maltin Polar lines</p>
          </div>
          <button onClick={shareLink} style={{ padding: '8px 16px', fontSize: 13, fontWeight: 500, border: '1px solid ' + (copied ? '#3B6D11' : '#ccc'), borderRadius: 7, cursor: 'pointer', background: copied ? '#EAF3DE' : '#fff', color: copied ? '#27500A' : '#444', transition: 'all 0.2s', whiteSpace: 'nowrap', marginTop: 4 }}>
            {copied ? '✓ Copied!' : 'Share link'}
          </button>
        </div>

        <div style={{ display: 'flex', gap: 0, borderBottom: '1.5px solid #e0dfd9', marginBottom: 20 }}>
          {['calculator', 'reference'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: '8px 18px', fontSize: 13, fontWeight: 500, background: 'none', border: 'none', borderBottom: tab === t ? '2px solid #1a1a1a' : '2px solid transparent', color: tab === t ? '#1a1a1a' : '#888', cursor: 'pointer', marginBottom: -1.5, transition: 'all 0.15s' }}>
              {t === 'calculator' ? 'Price Calculator' : 'IGC Pricelist Reference'}
            </button>
          ))}
        </div>

        {tab === 'reference' && (
          <div style={{ background: '#fff', borderRadius: 10, overflow: 'hidden', border: '1px solid #e0dfd9' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 820, fontSize: 12 }}>
                <thead>
                  <tr>
                    {['IGC ID','Description','Size','Units/case','Price/case','BB Disc','Net Promo/case','Reg Unit cost','Promo Unit cost','SRP Mfr','TRP Mfr'].map(h => (
                      <th key={h} style={{ padding: '6px 10px', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#666', textAlign: (h==='IGC ID'||h==='Description') ? 'left' : 'right', borderBottom: '1px solid #ddd', whiteSpace: 'nowrap', background: '#fafaf8' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(REF_DATA).map(([cat, rows]) => (
                    <React.Fragment key={cat}>
                      <tr><td colSpan={11} style={{ padding: '10px 10px 4px', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#999', background: '#f9f8f5', borderTop: '1px solid #e8e7e2' }}>{cat}</td></tr>
                      {rows.map(r => (
                        <tr key={r.id} style={{ borderTop: '1px solid #f0efe9' }}>
                          <td style={{ padding: '7px 10px', fontFamily: 'monospace', fontSize: 11, color: '#999' }}>{r.id}</td>
                          <td style={{ padding: '7px 10px', color: '#1a1a1a' }}>{r.name}</td>
                          <td style={{ padding: '7px 10px', textAlign: 'right', color: '#555' }}>{r.size}</td>
                          <td style={{ padding: '7px 10px', textAlign: 'right', color: '#555' }}>{r.units}</td>
                          <td style={{ padding: '7px 10px', textAlign: 'right', color: '#444' }}>${r.price.toFixed(2)}</td>
                          <td style={{ padding: '7px 10px', textAlign: 'right', color: '#888' }}>${r.disc.toFixed(2)}</td>
                          <td style={{ padding: '7px 10px', textAlign: 'right', background: '#f0efea', color: '#444' }}>${r.net.toFixed(2)}</td>
                          <td style={{ padding: '7px 10px', textAlign: 'right', color: '#444' }}>${r.regUnit.toFixed(2)}</td>
                          <td style={{ padding: '7px 10px', textAlign: 'right', background: '#ddeaf8', color: '#185FA5' }}>${r.promoUnit.toFixed(2)}</td>
                          <td style={{ padding: '7px 10px', textAlign: 'right', color: '#555' }}>${r.srpMfr.toFixed(2)}</td>
                          <td style={{ padding: '7px 10px', textAlign: 'right', color: '#185FA5' }}>${r.trpMfr.toFixed(2)}</td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ padding: '10px 14px', fontSize: 11, color: '#aaa', borderTop: '1px solid #f0efe9' }}>
              Source: IGC Promotions 2026 — Distributor EXW pricelist. BB Disc = open stock discount per case. Net promo/case = price minus discount. Unit costs at 75% outgoing margin basis per IGC formula.
            </div>
          </div>
        )}

        {tab === 'calculator' && <React.Fragment>

        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>2026 Promotion Windows</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {PROMOS.map(p => {
              const isNow = ap && ap.name === p.name
              return (
                <span key={p.name} title={`${p.start} – ${p.end}`} style={{ padding: '4px 10px', borderRadius: 20, fontSize: 11, border: isNow ? '1.5px solid #185FA5' : '1px solid #ccc', background: isNow ? '#185FA5' : '#fff', color: isNow ? '#E6F1FB' : '#555', fontWeight: isNow ? 600 : 400 }}>
                  {p.name}{isNow ? ' — active now' : ''}
                </span>
              )
            })}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 16, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#444' }}>
            <label htmlFor="target" style={{ fontWeight: 500 }}>Target margin</label>
            <input id="target" type="number" min={0} max={60} step={1} value={target} onChange={e => setTarget(parseFloat(e.target.value) || 0)} style={{ width: 54, padding: '4px 8px', fontSize: 13, border: '1px solid #ccc', borderRadius: 6, background: '#fff', textAlign: 'right' }} />
            <span>%</span>
          </div>
          <div style={{ fontSize: 11, color: '#999' }}>Click any cell to edit. Press Enter to confirm. Type 0 and press Enter to clear freight.</div>
        </div>

        <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
          <MetricCard val={bmR + '%'}               label="Blended margin — regular" />
          <MetricCard val={bmP + '%'}               label="Blended margin — promo cost" accent />
          <MetricCard val={'+' + lift + 'pp'}       label="Margin lift from promo cost" />
          <MetricCard val={`${belowR} / ${belowP}`} label={`Below ${target}% target: reg / promo`} />
        </div>

        <div style={{ background: '#fff', borderRadius: 10, overflow: 'hidden', border: '1px solid #e0dfd9' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 980 }}>
              <thead>
                <tr>
                  <th colSpan={2} style={th('left')}></th>
                  <th colSpan={2} style={{ ...th('center'), background: '#fafaf8', fontSize: 10, color: '#888' }}>Your pricing</th>
                  <th colSpan={3} style={{ ...th('center'), background: '#f0efea', fontSize: 10, color: '#555' }}>Regular cost</th>
                  <th style={{ width: 6 }}></th>
                  <th colSpan={3} style={{ ...th('center'), background: '#ddeaf8', fontSize: 10, color: '#185FA5' }}>Promo cost (IGC discount)</th>
                  <th style={{ width: 6 }}></th>
                  <th style={{ ...th('center'), background: '#edecea', fontSize: 10, color: '#666' }}>Freight</th>
                  <th style={th('center')}></th>
                </tr>
                <tr>
                  <th style={th('left')}>ID</th>
                  <th style={th('left')}>Product</th>
                  <th style={th('right', { background: '#fafaf8' })}>Current price</th>
                  <th style={th('right', { background: '#fafaf8' })}>New price</th>
                  <th style={th('right', { background: '#f0efea' })}>Cost/case</th>
                  <th style={th('right', { background: '#f0efea' })}>Margin</th>
                  <th style={th('right', { background: '#f0efea' })}>Price @ target</th>
                  <th style={{ width: 6, borderBottom: '1px solid #ddd' }}></th>
                  <th style={th('right', { background: '#ddeaf8', color: '#185FA5' })}>Cost/case</th>
                  <th style={th('right', { background: '#ddeaf8', color: '#185FA5' })}>Margin</th>
                  <th style={th('right', { background: '#ddeaf8', color: '#185FA5' })}>TRP/unit</th>
                  <th style={{ width: 6, borderBottom: '1px solid #ddd' }}></th>
                  <th style={th('right', { background: '#edecea' })}>Freight/case</th>
                  <th style={th('center')}>Lift</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(cats).map(([cat, items]) => (
                  <React.Fragment key={cat}>
                    <tr>
                      <td colSpan={15} style={{ padding: '10px 10px 4px', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#999', background: '#f9f8f5', borderTop: '1px solid #e8e7e2' }}>{cat}</td>
                    </tr>
                    {items.map(p => {
                      const sell = newPrices[p.id], fr = freight[p.id] || 0
                      const landedR = p.igcR + fr, landedP = p.igcP + fr
                      const mR = sell > 0 ? (sell - landedR) / sell * 100 : 0
                      const mP = sell > 0 ? (sell - landedP) / sell * 100 : 0
                      const suggested = p.igcR / (1 - target / 100)
                      const delta = mP - mR
                      return (
                        <tr key={p.id} style={{ borderTop: '1px solid #f0efe9' }}>
                          <td style={td('left')}><span style={{ fontFamily: 'monospace', fontSize: 10, color: '#999' }}>{p.id}</span></td>
                          <td style={td('left')}>
                            <div style={{ fontSize: 12, fontWeight: 500, color: '#1a1a1a' }}>{p.name}</div>
                            <div style={{ fontSize: 10, color: '#999', marginTop: 1 }}>{p.sub}</div>
                          </td>
                          <td style={td('right', { background: '#fafaf8', color: '#aaa' })}>${p.currentSell.toFixed(2)}</td>
                          <td style={td('right', { background: '#fafaf8' })}>
                            <EditableCell placeholder={sell.toFixed(2)} commitValue={val => updatePrice(p.id, val)} width={64} />
                          </td>
                          <td style={td('right', { background: '#f0efea' })}>
                            <div style={{ color: '#444' }}>${landedR.toFixed(2)}</div>
                            {fr > 0 && <div style={{ fontSize: 10, color: '#999' }}>+${fr.toFixed(2)} freight</div>}
                          </td>
                          <td style={td('right', { background: '#f0efea' })}><Badge pct={mR} /></td>
                          <td style={td('right', { background: '#f0efea', color: '#aaa' })}>${suggested.toFixed(2)}</td>
                          <td style={{ width: 6 }}></td>
                          <td style={td('right', { background: '#ddeaf8' })}>
                            <div style={{ color: '#185FA5' }}>${landedP.toFixed(2)}</div>
                            {fr > 0 && <div style={{ fontSize: 10, color: '#7aaddd' }}>+${fr.toFixed(2)} freight</div>}
                          </td>
                          <td style={td('right', { background: '#ddeaf8' })}><Badge pct={mP} /></td>
                          <td style={td('right', { background: '#ddeaf8', color: '#185FA5' })}>${p.trp.toFixed(2)}</td>
                          <td style={{ width: 6 }}></td>
                          <td style={td('right', { background: '#edecea' })}>
                            <EditableCell placeholder={fr > 0 ? fr.toFixed(2) : '0.00'} commitValue={val => updateFreight(p.id, val)} width={60} />
                          </td>
                          <td style={td('center')}>
                            {delta >= 0
                              ? <span style={{ color: '#3B6D11', fontWeight: 600, fontSize: 12 }}>+{delta.toFixed(1)}pp</span>
                              : <span style={{ color: '#A32D2D', fontSize: 12 }}>{delta.toFixed(1)}pp</span>}
                          </td>
                        </tr>
                      )
                    })}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ marginTop: 12, fontSize: 11, color: '#aaa', lineHeight: 1.6 }}>
          Price @ target uses base IGC regular cost (no freight). Freight adds to landed cost in both scenarios. TRP = manufacturer promotional target retail price per unit. Lift = margin pp gain switching from regular to promo landed cost.
        </div>

        </React.Fragment>}

      </div>
    </div>
  )
}






