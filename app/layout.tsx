import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({ variable: "--font-serif", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "PMAxis — Prediction Market Data API",
  description: "Real-time REST API and WebSocket stream for prediction market prices, orderbooks, trades, and signals. Free tier available.",
  icons: { icon: "/loader-gif.gif" },
  openGraph: {
    title: "PMAxis — Prediction Market Data API",
    description: "Real-time prediction market data for developers.",
    url: "https://pmaxis.trade",
    siteName: "PMAxis",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/loader-gif.gif" type="image/gif" />
        {/* Apply theme before paint to avoid flash */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var m=document.cookie.match(/pmaxis-theme=(light|dark)/);var t=m?m[1]:(localStorage.getItem('pmaxis-theme')||'light');document.documentElement.setAttribute('data-theme',t);}catch(e){}})();` }} />
      </head>
      <body className="min-h-full flex flex-col" style={{background:"var(--bg)",color:"var(--text)",transition:"background 0.2s,color 0.2s"}}>
        <div id="__loader" style={{position:"fixed",inset:0,zIndex:9999,background:"var(--bg,#F7F6F3)",display:"flex",alignItems:"center",justifyContent:"center"}}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/loader-gif.gif" width={80} height={80} alt="" />
        </div>
        <script dangerouslySetInnerHTML={{ __html: `window.addEventListener('load',function(){var e=document.getElementById('__loader');if(e){e.style.transition='opacity 0.3s';e.style.opacity='0';setTimeout(function(){e.remove()},300);}});` }} />
        {children}
      </body>
    </html>
  );
}
