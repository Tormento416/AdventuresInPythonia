"use client";

import { useEffect, useState } from "react";
import { ARCHETYPES, Archetype } from "@/lib/db/models";

export function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const cached = localStorage.getItem("py_hero_user");
    if (cached) {
      try {
        setUser(JSON.parse(cached));
      } catch (e) {}
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("py_hero_user");
    document.cookie = "py_user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/";
  };

  const archetypeInfo = user?.archetype ? ARCHETYPES[user.archetype as Archetype] : null;
  const isGuest = !user || user?.isGuest || (user?.id && user.id.startsWith("guest_"));

  return (
    <header className="sticky top-0 z-50 border-b-2 border-[#3b1e6e] bg-[#0a0518]/90 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        {/* LOGO ALWAYS GOES TO LANDING PAGE FIRST */}
        <a href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-tr from-purple-700 via-purple-600 to-emerald-500 border-2 border-emerald-400 text-xl text-white shadow-[0_0_10px_rgba(34,197,94,0.4)] group-hover:scale-105 transition-transform">
            🐍
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-pixel font-bold text-xl tracking-wider text-amber-400 pixel-text-shadow-gold">PYTHONIA</span>
              <span className="rounded bg-emerald-500/20 border border-emerald-400/50 px-1.5 py-0.5 font-retro text-[9px] text-emerald-300">RPG</span>
            </div>
            <p className="text-[10px] font-pixel text-purple-300 tracking-wider">28-DAY CODING ADVENTURE</p>
          </div>
        </a>

        {user && !isGuest ? (
          /* Cloud Authenticated User */
          <div className="flex items-center gap-4">
            <a href="/quests" className="font-pixel text-sm font-semibold text-slate-300 hover:text-emerald-300 transition-colors">
              📜 Quest Map
            </a>
            <a href="/dashboard" className="flex items-center gap-2 rounded-md border-2 border-purple-500/60 bg-[#160b33] px-3 py-1.5 font-pixel text-xs text-purple-200 hover:border-emerald-400 hover:text-emerald-300 shadow-[0_0_10px_rgba(168,85,247,0.2)] transition">
              <span>{archetypeInfo?.icon || "⚔️"}</span>
              <span>Lvl {user.level || 1} {user.displayName || user.username}</span>
              {archetypeInfo && <span className="text-amber-400">({archetypeInfo.name})</span>}
            </a>
            <button
              onClick={logout}
              className="font-pixel text-xs text-slate-400 hover:text-rose-400 transition-colors"
            >
              Sign Out
            </button>
          </div>
        ) : (
          /* Guest Player or Unauthenticated */
          <div className="flex items-center gap-3">
            <a href="/quests" className="font-pixel text-xs font-semibold text-cyan-300 hover:text-cyan-200 transition-colors">
              📜 Quest Map
            </a>
            <a href="/auth/login" className="font-pixel text-xs font-semibold text-slate-300 hover:text-amber-300 transition-colors">
              Log In
            </a>
            <a href="/auth/signup" className="rounded-md border border-purple-400/80 bg-purple-950/80 px-3 py-1.5 font-pixel text-xs text-purple-200 hover:border-emerald-400 hover:text-emerald-300 transition">
              ☁️ Save Online
            </a>
            <a href="/create-character" className="rounded-md border-2 border-emerald-400 bg-emerald-600 px-4 py-1.5 font-pixel text-xs font-bold text-slate-950 hover:bg-emerald-500 shadow-[2px_2px_0px_#000000,0_0_12px_rgba(34,197,94,0.4)] transition-transform hover:scale-105">
              ⚔️ Play Guest
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
