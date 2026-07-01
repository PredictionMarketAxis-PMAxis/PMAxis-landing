"use client";
import { useState } from "react";
import ThemeToggle from "../ThemeToggle";

const API_URL  = "https://api.pmaxis.trade";
const MCP_URL  = "https://mcp.pmaxis.trade";

const LOGO = (size = 36) => (
  <svg width={size} height={size} viewBox="0 0 803 795" fill="none">
    <path fill="var(--text)" d="M719.962 114.503C724.439 116.738 746.095 136.885 751.202 141.275C743.13 152.558 727.925 169.756 718.52 180.14C667.116 237.986 604.881 285.207 535.329 319.136C528.842 322.253 501.635 334.541 495.686 335.719C493.671 334.794 493.692 334.098 492.165 332.003C481.767 318.552 471.393 311.209 457.07 302.886C532.805 280.515 608.565 231.922 664.325 176.745C684.543 156.739 701.958 136.391 719.962 114.503Z"/>
    <path fill="var(--text)" d="M103.731 114.306C106.532 116.771 116.373 129.166 119.413 132.747C128.996 144.095 139.01 155.071 149.433 165.651C213.595 230.118 280.396 274.662 366.923 302.87C352.429 310.952 342.084 318.858 331.657 332.058L328.841 336.043C319.39 333.204 296.981 322.854 288.065 318.523C216.559 283.785 152.851 232.607 99.9718 173.495C90.9908 163.455 80.8168 152.054 72.5908 141.466C80.8318 133.892 95.1408 120.907 103.731 114.306Z"/>
    <path fill="var(--text)" d="M500.639 448.854C510.914 451.537 533.17 462.09 542.691 466.637C603.572 495.713 657.966 537.098 703.779 586.511C719.932 603.934 737.715 624.431 751.412 643.924C743.385 651.277 729.34 662.024 720.529 669.194C717.837 667.836 711.304 658.002 708.901 655.026C699.702 643.633 690.268 632.508 680.354 621.743C622.903 558.485 550.473 510.682 469.721 482.728C482.46 472.687 492.344 462.846 500.639 448.854Z"/>
    <path fill="var(--text)" d="M322.57 449.109C324.527 450.34 331.226 460.882 333.985 463.96C341.099 471.897 346.509 476.457 354.784 482.779C251.686 517.317 170.299 583.28 104.517 668.566L103.202 668.709C97.76 665.303 78.849 649.187 72.52 644.052C81.2 630.876 98.635 610.478 109.165 598.717C157.332 544.918 214.867 498.845 280.012 467.285C293.255 460.869 308.655 453.904 322.57 449.109Z"/>
    <path fill="var(--green)" d="M404.129 336.369C437.402 331.991 467.935 355.383 472.368 388.649C476.801 421.915 453.459 452.487 420.201 456.975C386.865 461.473 356.206 438.064 351.762 404.721C347.319 371.378 370.778 340.757 404.129 336.369Z"/>
  </svg>
);

/* ── data ──────────────────────────────────────────────────── */

const NAV_LINKS = [
  { label: "Docs",   href: `${API_URL}/docs` },
  { label: "Status", href: `${API_URL}/status` },
  { label: "MCP",    href: "/mcp" },
];

const SSE_CONFIG = `{
  "mcpServers": {
    "pmaxis": {
      "url": "${MCP_URL}/sse?key=YOUR_API_KEY"
    }
  }
}`;

const NPX_CONFIG = `{
  "mcpServers": {
    "pmaxis": {
      "command": "npx",
      "args": ["-y", "@pmaxis/mcp-server"],
      "env": {
        "PMAXIS_API_KEY": "YOUR_API_KEY",
        "PMAXIS_API_URL": "${API_URL}"
      }
    }
  }
}`;

const CONFIG_PATHS = {
  windows: `C:\\Users\\<name>\\AppData\\Roaming\\Claude\\claude_desktop_config.json`,
  mac:     `~/Library/Application Support/Claude/claude_desktop_config.json`,
};

const TOOL_GROUPS = [
  {
    label: "Market Discovery",
    tools: [
      { name: "search_markets",       desc: "Full-text search across all markets" },
      { name: "list_markets",          desc: "Paginated list with filters" },
      { name: "get_top_markets",       desc: "Highest-volume markets" },
      { name: "get_trending_markets",  desc: "Markets with rising activity" },
      { name: "get_new_markets",       desc: "Recently created markets" },
      { name: "get_resolving_markets", desc: "Markets closing within 7 days" },
      { name: "compare_markets",       desc: "Side-by-side market comparison" },
    ],
  },
  {
    label: "Market Detail",
    tools: [
      { name: "get_market",                desc: "Full market profile" },
      { name: "get_market_summary",        desc: "Concise snapshot with key stats" },
      { name: "get_market_stats",          desc: "Volume, liquidity, trade counts" },
      { name: "get_market_liquidity",      desc: "Liquidity depth breakdown" },
      { name: "get_market_sentiment",      desc: "Crowd sentiment indicators" },
      { name: "get_market_signals",        desc: "Pre-computed momentum signals" },
      { name: "get_market_orderbook",      desc: "Full bid/ask orderbook snapshot" },
      { name: "get_market_price",          desc: "Current YES/NO prices" },
      { name: "get_market_price_history",  desc: "Historical price series" },
      { name: "get_market_trades",         desc: "Recent trade history" },
      { name: "get_market_candles",        desc: "OHLCV candlestick data (1m/5m/1h)" },
      { name: "get_market_positions",      desc: "Open positions in a market" },
      { name: "get_related_markets",       desc: "Semantically similar markets" },
    ],
  },
  {
    label: "Wallet",
    tools: [
      { name: "get_wallet_summary",        desc: "Portfolio value and P&L" },
      { name: "get_wallet_activity",       desc: "Full trade and activity history" },
      { name: "get_wallet_markets",        desc: "All markets a wallet has traded" },
      { name: "get_wallet_open_positions", desc: "Current open positions" },
      { name: "get_wallet_onchain",        desc: "Verified on-chain transactions" },
    ],
  },
  {
    label: "Organization",
    tools: [
      { name: "get_events",           desc: "Top-level event containers" },
      { name: "get_event_markets",    desc: "Markets inside an event" },
      { name: "get_categories",       desc: "Market category list" },
      { name: "get_category_markets", desc: "Markets in a specific category" },
      { name: "get_tags",             desc: "All available topic tags" },
      { name: "get_series",           desc: "Recurring market series" },
    ],
  },
  {
    label: "Platform",
    tools: [
      { name: "get_platform_stats", desc: "Global volume, trade counts, market totals" },
      { name: "get_recent_trades",  desc: "Latest trades across all markets" },
      { name: "get_batch_prices",   desc: "Current prices for multiple markets at once" },
    ],
  },
];

const EXAMPLE_PROMPTS = [
  { prompt: "What are the top 5 prediction markets by volume right now?",                   tools: ["get_top_markets"] },
  { prompt: "Find all markets about the 2026 US elections and compare their prices.",        tools: ["search_markets", "compare_markets"] },
  { prompt: "Show me the orderbook for the most liquid market on Polymarket.",               tools: ["get_top_markets", "get_market_orderbook"] },
  { prompt: "Which markets are resolving this week with the highest trading activity?",      tools: ["get_resolving_markets"] },
  { prompt: "Analyze the price history of the Trump election market over the past 7 days.", tools: ["search_markets", "get_market_price_history"] },
  { prompt: "Look up wallet 0x123… and summarize its open positions and total P&L.",        tools: ["get_wallet_summary", "get_wallet_open_positions"] },
  { prompt: "Show me trending markets in the crypto category.",                              tools: ["get_trending_markets", "get_category_markets"] },
  { prompt: "What is the current sentiment and signal for the most popular AI market?",     tools: ["search_markets", "get_market_sentiment", "get_market_signals"] },
];

/* ── component ─────────────────────────────────────────────── */

function Code({ children }: { children: string }) {
  return (
    <code style={{
      fontFamily: "var(--font-geist-mono), monospace",
      fontSize: 12,
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: 4,
      padding: "2px 7px",
      color: "var(--text)",
    }}>
      {children}
    </code>
  );
}

function PathBox({ children }: { children: string }) {
  return (
    <div style={{
      fontFamily: "var(--font-geist-mono), monospace",
      fontSize: 12,
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: 6,
      padding: "9px 14px",
      color: "var(--muted)",
      overflowX: "auto",
      whiteSpace: "nowrap",
    }}>
      {children}
    </div>
  );
}

function ConfigBox({ code }: { code: string }) {
  return (
    <div style={{
      background: "#111111",
      border: "1px solid #1e1e1e",
      borderRadius: 10,
      padding: "20px 24px",
      overflowX: "auto",
    }}>
      <pre style={{
        fontFamily: "var(--font-geist-mono), monospace",
        fontSize: 13,
        lineHeight: 1.85,
        margin: 0,
        color: "#e4e4e4",
      }}>
        {code}
      </pre>
    </div>
  );
}

function StepNum({ n }: { n: number }) {
  return (
    <div style={{
      width: 28, height: 28, borderRadius: "50%",
      background: "var(--green-dim)", color: "var(--green-text)",
      fontSize: 12, fontWeight: 700,
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0, marginTop: 1,
    }}>
      {n}
    </div>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div style={{
      fontSize: 11, fontWeight: 700, textTransform: "uppercase",
      letterSpacing: "0.1em", color: "var(--muted)",
      marginBottom: 14, paddingBottom: 12,
      borderBottom: "1px solid var(--border)",
    }}>
      {children}
    </div>
  );
}

type Tab = "sse" | "npx";

export default function McpGuidePage() {
  const [active, setActive] = useState<Tab>("sse");

  return (
    <>
      <style>{`
        body { font-family: var(--font-geist-sans), 'Helvetica Neue', sans-serif; }
        .nav-links { display: flex; align-items: center; gap: 24px; }
        .nav-link-hide { display: block; }

        /* Method tabs */
        .method-strip { display: flex; border: 1px solid var(--border); border-radius: 8px; overflow: hidden; width: fit-content; }
        .method-btn {
          font-size: 13px; font-weight: 600; padding: 9px 22px; cursor: pointer;
          border: none; background: var(--surface); color: var(--muted);
          transition: background 0.15s, color 0.15s;
          display: flex; align-items: center; gap: 8px;
        }
        .method-btn.on { background: var(--text); color: var(--bg); }
        .method-btn:not(:last-child) { border-right: 1px solid var(--border); }

        /* Comparison table */
        .cmp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .cmp-card { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 24px; }
        .cmp-badge { display: inline-block; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; padding: 3px 9px; border-radius: 999px; margin-bottom: 12px; }
        .cmp-badge.recommended { background: var(--green-dim); color: var(--green-text); border: 1px solid var(--green-dim); }
        .cmp-badge.dev { background: var(--surface2, #f0f0ee); color: var(--muted); border: 1px solid var(--border); }
        .cmp-title { font-size: 16px; font-weight: 700; color: var(--text); margin-bottom: 8px; }
        .cmp-sub { font-size: 13px; color: var(--muted); line-height: 1.6; margin-bottom: 16px; }
        .cmp-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 7px; }
        .cmp-li { display: flex; gap: 10px; font-size: 13px; color: var(--muted); align-items: flex-start; }

        /* Steps */
        .step-row { display: flex; gap: 16px; }
        .step-body { flex: 1; }
        .step-title { font-size: 14px; font-weight: 600; color: var(--text); margin-bottom: 6px; }
        .step-desc { font-size: 13px; color: var(--muted); line-height: 1.65; margin-bottom: 12px; }
        .step-note { font-size: 12px; color: var(--muted); background: var(--surface); border: 1px solid var(--border); border-radius: 6px; padding: 10px 14px; line-height: 1.6; margin-top: 10px; }

        /* OS label */
        .os-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); margin: 12px 0 5px; }

        /* Prompt list */
        .prompt-item { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 16px 20px; margin-bottom: 10px; }
        .prompt-q { font-family: var(--font-serif), Georgia, serif; font-size: 15px; color: var(--text); line-height: 1.5; margin-bottom: 8px; }
        .prompt-tools { display: flex; gap: 6px; flex-wrap: wrap; }
        .prompt-tool { font-family: var(--font-geist-mono), monospace; font-size: 11px; color: var(--green-text, #346538); background: var(--green-dim, #EDF3EC); border-radius: 4px; padding: 2px 8px; }

        /* Tool grid */
        .tool-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 10px; margin-bottom: 40px; }
        .tool-card { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 14px 16px; }
        .tool-name { font-family: var(--font-geist-mono), monospace; font-size: 12px; color: var(--green); font-weight: 600; margin-bottom: 4px; }
        .tool-desc { font-size: 12px; color: var(--muted); line-height: 1.5; }

        /* Footer */
        .footer-inner { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; padding: 32px 24px; max-width: 1024px; margin: 0 auto; }
        .footer-links { display: flex; gap: 24px; }

        @media (max-width: 680px) {
          .nav-link-hide { display: none; }
          .cmp-grid { grid-template-columns: 1fr; }
          .tool-grid { grid-template-columns: 1fr; }
          .hero-h1 { font-size: 28px !important; }
          .sec-px { padding-left: 16px !important; padding-right: 16px !important; }
          .section-pad { padding-top: 48px !important; padding-bottom: 48px !important; }
          .h2 { font-size: 26px !important; }
          .footer-inner { flex-direction: column; align-items: flex-start; }
          .footer-links { flex-wrap: wrap; gap: 14px; }
          .method-strip { width: 100%; }
          .method-btn { flex: 1; justify-content: center; padding: 9px 10px; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{ position:"sticky", top:0, zIndex:50, background:"var(--bg)", borderBottom:"1px solid var(--border)", backdropFilter:"blur(8px)" }}>
        <div style={{ maxWidth:1024, margin:"0 auto", padding:"0 24px", height:72, display:"flex", alignItems:"center", justifyContent:"space-between" }} className="sec-px">
          <a href="/" style={{ display:"flex", alignItems:"center", gap:12, textDecoration:"none" }}>
            {LOGO(34)}
            <span style={{ fontSize:20, fontWeight:700, letterSpacing:"-0.02em", color:"var(--text)" }}>PMAxis</span>
          </a>
          <div className="nav-links">
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href} className="nav-link-hide" style={{ fontSize:13, color: l.label==="MCP" ? "var(--text)" : "var(--muted)", fontWeight: l.label==="MCP" ? 600 : 400, textDecoration:"none" }}>{l.label}</a>
            ))}
            <a href={`${API_URL}/login`} className="nav-link-hide" style={{ fontSize:13, color:"var(--muted)", textDecoration:"none" }}>Sign in</a>
            <ThemeToggle />
            <a href={`${API_URL}/signup`} style={{ fontSize:13, fontWeight:700, background:"var(--green)", color:"var(--bg)", padding:"8px 16px", borderRadius:5, textDecoration:"none" }}>Get API key</a>
          </div>
        </div>
      </nav>

      <main style={{ flex:1 }}>

        {/* ── HERO ── */}
        <section style={{ maxWidth:1024, margin:"0 auto", padding:"72px 24px 64px", textAlign:"center" }} className="section-pad sec-px">
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, fontSize:11, fontWeight:700, padding:"5px 14px", borderRadius:999, letterSpacing:"0.08em", textTransform:"uppercase", background:"var(--green-dim)", color:"var(--green-text)", border:"1px solid var(--green-dim)", marginBottom:28 }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:"var(--green)", display:"inline-block" }}></span>
            MCP — Model Context Protocol
          </div>
          <h1 className="font-serif hero-h1" style={{ fontSize:48, lineHeight:1.08, letterSpacing:"-0.03em", color:"var(--text)", maxWidth:660, margin:"0 auto 18px" }}>
            Use Claude to explore<br />prediction markets.
          </h1>
          <p style={{ fontSize:16, color:"var(--muted)", lineHeight:1.7, maxWidth:500, margin:"0 auto 0" }}>
            Connect Claude Desktop to live PMAxis data — prices, orderbooks, trades, signals, wallet history — using the Model Context Protocol. No prompting gymnastics. Just ask.
          </p>
        </section>

        <div style={{ borderTop:"1px solid var(--border)" }} />

        {/* ── WHICH METHOD ── */}
        <section style={{ maxWidth:1024, margin:"0 auto", padding:"72px 24px 64px" }} className="section-pad sec-px">
          <h2 className="font-serif h2" style={{ fontSize:34, letterSpacing:"-0.02em", color:"var(--text)", marginBottom:10 }}>Two ways to connect</h2>
          <p style={{ fontSize:15, color:"var(--muted)", lineHeight:1.7, marginBottom:40, maxWidth:480 }}>
            Both methods give Claude access to the same 34 tools. Pick whichever fits your setup.
          </p>

          <div className="cmp-grid">
            {/* SSE */}
            <div className="cmp-card" style={{ borderColor: active === "sse" ? "var(--green)" : "var(--border)" }}>
              <div className="cmp-badge recommended">Recommended</div>
              <div className="cmp-title">Hosted SSE</div>
              <div className="cmp-sub">Connects to our server at <Code>mcp.pmaxis.trade</Code>. Nothing to install locally.</div>
              <ul className="cmp-list">
                {[
                  "No Node.js or npm required",
                  "Works on any OS — Windows, Mac, Linux",
                  "Always the latest version, automatically",
                  "One URL in the config file",
                ].map(t => (
                  <li key={t} className="cmp-li">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5" style={{ flexShrink:0, marginTop:1 }}><polyline points="20 6 9 17 4 12"/></svg>
                    {t}
                  </li>
                ))}
              </ul>
              <button onClick={() => setActive("sse")} className="method-btn on" style={{ marginTop:20, borderRadius:6, width:"100%", justifyContent:"center", border:"1px solid var(--text)", padding:"10px 0" }}>
                View SSE setup
              </button>
            </div>

            {/* npx */}
            <div className="cmp-card" style={{ borderColor: active === "npx" ? "var(--green)" : "var(--border)" }}>
              <div className="cmp-badge dev">For developers</div>
              <div className="cmp-title">npx (local)</div>
              <div className="cmp-sub">Runs the MCP server on your machine via <Code>@pmaxis/mcp-server</Code> on npm.</div>
              <ul className="cmp-list">
                {[
                  "Requires Node.js 18+",
                  "Package auto-downloaded on first use",
                  "Runs entirely offline once cached",
                  "Good for testing and development",
                ].map(t => (
                  <li key={t} className="cmp-li">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2.5" style={{ flexShrink:0, marginTop:1 }}><polyline points="20 6 9 17 4 12"/></svg>
                    {t}
                  </li>
                ))}
              </ul>
              <button onClick={() => setActive("npx")} className="method-btn" style={{ marginTop:20, borderRadius:6, width:"100%", justifyContent:"center", border:"1px solid var(--border)", padding:"10px 0", background:"var(--surface)", color:"var(--muted)" }}>
                View npx setup
              </button>
            </div>
          </div>
        </section>

        <div style={{ borderTop:"1px solid var(--border)" }} />

        {/* ── SETUP GUIDE ── */}
        <section style={{ maxWidth:1024, margin:"0 auto", padding:"72px 24px 64px" }} className="section-pad sec-px">

          {/* Tab strip */}
          <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:48 }}>
            <h2 className="font-serif h2" style={{ fontSize:34, letterSpacing:"-0.02em", color:"var(--text)", margin:0 }}>Setup guide</h2>
            <div className="method-strip" style={{ marginLeft:"auto" }}>
              <button className={`method-btn${active==="sse" ? " on" : ""}`} onClick={() => setActive("sse")}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01"/></svg>
                Hosted SSE
              </button>
              <button className={`method-btn${active==="npx" ? " on" : ""}`} onClick={() => setActive("npx")}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
                npx
              </button>
            </div>
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:36 }}>

            {/* Step 1 — same for both */}
            <div className="step-row">
              <StepNum n={1} />
              <div className="step-body">
                <div className="step-title">Get a free API key</div>
                <div className="step-desc">
                  Sign up at <a href={`${API_URL}/signup`} style={{ color:"var(--text)", textDecoration:"underline", textUnderlineOffset:3 }}>api.pmaxis.trade/signup</a>. No credit card, no waitlist — key is issued instantly. Copy it from the dashboard.
                </div>
              </div>
            </div>

            {/* Step 2 — prereq, method-specific */}
            {active === "npx" && (
              <div className="step-row">
                <StepNum n={2} />
                <div className="step-body">
                  <div className="step-title">Install Node.js 18 or later</div>
                  <div className="step-desc">
                    Download from <a href="https://nodejs.org" style={{ color:"var(--text)", textDecoration:"underline", textUnderlineOffset:3 }}>nodejs.org</a>. The <Code>npx</Code> command is included with Node.js. Run <Code>node -v</Code> in your terminal to confirm — it should print <Code>v18.x</Code> or higher.
                  </div>
                  <div className="step-note">
                    You do not need to install the package manually. <Code>npx -y @pmaxis/mcp-server</Code> downloads and runs it automatically on first use.
                  </div>
                </div>
              </div>
            )}

            {/* Step 2/3 — open config file */}
            <div className="step-row">
              <StepNum n={active === "npx" ? 3 : 2} />
              <div className="step-body">
                <div className="step-title">Open claude_desktop_config.json</div>
                <div className="step-desc">
                  Claude Desktop stores its MCP config in a JSON file. Open it in any text editor — it may not exist yet, in which case create it.
                </div>
                <div className="os-label">Windows</div>
                <PathBox>{CONFIG_PATHS.windows}</PathBox>
                <div className="os-label">macOS</div>
                <PathBox>{CONFIG_PATHS.mac}</PathBox>
              </div>
            </div>

            {/* Step 3/4 — paste config */}
            <div className="step-row">
              <StepNum n={active === "npx" ? 4 : 3} />
              <div className="step-body">
                <div className="step-title">Paste the config and add your key</div>
                <div className="step-desc">
                  {active === "sse"
                    ? <>Copy the block below into the file. Replace <Code>YOUR_API_KEY</Code> with the key you copied in step 1. If the file already has a <Code>mcpServers</Code> object, add the <Code>pmaxis</Code> entry inside it.</>
                    : <>Copy the block below into the file. Replace <Code>YOUR_API_KEY</Code> in the <Code>env</Code> block. The <Code>PMAXIS_API_URL</Code> line can stay as-is.</>
                  }
                </div>
                <ConfigBox code={active === "sse" ? SSE_CONFIG : NPX_CONFIG} />
                {active === "sse" && (
                  <div className="step-note">
                    The <Code>url</Code> field points to our hosted server. Your API key travels in the query string over HTTPS — it is never stored or logged on our end beyond normal request auth.
                  </div>
                )}
                {active === "npx" && (
                  <div className="step-note">
                    Claude Desktop reads the <Code>env</Code> block and passes those variables to the spawned process. Your key stays on your machine.
                  </div>
                )}
              </div>
            </div>

            {/* Final step — restart */}
            <div className="step-row">
              <StepNum n={active === "npx" ? 5 : 4} />
              <div className="step-body">
                <div className="step-title">Quit and reopen Claude Desktop</div>
                <div className="step-desc">
                  A full quit (not just closing the window) is required. After relaunch, open a new conversation. A small <strong>hammer icon</strong> appears in the chat input bar — clicking it shows the loaded tools. If you see PMAxis tools listed, you are connected.
                </div>
                <div className="step-note">
                  If the hammer icon does not appear: double-check your JSON syntax (a trailing comma or missing brace is the most common cause), confirm the file is saved, and try quitting again.
                </div>
              </div>
            </div>

          </div>
        </section>

        <div style={{ borderTop:"1px solid var(--border)" }} />

        {/* ── EXAMPLE PROMPTS ── */}
        <section style={{ background:"var(--surface)", borderBottom:"1px solid var(--border)" }}>
          <div style={{ maxWidth:1024, margin:"0 auto", padding:"72px 24px 64px" }} className="section-pad sec-px">
            <h2 className="font-serif h2" style={{ fontSize:34, letterSpacing:"-0.02em", color:"var(--text)", marginBottom:10 }}>What to ask Claude</h2>
            <p style={{ fontSize:15, color:"var(--muted)", lineHeight:1.7, marginBottom:48, maxWidth:480 }}>
              Once connected, these prompts work out of the box. Claude picks the right tools automatically — you do not need to name them.
            </p>
            <div>
              {EXAMPLE_PROMPTS.map((item, i) => (
                <div key={i} className="prompt-item">
                  <div style={{ fontSize:11, color:"var(--muted)", fontFamily:"monospace", marginBottom:6, opacity:0.6 }}>prompt {i + 1}</div>
                  <div className="prompt-q">&ldquo;{item.prompt}&rdquo;</div>
                  <div className="prompt-tools">
                    {item.tools.map(t => <span key={t} className="prompt-tool">{t}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div style={{ borderTop:"1px solid var(--border)" }} />

        {/* ── TOOL REFERENCE ── */}
        <section style={{ maxWidth:1024, margin:"0 auto", padding:"72px 24px 64px" }} className="section-pad sec-px">
          <h2 className="font-serif h2" style={{ fontSize:34, letterSpacing:"-0.02em", color:"var(--text)", marginBottom:10 }}>34 tools, live data</h2>
          <p style={{ fontSize:15, color:"var(--muted)", lineHeight:1.7, marginBottom:56, maxWidth:480 }}>
            Every tool calls the PMAxis REST API in real time. No cached or stale data.
          </p>
          {TOOL_GROUPS.map(group => (
            <div key={group.label}>
              <SectionLabel>{group.label}</SectionLabel>
              <div className="tool-grid">
                {group.tools.map(tool => (
                  <div key={tool.name} className="tool-card">
                    <div className="tool-name">{tool.name}</div>
                    <div className="tool-desc">{tool.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* ── CTA ── */}
        <section style={{ background:"var(--text)", borderTop:"1px solid var(--border)" }}>
          <div style={{ maxWidth:1024, margin:"0 auto", padding:"80px 24px", textAlign:"center" }} className="section-pad sec-px">
            <h2 className="font-serif" style={{ fontSize:40, letterSpacing:"-0.03em", color:"var(--bg)", marginBottom:16 }}>
              Ready to start?
            </h2>
            <p style={{ fontSize:15, color:"rgba(160,160,160,0.9)", marginBottom:40, maxWidth:400, margin:"0 auto 40px", lineHeight:1.7 }}>
              Free API key. No credit card. Every tool available on the free tier.
            </p>
            <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
              <a href={`${API_URL}/signup`} style={{ display:"inline-block", background:"var(--green)", color:"var(--bg)", fontSize:14, fontWeight:700, padding:"13px 30px", borderRadius:6, textDecoration:"none" }}>
                Get free API key
              </a>
              <a href={`${API_URL}/docs`} style={{ display:"inline-block", background:"transparent", color:"rgba(200,200,200,0.85)", fontSize:14, fontWeight:500, padding:"13px 30px", borderRadius:6, textDecoration:"none", border:"1px solid rgba(255,255,255,0.18)" }}>
                API reference
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop:"1px solid var(--border)", background:"var(--bg)" }}>
        <div className="footer-inner">
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            {LOGO(24)}
            <span style={{ fontSize:14, fontWeight:600, color:"var(--text)" }}>PMAxis</span>
          </div>
          <div className="footer-links">
            {[["Docs",`${API_URL}/docs`],["Status",`${API_URL}/status`],["MCP","/mcp"],["Sign up",`${API_URL}/signup`],["Login",`${API_URL}/login`]].map(([l,h])=>(
              <a key={l} href={h} style={{ fontSize:12, color:"var(--muted)", textDecoration:"none" }}>{l}</a>
            ))}
          </div>
          <div style={{ fontSize:12, color:"var(--muted)" }}>© 2026 PMAxis. All rights reserved.</div>
        </div>
      </footer>
    </>
  );
}
