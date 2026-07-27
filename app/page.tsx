"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ARCHETYPES, Archetype } from "@/lib/db/models";
import { ContextCloud } from "@/components/ContextCloud";

export default function LandingPage() {
  const router = useRouter();
  const archetypesList = Object.values(ARCHETYPES);

  // Interactive Battle Simulator state
  const [bossHp, setBossHp] = useState(500);
  const [maxBossHp] = useState(500);
  const [heroHp] = useState(120);
  const [heroMp, setHeroMp] = useState(50);
  const [spellCode, setSpellCode] = useState(
    '# Cast Python Spell\ndef cast_spell(hero, target):\n    damage = 150\n    target["hp"] -= damage\n    hero["mp"] -= 15\n    return f"🔥 Spell landed for {damage} CRIT damage!"\n\nprint(cast_spell(hero, boss))'
  );
  const [terminalLog, setTerminalLog] = useState<string[]>([
    "System ready. Pyodide 3.11 engine online.",
    "Dragon Boss [Pydragon] approaches!",
    "Enter Python code below to attack..."
  ]);
  const [isCasting, setIsCasting] = useState(false);
  const [spellEffect, setSpellEffect] = useState(false);

  // Curriculum active week state
  const [activeWeek, setActiveWeek] = useState(1);

  // Login form state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const cached = localStorage.getItem("py_hero_user");
    if (cached) {
      try {
        setCurrentUser(JSON.parse(cached));
      } catch (e) {}
    }
  }, []);

  const handleCastSpell = () => {
    if (heroMp < 15) {
      setTerminalLog((prev) => [...prev, "❌ Not enough Mana! Need 15 MP."]);
      return;
    }
    setIsCasting(true);
    setSpellEffect(true);
    setTimeout(() => {
      const damage = Math.floor(Math.random() * 50) + 120;
      const newHp = Math.max(0, bossHp - damage);
      setBossHp(newHp);
      setHeroMp((prev) => Math.max(0, prev - 15));
      setTerminalLog((prev) => [
        ...prev,
        `> EXEC: cast_spell() -> Dealt ${damage} CRIT Damage!`,
        newHp === 0 ? "🏆 BOSS DEFEATED! +500 XP AWARDED!" : `[BOSS STATUS] Pydragon HP: ${newHp}/${maxBossHp}`
      ]);
      setIsCasting(false);
      setTimeout(() => setSpellEffect(false), 800);
    }, 400);
  };

  const handleResetBoss = () => {
    setBossHp(500);
    setHeroMp(50);
    setTerminalLog((prev) => [...prev, "✨ Boss reset! Pydragon restored to full 500 HP."]);
  };

  const handleInlineLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();

      if (!res.ok) {
        setLoginError(data.error || "Invalid username or password");
        setLoginLoading(false);
        return;
      }

      localStorage.setItem("py_hero_user", JSON.stringify(data.user));
      setCurrentUser(data.user);
      router.push("/dashboard");
    } catch (err: any) {
      setLoginError(err.message || "Network error. Please try again.");
      setLoginLoading(false);
    }
  };

  const curriculumWeeks = [
    {
      week: 1,
      title: "Syntax & Control Flow",
      subtitle: "Floor 1 — Awakening of Syntaxia",
      color: "cyan",
      boss: "Syntaxius (Day 7)",
      project: "Interactive CLI RPG Combat Engine",
      topics: [
        "Variables, Data Types & Print Formatting",
        "Arithmetic Operators & Expressions",
        "String Manipulation & F-Strings",
        "Booleans & Conditional Branching (if/elif/else)",
        "For Loops & Range Iteration",
        "Input Gathering & Type Conversions"
      ]
    },
    {
      week: 2,
      title: "Data Structures & Logic",
      subtitle: "Floor 2 — The Data Caverns",
      color: "emerald",
      boss: "Algorithma (Day 14)",
      project: "Hero Inventory & Spellbook Manager",
      topics: [
        "Lists & Indexing Operations",
        "Dictionaries (Key-Value Pair Inventories)",
        "Tuples & Set Operations",
        "While Loops & Control Flow (break/continue)",
        "Custom Function Definitions & Return Values",
        "Flexible Parameters (*args & **kwargs)"
      ]
    },
    {
      week: 3,
      title: "OOP & Persistence",
      subtitle: "Floor 3 — The Object-Oriented Citadel",
      color: "purple",
      boss: "Iron Colossus (Day 21)",
      project: "Dungeon Crawler Engine with Save Files",
      topics: [
        "Classes & Object Instantiation",
        "Instance Attributes & Constructor (__init__)",
        "Inheritance & Class Polymorphism",
        "Magic Dunder Methods (__str__, __len__, __eq__)",
        "File I/O (Reading & Writing Save State JSON)",
        "Robust Error Handling (try / except / finally)"
      ]
    },
    {
      week: 4,
      title: "Real-World Sorcery & Pygame",
      subtitle: "Floor 4 — The Code Sovereign Realm",
      color: "amber",
      boss: "Malakor (Day 28 Final Boss)",
      project: "Retro Arcade Video Game & Live Weather API",
      topics: [
        "Virtual Environments & PIP Package Management",
        "Fetching Live Data with REST APIs & Requests",
        "Data Wrangling with Pandas & NumPy DataFrames",
        "Terminal UI Styling with Rich Library",
        "Pygame Sprite Graphics, Movement & Collision Loops",
        "Packaging Standalone Python Executables"
      ]
    }
  ];

  const selectedCurriculum = curriculumWeeks.find((w) => w.week === activeWeek)!;

  return (
    <main className="relative min-h-screen bg-[#070d18] text-slate-100 selection:bg-emerald-500 selection:text-slate-950">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -z-10 h-[700px] w-[1100px] -translate-x-1/2 rounded-full bg-gradient-to-b from-emerald-600/20 via-purple-900/15 to-transparent blur-[140px] animate-pulse-glow" />

      {/* TOP RETRO NAV & HERO EMBLEM */}
      <section className="mx-auto max-w-6xl px-4 pt-8 pb-12 text-center">
        
        {/* RETRO BANNER / EMBLEM HEADER */}
        <div className="mx-auto max-w-3xl rounded-xl border-4 border-amber-400 bg-gradient-to-r from-[#170a36] via-[#10072b] to-[#170a36] p-4 shadow-[0_0_35px_rgba(34,197,94,0.35),inset_0_0_15px_rgba(245,158,11,0.25)]">
          <div className="flex items-center justify-center gap-3">
            <span className="text-3xl sm:text-5xl animate-bounce">🐍</span>
            <div className="text-center">
              <p className="font-retro text-[10px] sm:text-xs text-emerald-400 tracking-widest uppercase pixel-text-shadow-green">
                — AN EPIC 28-DAY RPG BOOTCAMP —
              </p>
              <h1 className="font-pixel text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-wider text-amber-400 pixel-text-shadow-gold uppercase my-1">
                ADVENTURES IN PYTHONIA
              </h1>
            </div>
            <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-lg border-2 border-emerald-400 bg-emerald-950/80 text-2xl shadow-[0_0_12px_rgba(34,197,94,0.6)]">
              🐲
            </div>
          </div>
        </div>

        {/* HERO TAGLINE */}
        <p className="mx-auto mt-6 max-w-2xl font-sans text-base sm:text-xl font-medium text-slate-200 leading-relaxed">
          Master Python programming by playing an epic <span className="font-extrabold text-amber-300 underline decoration-amber-400 underline-offset-4">28-day RPG video game</span>! Slay code monsters, conquer weekly bosses, and level up your developer stats.
        </p>

        {/* TOP QUICK ACTION BUTTONS */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="/create-character"
            className="rounded-lg border-2 border-emerald-400 bg-emerald-600 px-8 py-4 font-sans text-lg font-extrabold text-slate-950 shadow-[4px_4px_0px_#000000,0_0_20px_rgba(34,197,94,0.4)] transition hover:scale-105 hover:bg-emerald-500 active:translate-y-1 active:shadow-none"
          >
            ⚔️ Start Playing Now (Guest Mode)
          </a>
          <a
            href="/auth/signup"
            className="rounded-lg border-2 border-purple-400 bg-purple-900/90 px-7 py-4 font-sans text-lg font-bold text-purple-100 shadow-[4px_4px_0px_#000000,0_0_15px_rgba(168,85,247,0.3)] transition hover:scale-105 hover:border-emerald-400 hover:text-emerald-300"
          >
            ☁️ Save Progress Online (Sign Up)
          </a>
          <a
            href="#download-section"
            className="flex items-center gap-2 rounded-lg border-2 border-slate-700 bg-[#12092b] px-7 py-4 font-sans text-lg font-bold text-purple-200 shadow-[4px_4px_0px_#000000] transition hover:scale-105 hover:border-slate-500 hover:text-white"
          >
            <span>💻 Download Desktop Game</span>
          </a>
          <a
            href="#login-section"
            className="rounded-lg border-2 border-amber-400/80 bg-amber-500/20 px-6 py-4 font-sans text-lg font-bold text-amber-300 shadow-[4px_4px_0px_#000000] transition hover:bg-amber-500 hover:text-slate-950"
          >
            🔑 Log In
          </a>
        </div>

        {/* GREEN PIXEL ART BATTLEFIELD & INTERACTIVE SPELL SIMULATOR */}
        <div className="relative mx-auto mt-12 max-w-4xl overflow-hidden rounded-2xl border-4 border-emerald-500/80 bg-[#091512] shadow-[0_0_40px_rgba(34,197,94,0.3)]">
          
          {/* Battle Scene Landscape Backdrop */}
          <div className="relative h-[320px] sm:h-[380px] w-full bg-gradient-to-b from-[#090616] via-[#111e19] to-[#142e1f] text-left flex flex-col justify-between overflow-hidden">
            
            {/* Stars & Pixel Moon */}
            <div className="absolute top-4 left-6 text-2xl opacity-90">🌙</div>
            <div className="absolute top-5 left-24 text-xs text-amber-200/70 font-retro">✨ . ✦</div>
            <div className="absolute top-8 right-32 text-xs text-emerald-300/60 font-retro">✦ . ✨</div>

            {/* Distant Castle & Purple Mountains */}
            <div className="absolute top-10 inset-x-0 h-32 flex justify-center opacity-40 pointer-events-none">
              <span className="text-6xl">🏰</span>
            </div>

            {/* Middle Ground: Grassy Pixel Trees */}
            <div className="absolute bottom-24 inset-x-0 h-28 flex justify-between items-end px-4 pointer-events-none opacity-90">
              <div className="text-3xl text-emerald-600 space-x-1">🌲🌲🌲</div>
              <div className="text-3xl text-emerald-600 space-x-1">🌲🌲</div>
            </div>

            {/* Foreground Grassy Dirt Path */}
            <div className="absolute bottom-20 inset-x-0 h-10 bg-gradient-to-r from-emerald-800 via-green-700 to-emerald-800 border-t-4 border-emerald-400 shadow-inner" />

            {/* SPELL ANIMATION BEAM */}
            {spellEffect && (
              <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                <div className="text-4xl sm:text-6xl animate-ping text-amber-400 font-bold">
                  💥 CRIT DAMAGE! 💥
                </div>
              </div>
            )}

            {/* BATTLE ENTITIES (HERO vs DRAGON IN DIRECT COMBAT) */}
            <div className="relative z-10 flex justify-between items-end h-[240px] sm:h-[280px] pb-24 px-6 sm:px-12">
              
              {/* Left Side: Python Hero */}
              <div className="flex flex-col items-center group">
                <div className="rounded bg-cyan-950/90 border border-cyan-400 px-2.5 py-1 font-retro text-[9px] text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.6)] mb-2 animate-pulse">
                  ✨ HERO READY
                </div>
                <div className={`text-5xl sm:text-7xl filter drop-shadow-[0_0_15px_rgba(6,182,212,0.9)] hover:scale-110 transition-transform ${isCasting ? 'animate-bounce' : ''}`}>
                  🛡️⚔️
                </div>
                <span className="mt-1 font-retro text-[10px] sm:text-xs text-cyan-300 font-bold bg-slate-950/80 px-2 py-0.5 rounded border border-cyan-500/40">
                  PYTHON HERO
                </span>
              </div>

              {/* Center Spell Energy Attack Line */}
              <div className="flex flex-col items-center justify-center space-y-1 mb-8">
                <div className="font-retro text-[10px] sm:text-xs text-amber-300 animate-bounce bg-slate-950/80 px-2 py-1 rounded border border-amber-400">
                  {spellEffect ? "💥 CRIT -150 HP!" : "⚡ RUN PYTHON SPELL"}
                </div>
                <div className="font-retro text-sm sm:text-xl text-cyan-300 animate-pulse tracking-widest">
                  ═══ ⚡ ═══►
                </div>
              </div>

              {/* Right Side: Dragon Boss */}
              <div className="flex flex-col items-center group">
                <div className="rounded bg-rose-950/90 border border-rose-500 px-2.5 py-1 font-retro text-[9px] text-rose-300 shadow-[0_0_10px_rgba(244,63,94,0.6)] mb-2">
                  🐉 BOSS: PYDRAGON
                </div>
                <div className={`text-5xl sm:text-7xl filter drop-shadow-[0_0_20px_rgba(34,197,94,0.9)] hover:scale-110 transition-transform ${bossHp === 0 ? 'opacity-30 scale-75' : ''}`}>
                  🐲🔥
                </div>
                <span className="mt-1 font-retro text-[10px] sm:text-xs text-emerald-400 font-bold bg-slate-950/80 px-2 py-0.5 rounded border border-emerald-500/40">
                  SYNTAX BEAST
                </span>
              </div>
            </div>

            {/* Bottom HUD Box & Health Bars */}
            <div className="absolute inset-x-0 bottom-0 border-t-4 border-emerald-500/60 bg-[#050c09]/95 p-3 sm:p-4 backdrop-blur-md">
              <div className="grid sm:grid-cols-2 gap-4 items-center">
                
                {/* Hero Health / Mana */}
                <div>
                  <div className="flex justify-between font-retro text-[10px] text-cyan-300 mb-1">
                    <span>HERO HP: {heroHp}/120</span>
                    <span>MP: {heroMp}/50</span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-slate-900 overflow-hidden border border-cyan-500/50">
                    <div className="h-full bg-cyan-400 w-full transition-all duration-300" />
                  </div>
                </div>

                {/* Boss Health Bar */}
                <div>
                  <div className="flex justify-between font-retro text-[10px] text-rose-300 mb-1">
                    <span>PYDRAGON HP</span>
                    <span>{bossHp} / {maxBossHp}</span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-slate-900 overflow-hidden border border-rose-500/50">
                    <div
                      className="h-full bg-gradient-to-r from-rose-500 to-amber-400 transition-all duration-300"
                      style={{ width: `${(bossHp / maxBossHp) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* INTERACTIVE CODE PLAYGROUND CONTROL PANEL */}
          <div className="border-t-4 border-emerald-500/60 bg-[#050c09] p-4 text-left font-mono">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-emerald-900/60">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-retro text-xs text-emerald-300">Try Python Spell Execution</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleCastSpell}
                  disabled={isCasting || bossHp === 0}
                  className="rounded border border-amber-400 bg-amber-500 px-4 py-1.5 font-retro text-xs font-bold text-slate-950 shadow-[2px_2px_0px_#000] hover:bg-amber-400 transition disabled:opacity-50"
                >
                  {isCasting ? "⚡ CASTING..." : "⚡ RUN SPELL CODE"}
                </button>
                {bossHp === 0 && (
                  <button
                    onClick={handleResetBoss}
                    className="rounded border border-purple-400 bg-purple-950 px-3 py-1.5 font-retro text-xs font-bold text-purple-200 hover:bg-purple-900 transition"
                  >
                    🔄 Revive Boss
                  </button>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-3">
              {/* Python Code Input */}
              <div className="rounded-lg border border-slate-800 bg-[#020605] p-3">
                <div className="text-[10px] font-retro text-slate-400 mb-1">main.py</div>
                <textarea
                  value={spellCode}
                  onChange={(e) => setSpellCode(e.target.value)}
                  className="w-full h-28 bg-transparent text-xs text-emerald-300 font-mono focus:outline-none resize-none"
                />
              </div>

              {/* Execution Console Output */}
              <div className="rounded-lg border border-slate-800 bg-[#020605] p-3 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-retro text-slate-400 mb-1">Terminal Console</div>
                  <div className="space-y-1 text-xs font-mono max-h-24 overflow-y-auto">
                    {terminalLog.map((log, i) => (
                      <div
                        key={i}
                        className={
                          log.includes("CRIT")
                            ? "text-amber-300 font-bold"
                            : log.includes("DEFEATED")
                            ? "text-purple-300 font-extrabold"
                            : "text-slate-300"
                        }
                      >
                        {log}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* SECTION 1: WHAT WILL BE LEARNED (CURRICULUM & SYLLABUS) */}
      <section id="curriculum-section" className="border-t-2 border-emerald-900/60 bg-[#09121d] py-20 scroll-mt-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <span className="font-retro text-xs font-bold uppercase tracking-widest text-emerald-400">
              28-Day Python RPG Syllabus
            </span>
            <h2 className="mt-2 font-pixel text-3xl sm:text-5xl font-extrabold text-white">
              What You Will Learn &amp; Master
            </h2>
            <p className="mt-3 mx-auto max-w-2xl font-sans text-base text-slate-300">
              From day 1 beginner variables to day 28 Object-Oriented game engines and live REST APIs. Every single day unlocks real-world Python skills through gamified sub-quests and epic boss battles.
            </p>
          </div>

          {/* Interactive Week Tabs */}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {curriculumWeeks.map((item) => {
              const isActive = activeWeek === item.week;
              return (
                <button
                  key={item.week}
                  onClick={() => setActiveWeek(item.week)}
                  className={`rounded-xl border-2 px-6 py-3 font-retro text-xs font-bold transition-all ${
                    isActive
                      ? "border-emerald-400 bg-emerald-950/90 text-emerald-300 shadow-[0_0_15px_rgba(34,197,94,0.4)] scale-105"
                      : "border-slate-800 bg-slate-900/80 text-slate-400 hover:border-slate-600 hover:text-slate-200"
                  }`}
                >
                  WEEK {item.week}: {item.title}
                </button>
              );
            })}
          </div>

          {/* Active Week Detailed Overview Card */}
          <div className="mt-8 rounded-2xl border-2 border-purple-500/70 bg-[#0c0721] p-6 sm:p-10 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-purple-900/60">
              <div>
                <span className="rounded bg-purple-950 border border-purple-400 px-3 py-1 font-retro text-xs text-purple-300">
                  WEEK {selectedCurriculum.week} OF 4
                </span>
                <h3 className="mt-3 font-pixel text-2xl sm:text-4xl font-bold text-amber-300">
                  {selectedCurriculum.subtitle}
                </h3>
                <p className="text-sm font-sans text-slate-300 mt-1">Focus Area: {selectedCurriculum.title}</p>
              </div>

              <div className="rounded-xl border-2 border-rose-500/60 bg-rose-950/60 p-4 text-left">
                <div className="font-retro text-[10px] text-rose-300 uppercase">👑 Weekly Dungeon Boss</div>
                <div className="font-pixel text-xl font-bold text-white mt-0.5">{selectedCurriculum.boss}</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              {/* Covered Topics List */}
              <div>
                <h4 className="font-retro text-xs text-emerald-400 uppercase tracking-wider mb-4">
                  📚 Core Python Knowledge Unlocked:
                </h4>
                <ul className="space-y-3">
                  {selectedCurriculum.topics.map((topic, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm font-sans text-slate-200">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-emerald-950 text-xs font-bold text-emerald-400 border border-emerald-500/40 font-retro">
                        ✓
                      </span>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Portfolio Project Build */}
              <div className="rounded-xl border-2 border-amber-400/50 bg-[#140b2e] p-6 flex flex-col justify-between">
                <div>
                  <span className="font-retro text-[10px] text-amber-400 uppercase">🛠️ End-of-Week Capstone Project</span>
                  <h4 className="font-pixel text-2xl font-bold text-white mt-1">{selectedCurriculum.project}</h4>
                  <p className="mt-3 text-xs font-sans text-slate-300 leading-relaxed">
                    Build a complete, standalone Python project from scratch using the week's concepts. Add it directly to your portfolio save file!
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-purple-900/60 pt-4 text-xs font-retro text-cyan-300">
                  <span>Daily Quests: 7 Days</span>
                  <span>XP Reward: +2,500 XP</span>
                </div>
              </div>
            </div>
          </div>

          {/* Gamification Features Grid */}
          <div className="mt-16 grid gap-6 sm:grid-cols-3 text-left">
            <div className="pixel-card rounded-xl p-6">
              <span className="text-4xl">🎯</span>
              <h3 className="mt-3 font-pixel text-xl font-bold text-amber-300">Daily Sub-Quests</h3>
              <p className="mt-2 font-sans text-sm text-slate-300 leading-relaxed">
                2-3 bite-sized side quests per day with interactive WebAssembly Python editor and instant combat feedback.
              </p>
            </div>
            <div className="pixel-card rounded-xl p-6">
              <span className="text-4xl">👹</span>
              <h3 className="mt-3 font-pixel text-xl font-bold text-emerald-300">Daily Mini-Bosses</h3>
              <p className="mt-2 font-sans text-sm text-slate-300 leading-relaxed">
                Synthesize that day's lessons into a real code attack to defeat daily monsters and claim bonus XP rewards.
              </p>
            </div>
            <div className="pixel-card rounded-xl p-6">
              <span className="text-4xl">🐲</span>
              <h3 className="mt-3 font-pixel text-xl font-bold text-purple-300">Weekly Boss Dungeons</h3>
              <p className="mt-2 font-sans text-sm text-slate-300 leading-relaxed">
                Every 7 days, no side quests! Battle multi-phase epic Weekly Bosses (Days 7, 14, 21, 28) for trophy badges.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* SECTION 2: ARCHETYPE SPECIALIZATION PATHS (spec section) */}
      <section className="py-20 bg-[#060b15] border-t-2 border-slate-900">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <span className="font-retro text-xs font-bold uppercase tracking-widest text-purple-400">
              2. Archetype Specialization Paths
            </span>
            <h2 className="mt-2 font-pixel text-3xl sm:text-5xl font-extrabold text-white">
              Choose Your Dungeon Path
            </h2>
            <p className="mt-3 mx-auto max-w-2xl font-sans text-sm text-slate-300">
              Dungeons are procedurally tailored to match your selected specialization archetype. Your chosen path shapes obstacle types, code challenges, and end-game capstone projects.
            </p>
          </div>

          {/* 4 Highlighted Spec Archetypes */}
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {[
              {
                id: 'wizard',
                color: 'cyan',
                borderColor: 'border-cyan-500/50',
                bgColor: 'bg-cyan-950/30',
                labelColor: 'text-cyan-400',
                icon: '🧙‍♂️',
                name: 'Wizard — AI & Generative Reasoning',
                description: 'Focuses on logic gate puzzles and semantic text processing. Mid-game challenges involve writing structured prompts or parsing response strings using local SLM interfaces.',
                exampleCode: "classify(prompt) -> 'attack' | 'defend'"
              },
              {
                id: 'rogue',
                color: 'rose',
                borderColor: 'border-rose-500/50',
                bgColor: 'bg-rose-950/30',
                labelColor: 'text-rose-400',
                icon: '🗡️',
                name: 'Rogue — Offensive Security & PenTesting',
                description: 'Focuses on decoding locks, regex matching, and payload creation. Challenges include intercepting mock network packet lists and extracting auth tokens via string slicing.',
                exampleCode: "token = packet[8:24].decode('utf-8')"
              },
              {
                id: 'warrior',
                color: 'emerald',
                borderColor: 'border-emerald-500/50',
                bgColor: 'bg-emerald-950/30',
                labelColor: 'text-emerald-400',
                icon: '⚔️',
                name: 'Warrior — Data Science & Matrix Operations',
                description: 'Focuses on horde management (large dataset filtering). Challenges require list comprehensions and array operations to filter active threats.',
                exampleCode: "[e for e in enemies if e.is_active]"
              },
              {
                id: 'healer',
                color: 'amber',
                borderColor: 'border-amber-500/50',
                bgColor: 'bg-amber-950/30',
                labelColor: 'text-amber-400',
                icon: '🛡️',
                name: 'Healer — Defensive Security & Threat Hunting',
                description: 'Focuses on error handling, log parsing, and state protection. Challenges heavily feature try/except blocks to neutralize runtime exceptions and corruption loops.',
                exampleCode: "try:\n    secure_connect()\nexcept RuntimeError:\n    log_threat()"
              }
            ].map((arch) => (
              <div
                key={arch.id}
                className={`rounded-xl border-2 ${arch.borderColor} ${arch.bgColor} p-6`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{arch.icon}</span>
                  <h3 className={`font-pixel text-lg font-bold ${arch.labelColor}`}>{arch.name}</h3>
                </div>
                <p className="font-sans text-sm text-slate-300 leading-relaxed">{arch.description}</p>
                <div className="mt-4 rounded-lg bg-[#020608] border border-slate-800 px-3 py-2 font-mono text-xs text-cyan-300">
                  <span className="text-slate-500"># Example challenge: </span>
                  <pre className="mt-0.5 whitespace-pre-wrap">{arch.exampleCode}</pre>
                </div>
              </div>
            ))}
          </div>

          {/* Additional 3 archetypes (Trickster, Ranger, Tank) */}
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {(['trickster', 'ranger', 'tank'] as Archetype[]).map((id) => {
              const a = ARCHETYPES[id];
              return (
                <div key={id} className="rounded-xl border-2 border-slate-700/50 bg-slate-900/40 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{a.icon}</span>
                    <h3 className="font-pixel text-sm font-bold text-slate-200">{a.name} — {a.focusArea}</h3>
                  </div>
                  <p className="font-sans text-xs text-slate-400 leading-relaxed">{a.description}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <a
              href="/create-character"
              className="inline-block rounded-xl border-2 border-amber-400 bg-amber-500 px-10 py-4 font-retro text-xs font-bold text-slate-950 shadow-[4px_4px_0px_#000000,0_0_20px_rgba(245,158,11,0.4)] transition hover:scale-105 hover:bg-amber-400"
            >
              ⚡ Choose Your Specialization Path
            </a>
          </div>
        </div>
      </section>


      {/* SECTION 3: 7 CHARACTER ARCHETYPES SHOWCASE */}
      <section className="py-20 bg-[#070d18]">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <span className="font-retro text-xs font-bold uppercase tracking-widest text-emerald-400">
              7 Hero Specializations
            </span>
            <h2 className="mt-2 font-pixel text-3xl sm:text-5xl font-extrabold text-white">
              Choose Your Character Archetype
            </h2>
            <p className="mt-2 font-sans text-sm text-slate-300">
              Tailors your storyline, code tasks, starter tools, and late-game projects!
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {archetypesList.map((item) => (
              <div
                key={item.id}
                className="pixel-card flex flex-col justify-between rounded-xl p-5"
              >
                <div>
                  <span className="text-4xl">{item.icon}</span>
                  <h3 className="mt-3 font-pixel text-xl font-bold text-amber-300">{item.name}</h3>
                  <span className="font-retro text-[10px] text-emerald-400 block mt-1">{item.focusArea}</span>
                  <p className="mt-2 font-sans text-xs text-slate-300 leading-relaxed">{item.description}</p>
                </div>
                <div className="mt-4 rounded-lg bg-[#070312] p-2.5 font-retro text-[10px] text-cyan-300 border border-purple-900">
                  ⚡ {item.traitBonus}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* SECTION 3: DOWNLOAD GAME DESKTOP APPLICATION */}
      <section id="download-section" className="mx-auto max-w-6xl px-4 py-16 scroll-mt-12">
        <div className="rounded-2xl border-4 border-emerald-500/70 bg-gradient-to-br from-[#0c1c14] via-[#0f1524] to-[#070d18] p-8 shadow-[0_0_35px_rgba(34,197,94,0.25)] md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            
            <div className="space-y-4 text-center md:text-left max-w-xl">
              <span className="inline-block rounded border-2 border-emerald-400 bg-emerald-950/80 px-3 py-1 font-retro text-[10px] text-emerald-300 tracking-wider">
                100% OFFLINE PLAYABLE • ZERO WI-FI NEEDED
              </span>
              <h2 className="font-pixel text-3xl sm:text-5xl font-extrabold text-amber-300 pixel-text-shadow-gold">
                Download Pythonia Desktop Edition
              </h2>
              <p className="font-sans text-base text-slate-200 leading-relaxed">
                Get the standalone portable game executable for Windows, macOS, or Linux. Play the full 28-day RPG campaign anywhere without requiring an internet connection!
              </p>

              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400 pt-2">
                <span className="rounded bg-slate-900 border border-slate-700 px-2.5 py-1">📦 Size: ~85 MB</span>
                <span className="rounded bg-slate-900 border border-slate-700 px-2.5 py-1">⚡ Engine: Pyodide 3.11</span>
                <span className="rounded bg-slate-900 border border-slate-700 px-2.5 py-1">🎮 Version v1.0.0</span>
              </div>
            </div>

            {/* Download Buttons Stack */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-4 w-full md:w-auto">
              <a
                href="https://github.com/Tormento416/AdventuresInPythonia/releases/latest"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-3 rounded-xl border-2 border-emerald-400 bg-emerald-600 px-8 py-4 font-sans text-sm font-bold text-slate-950 shadow-[4px_4px_0px_#000000] transition hover:bg-emerald-500 hover:scale-105"
              >
                <span className="text-3xl">🪟</span>
                <div className="text-left">
                  <div className="leading-tight text-base font-extrabold">Windows .EXE</div>
                  <div className="text-[11px] font-mono text-slate-950">Portable &amp; Installer (64-Bit)</div>
                </div>
              </a>

              <a
                href="https://github.com/Tormento416/AdventuresInPythonia/releases/latest"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-3 rounded-xl border-2 border-purple-400 bg-[#1a0e3d] px-8 py-4 font-sans text-sm font-bold text-white shadow-[4px_4px_0px_#000000] transition hover:border-emerald-400 hover:scale-105"
              >
                <span className="text-3xl">🍎</span>
                <div className="text-left">
                  <div className="leading-tight text-base font-extrabold">macOS .DMG</div>
                  <div className="text-[11px] font-mono text-purple-300">Apple Silicon &amp; Intel</div>
                </div>
              </a>

              <a
                href="https://github.com/Tormento416/AdventuresInPythonia/releases/latest"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-3 rounded-xl border-2 border-slate-700 bg-slate-900 px-8 py-3 font-sans text-sm font-bold text-slate-300 shadow-[3px_3px_0px_#000000] transition hover:border-slate-500 hover:text-white"
              >
                <span className="text-2xl">🐧</span>
                <div className="text-left">
                  <div className="leading-tight text-sm font-bold">Linux Source / AppImage</div>
                </div>
              </a>
            </div>

          </div>
        </div>
      </section>


      {/* SECTION 4: INLINE LOGIN PORTAL */}
      <section id="login-section" className="py-20 bg-[#060a12] border-t-2 border-slate-800 scroll-mt-12">
        <div className="mx-auto max-w-4xl px-4">
          <div className="text-center">
            <span className="font-retro text-xs font-bold uppercase tracking-widest text-amber-400">
              Hero Save File Portal
            </span>
            <h2 className="mt-2 font-pixel text-3xl sm:text-5xl font-extrabold text-white">
              Log In &amp; Resume Journey
            </h2>
            <p className="mt-2 font-sans text-sm text-slate-300">
              Access your quest map, character stats, inventory loot, and weekly boss progress!
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-md pixel-card rounded-2xl p-8 border-2 border-purple-500/80 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
            
            {currentUser ? (
              <div className="text-center space-y-4">
                <span className="text-5xl">⚔️</span>
                <h3 className="font-pixel text-2xl text-amber-300">Welcome Back, {currentUser.displayName || currentUser.username}!</h3>
                <p className="text-xs font-sans text-slate-300">
                  Level {currentUser.level || 1} Hero • Current Day: {currentUser.currentDay || 1}
                </p>
                <a
                  href="/dashboard"
                  className="block w-full rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 py-3.5 font-retro text-xs font-extrabold text-slate-950 shadow-lg hover:scale-105 transition"
                >
                  🚀 Enter Game Dashboard
                </a>
              </div>
            ) : (
              <form onSubmit={handleInlineLogin} className="space-y-5">
                <div className="text-center">
                  <span className="text-4xl">🔑</span>
                  <h3 className="mt-2 font-pixel text-2xl text-white">Hero Authentication</h3>
                </div>

                {loginError && (
                  <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 p-3 text-xs font-semibold text-rose-300">
                    ⚠️ {loginError}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-300 font-retro">Username</label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none font-mono"
                    placeholder="e.g. shadow_coder"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 font-retro">Password</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none font-mono"
                    placeholder="••••••••"
                  />
                </div>

                <button
                  disabled={loginLoading}
                  type="submit"
                  className="w-full rounded-xl border-2 border-emerald-400 bg-emerald-600 py-3.5 font-retro text-xs font-extrabold text-slate-950 shadow-[3px_3px_0px_#000] hover:bg-emerald-500 hover:scale-[1.02] transition disabled:opacity-50"
                >
                  {loginLoading ? "Authenticating..." : "⚔️ LOG IN & ENTER REALM"}
                </button>

                <div className="pt-2 text-center text-xs text-slate-400 font-sans">
                  Don't have a hero account yet?{" "}
                  <a href="/auth/signup" className="font-bold text-amber-300 hover:underline">
                    Create Character Here
                  </a>
                </div>
              </form>
            )}

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 bg-[#040810] py-8 text-center text-xs text-slate-500 font-mono">
        <p>© 2026 Adventures in Pythonia • Gamified 28-Day RPG Python Bootcamp</p>
      </footer>

      {/* Context Cloud — persistent floating companion */}
      <ContextCloud currentDay={1} />
    </main>
  );
}
