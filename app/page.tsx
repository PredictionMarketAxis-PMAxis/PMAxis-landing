import ThemeToggle from "./ThemeToggle";

const API_URL = "https://api.pmaxis.trade";

const NAV_LINKS = [
  { label: "Docs",   href: `${API_URL}/docs` },
  { label: "Status", href: `${API_URL}/status` },
  { label: "MCP",    href: "/mcp" },
];

const ENDPOINTS = [
  { method: "GET", path: "/v1/markets",                desc: "List all prediction markets" },
  { method: "GET", path: "/v1/markets/{id}/price",     desc: "Live price for a market" },
  { method: "GET", path: "/v1/markets/{id}/orderbook", desc: "Full orderbook snapshot" },
  { method: "GET", path: "/v1/markets/{id}/candles",   desc: "OHLCV candlestick data" },
  { method: "GET", path: "/v1/markets/{id}/signals",   desc: "Signals and analytics" },
  { method: "GET", path: "/v1/trades/recent",          desc: "Latest trades across markets" },
  { method: "GET", path: "/v1/stats",                  desc: "Platform-wide statistics" },
  { method: "WS",  path: "/stream",                    desc: "Real-time WebSocket feed" },
];

const FEATURES = [
  { title: "Live Market Data",    body: "Prices, orderbooks, and trade history updated in real time across thousands of prediction markets.", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 12h18M3 6l9-3 9 3M3 18l9 3 9-3"/></svg> },
  { title: "WebSocket Stream",    body: "Subscribe to live price, orderbook, trade, and signal events with sub-second latency.", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01"/></svg> },
  { title: "On-Chain Trades",     body: "Access verified on-chain transaction data and wallet activity directly from the blockchain.", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg> },
  { title: "Signals & Analytics", body: "Pre-computed market signals, momentum indicators, and statistical summaries ready to consume.", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
  { title: "Instant API Key",     body: "Sign up, get your key in seconds, and start making requests. No OAuth flows, no setup friction.", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg> },
  { title: "Usage Dashboard",     body: "Track requests, monitor rate limits, rotate keys, and view 7-day usage history from your dashboard.", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg> },
];

const TIERS = [
  {
    name: "Free", price: "$0", period: "forever", limit: "60 requests / min",
    features: ["Full REST API access", "WebSocket stream", "7-day usage history", "Key rotation"],
    cta: "Get started free", href: `${API_URL}/signup`, soon: false,
  },
  {
    name: "Pro", price: "—", period: "", limit: "600 requests / min",
    features: ["Everything in Free", "10× higher rate limit", "Priority support", "Usage analytics"],
    cta: "Coming soon", href: "#", soon: true,
  },
  {
    name: "Enterprise", price: "Custom", period: "", limit: "Unlimited",
    features: ["Custom rate limits", "Dedicated infrastructure", "SLA guarantee", "White-glove onboarding"],
    cta: "Coming soon", href: "#", soon: true,
  },
];

const LOGO = (size = 36) => (
  <svg width={size} height={size} viewBox="0 0 803 795" fill="none">
    <path fill="var(--text)" d="M719.962 114.503C724.439 116.738 746.095 136.885 751.202 141.275C743.13 152.558 727.925 169.756 718.52 180.14C667.116 237.986 604.881 285.207 535.329 319.136C528.842 322.253 501.635 334.541 495.686 335.719C493.671 334.794 493.692 334.098 492.165 332.003C481.767 318.552 471.393 311.209 457.07 302.886C532.805 280.515 608.565 231.922 664.325 176.745C684.543 156.739 701.958 136.391 719.962 114.503Z"/>
    <path fill="var(--text)" d="M103.731 114.306C106.532 116.771 116.373 129.166 119.413 132.747C128.996 144.095 139.01 155.071 149.433 165.651C213.595 230.118 280.396 274.662 366.923 302.87C352.429 310.952 342.084 318.858 331.657 332.058L328.841 336.043C319.39 333.204 296.981 322.854 288.065 318.523C216.559 283.785 152.851 232.607 99.9718 173.495C90.9908 163.455 80.8168 152.054 72.5908 141.466C80.8318 133.892 95.1408 120.907 103.731 114.306Z"/>
    <path fill="var(--text)" d="M500.639 448.854C510.914 451.537 533.17 462.09 542.691 466.637C603.572 495.713 657.966 537.098 703.779 586.511C719.932 603.934 737.715 624.431 751.412 643.924C743.385 651.277 729.34 662.024 720.529 669.194C717.837 667.836 711.304 658.002 708.901 655.026C699.702 643.633 690.268 632.508 680.354 621.743C622.903 558.485 550.473 510.682 469.721 482.728C482.46 472.687 492.344 462.846 500.639 448.854Z"/>
    <path fill="var(--text)" d="M322.57 449.109C324.527 450.34 331.226 460.882 333.985 463.96C341.099 471.897 346.509 476.457 354.784 482.779C251.686 517.317 170.299 583.28 104.517 668.566L103.202 668.709C97.76 665.303 78.849 649.187 72.52 644.052C81.2 630.876 98.635 610.478 109.165 598.717C157.332 544.918 214.867 498.845 280.012 467.285C293.255 460.869 308.655 453.904 322.57 449.109Z"/>
    <path fill="var(--green)" d="M404.129 336.369C437.402 331.991 467.935 355.383 472.368 388.649C476.801 421.915 453.459 452.487 420.201 456.975C386.865 461.473 356.206 438.064 351.762 404.721C347.319 371.378 370.778 340.757 404.129 336.369Z"/>
  </svg>
);

const s = {
  nav:        { position:"sticky" as const, top:0, zIndex:50, background:"var(--bg)", borderBottom:"1px solid var(--border)", backdropFilter:"blur(8px)" },
  navInner:   { maxWidth:1024, margin:"0 auto", padding:"0 24px", height:72, display:"flex", alignItems:"center", justifyContent:"space-between" },
  brand:      { display:"flex", alignItems:"center", gap:12, textDecoration:"none" },
  brandName:  { fontSize:20, fontWeight:700, letterSpacing:"-0.02em", color:"var(--text)" },
  navLinks:   { display:"flex", alignItems:"center", gap:24 },
  navLink:    { fontSize:13, color:"var(--muted)", textDecoration:"none" },
  btnGreen:   { fontSize:13, fontWeight:700, background:"var(--green)", color:"var(--bg)", padding:"8px 16px", borderRadius:5, textDecoration:"none" },
  btnOutline: { fontSize:14, fontWeight:500, color:"var(--text)", border:"1px solid var(--border)", padding:"12px 24px", borderRadius:6, textDecoration:"none", background:"var(--surface)" },
  section:    { maxWidth:1024, margin:"0 auto", padding:"0 24px" },
  card:       { background:"var(--surface)", border:"1px solid var(--border)", borderRadius:12, padding:24 },
  h2:         { fontFamily:"var(--font-serif), Georgia, serif", fontSize:38, letterSpacing:"-0.02em", color:"var(--text)", marginBottom:12 },
  sub:        { fontSize:15, color:"var(--muted)", lineHeight:1.7, maxWidth:480, marginBottom:56 },
  muted:      { color:"var(--muted)" },
  text:       { color:"var(--text)" },
};

export default function Home() {
  return (
    <>
      <style>{`
        .nav-links { display: flex; align-items: center; gap: 24px; }
        .nav-link-item { display: block; }
        .hero-h1 { font-size: 54px; line-height: 1.08; letter-spacing: -0.03em; }
        .hero-badge { display: inline-flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 700; padding: 6px 14px; border-radius: 999px; margin-bottom: 32px; letter-spacing: 0.08em; text-transform: uppercase; }
        .hero-sub { font-size: 17px; color: var(--muted); line-height: 1.7; max-width: 520px; margin: 0 auto 40px; }
        .hero-btns { display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap; }
        .stats-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 32px; padding: 32px 24px; text-align: center; max-width: 1024px; margin: 0 auto; }
        .stat-val { font-size: 28px; font-weight: 700; letter-spacing: -0.02em; color: var(--text); }
        .features-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px,1fr)); gap: 16px; }
        .pricing-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px,1fr)); gap: 16px; }
        .endpoint-row { display: flex; align-items: center; gap: 16px; padding: 14px 24px; }
        .endpoint-desc { font-size: 13px; color: var(--muted); }
        .footer-inner { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; padding: 32px 24px; max-width: 1024px; margin: 0 auto; }
        .footer-links { display: flex; gap: 24px; }
        .code-snippet { background: #111111; border: 1px solid #1E1E1E; border-radius: 14px; padding: 24px; text-align: left; max-width: 620px; margin: 64px auto 0; overflow-x: auto; }
        .code-pre { font-family: var(--font-geist-mono), monospace; font-size: 13px; line-height: 1.9; margin: 0; }
        .sec-px { padding-left: 24px; padding-right: 24px; }

        @media (max-width: 640px) {
          .nav-links { gap: 8px; }
          .nav-link-item { display: none; }
          .hero-h1 { font-size: 30px; line-height: 1.18; }
          .hero-badge { font-size: 10px; padding: 5px 10px; margin-bottom: 20px; }
          .hero-sub { font-size: 15px; margin-bottom: 28px; }
          .hero-btns { flex-direction: column; align-items: stretch; padding: 0; }
          .hero-btns a { text-align: center; }
          .stats-grid { grid-template-columns: repeat(2,1fr); gap: 12px; padding: 20px 16px; }
          .stat-val { font-size: 22px; }
          .features-grid { grid-template-columns: 1fr; gap: 12px; }
          .pricing-grid { grid-template-columns: 1fr; gap: 12px; }
          .endpoint-desc { display: none; }
          .endpoint-row { padding: 11px 14px; gap: 10px; }
          .footer-inner { flex-direction: column; align-items: flex-start; gap: 16px; padding: 24px 16px; }
          .footer-links { flex-wrap: wrap; gap: 14px; }
          .code-snippet { border-radius: 10px; padding: 14px; margin-top: 32px; }
          .code-pre { font-size: 11px; line-height: 1.65; }
          .section-pad { padding-top: 48px !important; padding-bottom: 48px !important; }
          .h2-mobile { font-size: 26px !important; margin-bottom: 8px !important; }
          .cta-h2 { font-size: 26px !important; }
          .sec-px { padding-left: 16px !important; padding-right: 16px !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={s.nav}>
        <div style={s.navInner} className="sec-px">
          <a href="/" style={s.brand}>
            {LOGO(36)}
            <span style={s.brandName}>PMAxis</span>
          </a>
          <div className="nav-links">
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href} style={s.navLink} className="nav-link-item">{l.label}</a>
            ))}
            <a href={`${API_URL}/login`} style={s.navLink} className="nav-link-item">Sign in</a>
            <ThemeToggle />
            <a href={`${API_URL}/signup`} style={s.btnGreen}>Get API key</a>
          </div>
        </div>
      </nav>

      <main style={{flex:1}}>

        {/* HERO */}
        <section style={{maxWidth:1024, margin:"0 auto", paddingTop:96, paddingBottom:80, textAlign:"center"}} className="section-pad sec-px">
          <div className="hero-badge" style={{background:"var(--green-dim)", color:"var(--green-text)", border:"1px solid var(--green-dim)"}}>
            <span style={{width:6, height:6, borderRadius:"50%", background:"var(--green)", display:"inline-block", flexShrink:0}}></span>
            Live — 53,000+ markets indexed
          </div>
          <h1 className="hero-h1 font-serif" style={{color:"var(--text)", maxWidth:700, margin:"0 auto 20px"}}>
            Prediction market data,<br/>ready for your application.
          </h1>
          <p className="hero-sub">
            Real-time prices, orderbooks, trades, signals, and on-chain data across all major prediction markets — one REST API and WebSocket stream.
          </p>
          <div className="hero-btns">
            <a href={`${API_URL}/signup`} style={{...s.btnGreen, fontSize:14, padding:"13px 28px", borderRadius:6}}>
              Get free API key
            </a>
            <a href={`${API_URL}/docs`} style={s.btnOutline}>View docs</a>
          </div>

          {/* CODE SNIPPET */}
          <div className="code-snippet">
            <div style={{display:"flex", gap:8, marginBottom:20}}>
              <span style={{width:12, height:12, borderRadius:"50%", background:"#FF5F57"}}></span>
              <span style={{width:12, height:12, borderRadius:"50%", background:"#FFBD2E"}}></span>
              <span style={{width:12, height:12, borderRadius:"50%", background:"#28C840"}}></span>
              <span style={{marginLeft:12, fontSize:11, color:"#555", fontFamily:"monospace"}}>terminal</span>
            </div>
            <pre className="code-pre">
              <span style={{color:"#555"}}># Get live price for any market</span>{"\n"}
              <span style={{color:"#00E676"}}>curl</span>
              <span style={{color:"#fff"}}> -H </span>
              <span style={{color:"#F59E0B"}}>&quot;X-API-Key: YOUR_KEY&quot;</span>{" \\\n     "}
              <span style={{color:"#6B8CFF"}}>https://api.pmaxis.trade/v1/markets/&#123;id&#125;/price</span>{"\n\n"}
              <span style={{color:"#555"}}># Subscribe to live stream</span>{"\n"}
              <span style={{color:"#00E676"}}>wscat</span>
              <span style={{color:"#fff"}}> -H </span>
              <span style={{color:"#F59E0B"}}>&quot;X-API-Key: YOUR_KEY&quot;</span>{" \\\n     "}
              <span style={{color:"#6B8CFF"}}>wss://api.pmaxis.trade/stream</span>
            </pre>
          </div>
        </section>

        {/* STATS BAR */}
        <section style={{borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)", background:"var(--surface)"}}>
          <div className="stats-grid">
            {[{v:"53,000+",l:"Markets indexed"},{v:"916K+",l:"On-chain trades"},{v:"< 100ms",l:"API latency"},{v:"Free",l:"To start"}].map(x=>(
              <div key={x.l}>
                <div className="stat-val">{x.v}</div>
                <div style={{fontSize:13, color:"var(--muted)", marginTop:4}}>{x.l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURES */}
        <section style={{...s.section, paddingTop:96, paddingBottom:96}} className="section-pad sec-px">
          <h2 style={s.h2} className="h2-mobile">Everything your app needs</h2>
          <p style={s.sub}>One integration gives you access to the full prediction market data stack.</p>
          <div className="features-grid">
            {FEATURES.map(f=>(
              <div key={f.title} style={s.card}>
                <div style={{color:"var(--green)", marginBottom:16}}>{f.icon}</div>
                <div style={{fontSize:15, fontWeight:600, color:"var(--text)", marginBottom:8}}>{f.title}</div>
                <div style={{fontSize:13, color:"var(--muted)", lineHeight:1.6}}>{f.body}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ENDPOINTS */}
        <section style={{background:"var(--surface)", borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)"}}>
          <div style={{...s.section, paddingTop:96, paddingBottom:96}} className="section-pad sec-px">
            <h2 style={s.h2} className="h2-mobile">Clean, predictable API</h2>
            <p style={s.sub}>Standard REST conventions. JSON responses. One header for auth.</p>
            <div style={{border:"1px solid var(--border)", borderRadius:12, overflow:"hidden"}}>
              {ENDPOINTS.map((e,i)=>(
                <div key={e.path} className="endpoint-row" style={{borderBottom: i<ENDPOINTS.length-1?"1px solid var(--border)":"none", background:"var(--surface)"}}>
                  <span style={{fontFamily:"monospace", fontSize:11, fontWeight:700, padding:"2px 8px", borderRadius:4, width:44, textAlign:"center", flexShrink:0,
                    background: e.method==="WS" ? "var(--tag-ws)" : "var(--tag-get)",
                    color: e.method==="WS" ? "var(--tag-ws-text)" : "var(--tag-get-text)"
                  }}>{e.method}</span>
                  <code style={{fontFamily:"monospace", fontSize:13, color:"var(--text)", flex:1, wordBreak:"break-all"}}>{e.path}</code>
                  <span className="endpoint-desc">{e.desc}</span>
                </div>
              ))}
            </div>
            <div style={{marginTop:24, textAlign:"center"}}>
              <a href={`${API_URL}/docs`} style={{fontSize:13, color:"var(--muted)", textDecoration:"underline", textUnderlineOffset:4}}>View full API reference</a>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section style={{...s.section, paddingTop:96, paddingBottom:96}} className="section-pad sec-px">
          <h2 style={s.h2} className="h2-mobile">Simple pricing</h2>
          <p style={s.sub}>Start free. Scale when you need to.</p>
          <div className="pricing-grid">
            {TIERS.map(t=>(
              <div key={t.name} style={{...s.card, display:"flex", flexDirection:"column", position:"relative", opacity: t.soon ? 0.7 : 1}}>
                {t.soon && (
                  <div style={{position:"absolute", top:16, right:16, fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", background:"var(--surface2)", color:"var(--muted)", padding:"3px 8px", borderRadius:999, border:"1px solid var(--border)"}}>
                    Coming soon
                  </div>
                )}
                <div style={{fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:"var(--green)", marginBottom:16}}>{t.name}</div>
                <div style={{display:"flex", alignItems:"baseline", gap:4, marginBottom:4}}>
                  <span style={{fontSize:32, fontWeight:700, letterSpacing:"-0.02em", color:"var(--text)"}}>{t.price}</span>
                  {t.period && <span style={{fontSize:13, color:"var(--muted)"}}>{t.period}</span>}
                </div>
                <div style={{fontSize:13, color:"var(--muted)", marginBottom:24}}>{t.limit}</div>
                <ul style={{flex:1, listStyle:"none", padding:0, margin:"0 0 32px", display:"flex", flexDirection:"column", gap:10}}>
                  {t.features.map(f=>(
                    <li key={f} style={{display:"flex", alignItems:"flex-start", gap:10, fontSize:13, color:"var(--muted)"}}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5" style={{flexShrink:0, marginTop:1}}><polyline points="20 6 9 17 4 12"/></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href={t.href} style={{display:"block", textAlign:"center", fontSize:13, fontWeight:700, padding:"12px", borderRadius:6, textDecoration:"none",
                  background: t.soon ? "var(--surface2)" : "var(--text)",
                  color: t.soon ? "var(--muted)" : "var(--bg)",
                  pointerEvents: t.soon ? "none" as const : "auto" as const,
                  border: "1px solid var(--border)",
                }}>
                  {t.cta}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{background:"var(--text)", borderTop:"1px solid var(--border)"}}>
          <div style={{...s.section, paddingTop:96, paddingBottom:96, textAlign:"center"}} className="section-pad sec-px">
            <h2 className="font-serif cta-h2" style={{fontSize:44, letterSpacing:"-0.03em", color:"var(--bg)", marginBottom:16}}>
              Start building in minutes.
            </h2>
            <p style={{fontSize:15, color:"rgba(128,128,128,0.8)", marginBottom:40, maxWidth:420, margin:"0 auto 40px", lineHeight:1.7}}>
              Sign up, get your API key instantly, and make your first request before your coffee gets cold.
            </p>
            <a href={`${API_URL}/signup`} style={{display:"inline-block", background:"var(--green)", color:"var(--bg)", fontSize:14, fontWeight:700, padding:"14px 32px", borderRadius:6, textDecoration:"none"}}>
              Get free API key
            </a>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer style={{borderTop:"1px solid var(--border)", background:"var(--bg)"}}>
        <div className="footer-inner">
          <div style={{display:"flex", alignItems:"center", gap:10}}>
            {LOGO(24)}
            <span style={{fontSize:14, fontWeight:600, color:"var(--text)"}}>PMAxis</span>
          </div>
          <div className="footer-links">
            {[["Docs",`${API_URL}/docs`],["Status",`${API_URL}/status`],["MCP","/mcp"],["Sign up",`${API_URL}/signup`],["Login",`${API_URL}/login`]].map(([l,h])=>(
              <a key={l} href={h} style={{fontSize:12, color:"var(--muted)", textDecoration:"none"}}>{l}</a>
            ))}
          </div>
          <div style={{fontSize:12, color:"var(--muted)"}}>© 2026 PMAxis. All rights reserved.</div>
        </div>
      </footer>
    </>
  );
}
