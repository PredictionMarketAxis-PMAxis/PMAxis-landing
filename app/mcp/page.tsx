"use client";
import { useState } from "react";
import ThemeToggle from "../ThemeToggle";

const API_URL = "https://api.pmaxis.trade";
const MCP_URL = "https://mcp.pmaxis.trade";

/* ── brand tokens ──────────────────────────────────────────── */
const B = {
  green:  "#00E676",
  purple: "#8B5CF6",
  black:  "#0A0A0A",
  white:  "#FFFFFF",
  grey:   "#A1A1AA",
  greenDim:   "rgba(0,230,118,0.10)",
  purpleDim:  "rgba(139,92,246,0.10)",
  greenBorder:"rgba(0,230,118,0.25)",
  purpleBorder:"rgba(139,92,246,0.25)",
  grad: "linear-gradient(135deg, #00E676 0%, #8B5CF6 100%)",
};

/* ── logo ──────────────────────────────────────────────────── */
const LOGO = (size = 36) => (
  <svg width={size} height={size} viewBox="0 0 803 795" fill="none">
    <path fill="var(--text)" d="M719.962 114.503C724.439 116.738 746.095 136.885 751.202 141.275C743.13 152.558 727.925 169.756 718.52 180.14C667.116 237.986 604.881 285.207 535.329 319.136C528.842 322.253 501.635 334.541 495.686 335.719C493.671 334.794 493.692 334.098 492.165 332.003C481.767 318.552 471.393 311.209 457.07 302.886C532.805 280.515 608.565 231.922 664.325 176.745C684.543 156.739 701.958 136.391 719.962 114.503Z"/>
    <path fill="var(--text)" d="M103.731 114.306C106.532 116.771 116.373 129.166 119.413 132.747C128.996 144.095 139.01 155.071 149.433 165.651C213.595 230.118 280.396 274.662 366.923 302.87C352.429 310.952 342.084 318.858 331.657 332.058L328.841 336.043C319.39 333.204 296.981 322.854 288.065 318.523C216.559 283.785 152.851 232.607 99.9718 173.495C90.9908 163.455 80.8168 152.054 72.5908 141.466C80.8318 133.892 95.1408 120.907 103.731 114.306Z"/>
    <path fill="var(--text)" d="M500.639 448.854C510.914 451.537 533.17 462.09 542.691 466.637C603.572 495.713 657.966 537.098 703.779 586.511C719.932 603.934 737.715 624.431 751.412 643.924C743.385 651.277 729.34 662.024 720.529 669.194C717.837 667.836 711.304 658.002 708.901 655.026C699.702 643.633 690.268 632.508 680.354 621.743C622.903 558.485 550.473 510.682 469.721 482.728C482.46 472.687 492.344 462.846 500.639 448.854Z"/>
    <path fill="var(--text)" d="M322.57 449.109C324.527 450.34 331.226 460.882 333.985 463.96C341.099 471.897 346.509 476.457 354.784 482.779C251.686 517.317 170.299 583.28 104.517 668.566L103.202 668.709C97.76 665.303 78.849 649.187 72.52 644.052C81.2 630.876 98.635 610.478 109.165 598.717C157.332 544.918 214.867 498.845 280.012 467.285C293.255 460.869 308.655 453.904 322.57 449.109Z"/>
    <path fill={B.green} d="M404.129 336.369C437.402 331.991 467.935 355.383 472.368 388.649C476.801 421.915 453.459 452.487 420.201 456.975C386.865 461.473 356.206 438.064 351.762 404.721C347.319 371.378 370.778 340.757 404.129 336.369Z"/>
  </svg>
);

/* ── data ──────────────────────────────────────────────────── */
const CLAUDE_CONFIG = `{
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

const CURSOR_CONFIG = `{
  "mcpServers": {
    "pmaxis": {
      "url": "${MCP_URL}/sse?key=YOUR_API_KEY"
    }
  }
}`;

const WINDSURF_CONFIG = `{
  "mcpServers": {
    "pmaxis": {
      "url": "${MCP_URL}/sse?key=YOUR_API_KEY"
    }
  }
}`;

const PYTHON_CONFIG = `from mcp.client.sse import sse_client
from mcp import ClientSession

async with sse_client(
    "${MCP_URL}/sse?key=YOUR_API_KEY"
) as (read, write):
    async with ClientSession(read, write) as session:
        await session.initialize()
        result = await session.call_tool(
            "get_top_markets", {"limit": 5}
        )`;

const CONFIG_PATHS = {
  windows: "C:\\Users\\<name>\\AppData\\Roaming\\Claude\\claude_desktop_config.json",
  mac:     "~/Library/Application Support/Claude/claude_desktop_config.json",
};

const NPM_CONFIG = `# Install globally once
npm install -g @pmaxis/mcp-server

# Then add to your claude_desktop_config.json:
{
  "mcpServers": {
    "pmaxis": {
      "command": "pmaxis-mcp",
      "args": [],
      "env": {
        "PMAXIS_API_KEY": "YOUR_API_KEY",
        "PMAXIS_API_URL": "${API_URL}"
      }
    }
  }
}`;

const AGENTS = [
  { id: "claude",   label: "Claude Desktop", badge: "npx", color: B.green,  borderColor: B.greenBorder,  dimColor: B.greenDim },
  { id: "npm",      label: "npm (global)",    badge: "npm", color: B.green,  borderColor: B.greenBorder,  dimColor: B.greenDim },
  { id: "cursor",   label: "Cursor",          badge: "SSE", color: B.purple, borderColor: B.purpleBorder, dimColor: B.purpleDim },
  { id: "windsurf", label: "Windsurf",        badge: "SSE", color: B.purple, borderColor: B.purpleBorder, dimColor: B.purpleDim },
  { id: "python",   label: "Python SDK",      badge: "SSE", color: B.purple, borderColor: B.purpleBorder, dimColor: B.purpleDim },
];

const AGENT_CONFIGS: Record<string, string> = {
  claude:   CLAUDE_CONFIG,
  npm:      NPM_CONFIG,
  cursor:   CURSOR_CONFIG,
  windsurf: WINDSURF_CONFIG,
  python:   PYTHON_CONFIG,
};

const AGENT_NOTES: Record<string, { path?: string; note: string }> = {
  claude: {
    path: "claude_desktop_config.json",
    note: "Requires Node.js 18+. npx downloads the package automatically on first use — no install step needed. Quit Claude Desktop fully from the system tray, then reopen.",
  },
  npm: {
    path: "claude_desktop_config.json",
    note: "Global install runs faster than npx since the package is already on disk. Run the npm install once, then use the config above. Works with Claude Desktop, Cursor, or any agent that supports stdio.",
  },
  cursor: {
    path: "~/.cursor/mcp.json",
    note: "Cursor supports SSE remote servers natively. Restart Cursor after saving.",
  },
  windsurf: {
    path: "~/.codeium/windsurf/mcp_config.json",
    note: "Windsurf supports SSE remote servers. Reload the window after saving.",
  },
  python: {
    note: "Install the MCP SDK: pip install mcp. The SSE client connects directly to the hosted server — no local process needed.",
  },
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

const PROMPTS = [
  "What are the top 5 prediction markets by volume right now?",
  "Find all markets about the 2026 US elections and compare their prices.",
  "Show me the orderbook for the most liquid market today.",
  "Which markets are resolving this week with the highest trading activity?",
  "Analyze the price history of the most popular AI market over 7 days.",
  "Look up wallet 0x123… and summarize its open positions and P&L.",
  "Show me trending markets in the crypto category.",
  "What is the current sentiment and signal for the top AI market?",
];

/* ── page ──────────────────────────────────────────────────── */
export default function McpPage() {
  const [agent, setAgent] = useState("claude");
  const activeAgent = AGENTS.find(a => a.id === agent)!;
  const note = AGENT_NOTES[agent];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

        .mcp-page { font-family: 'Space Grotesk', 'Helvetica Neue', sans-serif; }

        /* nav */
        .mcp-nav-link { font-size: 13px; color: var(--muted); text-decoration: none; font-weight: 500; transition: color 0.15s; }
        .mcp-nav-link:hover { color: var(--text); }
        .mcp-nav-link.active { color: var(--text); font-weight: 600; }
        .hide-mobile { display: block; }

        /* hero */
        .mcp-hero { background: ${B.black}; padding: 88px 24px 80px; text-align: center; position: relative; overflow: hidden; }
        .mcp-hero::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,230,118,0.12) 0%, transparent 70%),
                      radial-gradient(ellipse 40% 40% at 80% 80%, rgba(139,92,246,0.10) 0%, transparent 60%);
          pointer-events: none;
        }
        .mcp-hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
          padding: 6px 16px; border-radius: 999px; margin-bottom: 32px;
          background: rgba(0,230,118,0.08); border: 1px solid rgba(0,230,118,0.2); color: ${B.green};
          position: relative;
        }
        .mcp-hero-h1 {
          font-size: 52px; font-weight: 700; line-height: 1.06; letter-spacing: -0.03em;
          color: ${B.white}; max-width: 660px; margin: 0 auto 20px; position: relative;
        }
        .mcp-grad-text {
          background: ${B.grad};
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .mcp-hero-sub {
          font-size: 16px; color: ${B.grey}; line-height: 1.7;
          max-width: 480px; margin: 0 auto 40px; position: relative;
        }
        .mcp-hero-cta {
          display: inline-flex; align-items: center; gap: 10px;
          background: ${B.grad}; color: ${B.black};
          font-size: 14px; font-weight: 700; padding: 13px 30px;
          border-radius: 6px; text-decoration: none; position: relative;
          font-family: 'Space Grotesk', sans-serif;
          transition: opacity 0.15s;
        }
        .mcp-hero-cta:hover { opacity: 0.88; }

        /* section */
        .mcp-section { max-width: 1020px; margin: 0 auto; padding: 72px 24px; }
        .mcp-section-dark { background: ${B.black}; }
        .mcp-section-surf { background: var(--surface); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
        .mcp-h2 { font-size: 34px; font-weight: 700; letter-spacing: -0.025em; color: var(--text); margin-bottom: 10px; }
        .mcp-h2-dark { color: ${B.white}; }
        .mcp-sub { font-size: 15px; color: var(--muted); line-height: 1.7; max-width: 460px; margin-bottom: 48px; }
        .mcp-sub-dark { color: ${B.grey}; }
        .mcp-divider { border: none; border-top: 1px solid var(--border); margin: 0; }

        /* agent tabs */
        .agent-tabs { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 32px; }
        .agent-tab {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 13px; font-weight: 600;
          padding: 8px 18px; border-radius: 6px; cursor: pointer;
          border: 1px solid var(--border);
          background: var(--surface); color: var(--muted);
          transition: all 0.15s; display: flex; align-items: center; gap: 8px;
        }
        .agent-tab-badge { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; padding: 2px 7px; border-radius: 4px; }

        /* config block */
        .config-wrap { border-radius: 12px; overflow: hidden; border: 1px solid #1e1e1e; }
        .config-bar { background: #161616; padding: 10px 16px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #1e1e1e; }
        .config-dots { display: flex; gap: 6px; }
        .config-dot { width: 10px; height: 10px; border-radius: 50%; }
        .config-label { font-size: 11px; color: #555; font-family: monospace; }
        .config-pre { background: #0d0d0d; padding: 20px 24px; font-family: 'Space Grotesk', monospace; font-size: 13px; line-height: 1.9; color: #e4e4e4; overflow-x: auto; margin: 0; white-space: pre; }
        .config-copy { font-family: 'Space Grotesk', sans-serif; font-size: 11px; font-weight: 600; background: transparent; border: 1px solid #333; color: #888; border-radius: 4px; padding: 4px 10px; cursor: pointer; transition: all 0.15s; }
        .config-copy:hover { border-color: ${B.green}; color: ${B.green}; }

        /* path box */
        .path-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); margin: 14px 0 5px; }
        .path-box { font-family: monospace; font-size: 12px; background: var(--surface); border: 1px solid var(--border); border-radius: 6px; padding: 9px 14px; color: var(--muted); overflow-x: auto; white-space: nowrap; }

        /* note box */
        .note-box { font-size: 13px; color: var(--muted); background: var(--surface); border: 1px solid var(--border); border-left: 3px solid ${B.green}; border-radius: 6px; padding: 12px 16px; line-height: 1.65; margin-top: 16px; }

        /* step */
        .step-row { display: flex; gap: 16px; margin-bottom: 32px; }
        .step-num { width: 28px; height: 28px; border-radius: 50%; background: ${B.greenDim}; color: ${B.green}; font-size: 12px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; border: 1px solid ${B.greenBorder}; }
        .step-title { font-size: 14px; font-weight: 700; color: var(--text); margin-bottom: 6px; }
        .step-desc { font-size: 13px; color: var(--muted); line-height: 1.65; }

        /* prompts */
        .prompt-item { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 18px 22px; margin-bottom: 10px; display: flex; gap: 14px; align-items: flex-start; transition: border-color 0.15s; }
        .prompt-item:hover { border-color: ${B.greenBorder}; }
        .prompt-arrow { color: ${B.green}; font-size: 16px; flex-shrink: 0; margin-top: 1px; }
        .prompt-text { font-size: 14px; color: var(--text); line-height: 1.55; font-weight: 500; }

        /* tools */
        .tool-group-label { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--muted); padding-bottom: 12px; border-bottom: 1px solid var(--border); margin-bottom: 16px; }
        .tool-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 10px; margin-bottom: 44px; }
        .tool-card { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 16px 18px; transition: border-color 0.15s; }
        .tool-card:hover { border-color: ${B.greenBorder}; }
        .tool-name { font-family: monospace; font-size: 13px; font-weight: 600; color: ${B.green}; margin-bottom: 6px; }
        .tool-desc { font-size: 13px; color: var(--muted); line-height: 1.55; }

        /* cta dark */
        .mcp-cta-dark { background: ${B.black}; border-top: 1px solid #1a1a1a; }
        .mcp-cta-inner { max-width: 1020px; margin: 0 auto; padding: 80px 24px; text-align: center; }
        .mcp-cta-h2 { font-size: 40px; font-weight: 700; letter-spacing: -0.025em; color: ${B.white}; margin-bottom: 16px; }
        .mcp-cta-sub { font-size: 15px; color: ${B.grey}; margin-bottom: 40px; max-width: 380px; margin-left: auto; margin-right: auto; line-height: 1.7; }

        /* footer */
        .mcp-footer-inner { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; padding: 32px 24px; max-width: 1020px; margin: 0 auto; }
        .mcp-footer-links { display: flex; gap: 24px; flex-wrap: wrap; }

        @media (max-width: 640px) {
          .hide-mobile { display: none; }
          .mcp-hero-h1 { font-size: 30px; }
          .mcp-hero { padding: 60px 16px 56px; }
          .mcp-section { padding: 48px 16px; }
          .mcp-h2 { font-size: 26px; }
          .mcp-cta-h2 { font-size: 28px; }
          .tool-grid { grid-template-columns: 1fr; }
          .agent-tabs { gap: 8px; }
          .agent-tab { font-size: 12px; padding: 7px 12px; }
          .mcp-footer-inner { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <div className="mcp-page">

        {/* ── NAV ── */}
        <nav style={{ position:"sticky", top:0, zIndex:50, background:"var(--bg)", borderBottom:"1px solid var(--border)", backdropFilter:"blur(8px)" }}>
          <div style={{ maxWidth:1020, margin:"0 auto", padding:"0 24px", height:68, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <a href="/" style={{ display:"flex", alignItems:"center", gap:10, textDecoration:"none" }}>
              {LOGO(32)}
              <span style={{ fontSize:18, fontWeight:700, letterSpacing:"-0.02em", color:"var(--text)", fontFamily:"'Space Grotesk', sans-serif" }}>PMAxis</span>
            </a>
            <div style={{ display:"flex", alignItems:"center", gap:24 }}>
              <a href={`${API_URL}/docs`} className="mcp-nav-link hide-mobile">Docs</a>
              <a href={`${API_URL}/status`} className="mcp-nav-link hide-mobile">Status</a>
              <a href="/mcp" className="mcp-nav-link active hide-mobile">MCP</a>
              <a href={`${API_URL}/login`} className="mcp-nav-link hide-mobile">Sign in</a>
              <ThemeToggle />
              <a href={`${API_URL}/signup`} style={{ fontSize:13, fontWeight:700, background:B.grad, color:B.black, padding:"8px 18px", borderRadius:5, textDecoration:"none", fontFamily:"'Space Grotesk', sans-serif" }}>Get API key</a>
            </div>
          </div>
        </nav>

        {/* ── HERO ── */}
        <div className="mcp-hero">
          <div className="mcp-hero-badge">
            <span style={{ width:6, height:6, borderRadius:"50%", background:B.green, display:"inline-block" }}></span>
            Model Context Protocol · 34 live tools
          </div>
          <h1 className="mcp-hero-h1">
            Ask your AI agent about<br />
            <span className="mcp-grad-text">any prediction market.</span>
          </h1>
          <p className="mcp-hero-sub">
            Connect Claude, Cursor, Windsurf, or any MCP-compatible agent to live PMAxis data — prices, orderbooks, signals, and wallet history across 53,000+ markets.
          </p>
          <a href={`${API_URL}/signup`} className="mcp-hero-cta">
            Get free API key
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>

        <hr className="mcp-divider" />

        {/* ── SETUP GUIDE ── */}
        <section style={{ maxWidth:1020, margin:"0 auto", padding:"72px 24px" }}>
          <h2 className="mcp-h2">Connect your agent</h2>
          <p className="mcp-sub">
            Pick your agent below. Each has a different config format — the right one is shown automatically.
          </p>

          {/* Agent selector */}
          <div className="agent-tabs">
            {AGENTS.map(a => (
              <button
                key={a.id}
                className="agent-tab"
                onClick={() => setAgent(a.id)}
                style={{
                  borderColor: agent === a.id ? a.borderColor : "var(--border)",
                  background:  agent === a.id ? a.dimColor   : "var(--surface)",
                  color:       agent === a.id ? a.color      : "var(--muted)",
                }}
              >
                {a.label}
                <span className="agent-tab-badge" style={{ background: agent === a.id ? a.dimColor : "var(--surface2,#f0f0ee)", color: a.color, border:`1px solid ${a.borderColor}` }}>
                  {a.badge}
                </span>
              </button>
            ))}
          </div>

          {/* Steps */}
          <div>
            {/* Step 1 — get key */}
            <div className="step-row">
              <div className="step-num">1</div>
              <div>
                <div className="step-title">Get a free API key</div>
                <div className="step-desc">
                  Sign up at <a href={`${API_URL}/signup`} style={{ color:"var(--text)", textDecoration:"underline", textUnderlineOffset:3 }}>api.pmaxis.trade/signup</a> — no credit card, key issued instantly.
                </div>
              </div>
            </div>

            {/* Step 2 — node (claude + npm) */}
            {(agent === "claude" || agent === "npm") && (
              <div className="step-row">
                <div className="step-num">2</div>
                <div>
                  <div className="step-title">Install Node.js 18+</div>
                  <div className="step-desc">
                    Download from <a href="https://nodejs.org" style={{ color:"var(--text)", textDecoration:"underline", textUnderlineOffset:3 }}>nodejs.org</a>. Confirm with <code style={{ fontFamily:"monospace", background:"var(--surface)", border:"1px solid var(--border)", borderRadius:4, padding:"2px 6px", fontSize:12 }}>node -v</code> in your terminal.
                  </div>
                </div>
              </div>
            )}

            {/* Step 2/3 — config */}
            <div className="step-row">
              <div className="step-num">{agent === "claude" ? 3 : 2}</div>
              <div style={{ flex:1 }}>
                <div className="step-title">
                  {note.path ? `Add to ${note.path}` : "Connect via SDK"}
                </div>
                <div className="step-desc" style={{ marginBottom:14 }}>
                  {(agent === "claude" || agent === "npm")
                    ? <>Open the file below, paste the config, replace <code style={{ fontFamily:"monospace", background:"var(--surface)", border:"1px solid var(--border)", borderRadius:4, padding:"2px 6px", fontSize:12 }}>YOUR_API_KEY</code> with your key.</>
                    : agent === "python"
                    ? "Install the MCP SDK and paste this snippet into your agent code."
                    : <>Open the config file for {activeAgent.label}, paste this block, replace <code style={{ fontFamily:"monospace", background:"var(--surface)", border:"1px solid var(--border)", borderRadius:4, padding:"2px 6px", fontSize:12 }}>YOUR_API_KEY</code>.</>
                  }
                </div>

                {/* File paths for Claude Desktop + npm */}
                {(agent === "claude" || agent === "npm") && (
                  <>
                    <div className="path-label">Windows</div>
                    <div className="path-box">{CONFIG_PATHS.windows}</div>
                    <div className="path-label">macOS</div>
                    <div className="path-box">{CONFIG_PATHS.mac}</div>
                    <div style={{ marginTop:16 }} />
                  </>
                )}

                {/* Config block */}
                <div className="config-wrap">
                  <div className="config-bar">
                    <div className="config-dots">
                      <div className="config-dot" style={{ background:"#FF5F57" }}></div>
                      <div className="config-dot" style={{ background:"#FFBD2E" }}></div>
                      <div className="config-dot" style={{ background:"#28C840" }}></div>
                    </div>
                    <span className="config-label">{note.path || "agent.py"}</span>
                    <button className="config-copy" onClick={(e) => {
                      const btn = e.currentTarget;
                      navigator.clipboard?.writeText(AGENT_CONFIGS[agent]);
                      btn.textContent = "Copied!";
                      setTimeout(() => { btn.textContent = "Copy"; }, 2000);
                    }}>Copy</button>
                  </div>
                  <pre className="config-pre">{AGENT_CONFIGS[agent]}</pre>
                </div>

                <div className="note-box">{note.note}</div>
              </div>
            </div>

            {/* Step 3/4 — restart (not python) */}
            {agent !== "python" && (
              <div className="step-row">
                <div className="step-num">{(agent === "claude" || agent === "npm") ? 4 : 3}</div>
                <div>
                  <div className="step-title">
                    {(agent === "claude" || agent === "npm") ? "Quit and reopen Claude Desktop" : `Restart ${activeAgent.label}`}
                  </div>
                  <div className="step-desc">
                    {(agent === "claude" || agent === "npm")
                      ? "Quit fully from the system tray (not just close the window). After relaunch, a hammer icon appears in the chat input — click it to confirm PMAxis tools are loaded."
                      : `Reload or restart ${activeAgent.label} after saving the config. PMAxis tools appear automatically in the agent's tool list.`
                    }
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <hr className="mcp-divider" />

        {/* ── PROMPTS ── */}
        <div className="mcp-section-surf">
          <div className="mcp-section">
            <h2 className="mcp-h2">What to ask</h2>
            <p className="mcp-sub">
              Once connected, ask naturally. Your agent picks the right tools automatically.
            </p>
            <div>
              {PROMPTS.map((p, i) => (
                <div key={i} className="prompt-item">
                  <span className="prompt-arrow">›</span>
                  <span className="prompt-text">{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <hr className="mcp-divider" />

        {/* ── TOOLS ── */}
        <div className="mcp-section">
          <h2 className="mcp-h2">34 tools, live data</h2>
          <p className="mcp-sub">Every tool calls the PMAxis REST API in real time. No stale data.</p>
          {TOOL_GROUPS.map(group => (
            <div key={group.label}>
              <div className="tool-group-label">{group.label}</div>
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
        </div>

        {/* ── CTA ── */}
        <div className="mcp-cta-dark">
          <div className="mcp-cta-inner">
            <h2 className="mcp-cta-h2">
              Ready to <span className="mcp-grad-text">start?</span>
            </h2>
            <p className="mcp-cta-sub">Free API key. No credit card. All 34 tools on the free tier.</p>
            <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
              <a href={`${API_URL}/signup`} className="mcp-hero-cta">Get free API key</a>
              <a href={`${API_URL}/docs`} style={{ display:"inline-flex", alignItems:"center", fontSize:14, fontWeight:600, color:B.grey, padding:"13px 28px", borderRadius:6, textDecoration:"none", border:`1px solid #2a2a2a`, fontFamily:"'Space Grotesk', sans-serif", transition:"border-color 0.15s" }}>
                API reference
              </a>
            </div>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <footer style={{ borderTop:"1px solid var(--border)", background:"var(--bg)" }}>
          <div className="mcp-footer-inner">
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              {LOGO(24)}
              <span style={{ fontSize:14, fontWeight:600, color:"var(--text)", fontFamily:"'Space Grotesk', sans-serif" }}>PMAxis</span>
            </div>
            <div className="mcp-footer-links">
              {[["Docs",`${API_URL}/docs`],["Status",`${API_URL}/status`],["MCP","/mcp"],["Sign up",`${API_URL}/signup`],["Login",`${API_URL}/login`]].map(([l,h])=>(
                <a key={l} href={h} style={{ fontSize:12, color:"var(--muted)", textDecoration:"none", fontFamily:"'Space Grotesk', sans-serif" }}>{l}</a>
              ))}
            </div>
            <div style={{ fontSize:12, color:"var(--muted)", fontFamily:"'Space Grotesk', sans-serif" }}>© 2026 PMAxis. All rights reserved.</div>
          </div>
        </footer>

      </div>
    </>
  );
}
