import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata = {
  title: "Pythonia - Gamified 28-Day RPG Python Bootcamp",
  description: "Master Python programming in an epic 28-day RPG video game adventure with character archetypes, daily sub-quests, mini-bosses, and weekly dungeon boss battles."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&family=Pixelify+Sans:wght@400;500;600;700&family=Press+Start+2P&family=VT323&display=swap" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js" async defer></script>
      </head>
      <body className="min-h-screen bg-[#070d18] text-slate-100 font-sans antialiased selection:bg-emerald-400 selection:text-slate-950">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
