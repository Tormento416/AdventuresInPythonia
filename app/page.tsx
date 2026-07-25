import { ARCHETYPES } from "@/lib/db/models";

export default function LandingPage() {
  const archetypesList = Object.values(ARCHETYPES);

  return (
    <main className="relative min-h-screen bg-[#070d18] text-slate-100 selection:bg-emerald-500 selection:text-slate-950">
      {/* Background Retro Ambient Green & Purple Glow */}
      <div className="absolute top-0 left-1/2 -z-10 h-[650px] w-[1000px] -translate-x-1/2 rounded-full bg-gradient-to-b from-emerald-600/20 via-purple-900/15 to-transparent blur-[140px] animate-pulse-glow" />

      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-4 pt-8 pb-16 text-center">
        
        {/* RETRO BANNER / EMBLEM HEADER */}
        <div className="mx-auto max-w-3xl rounded-xl border-4 border-amber-400 bg-gradient-to-r from-[#170a36] via-[#10072b] to-[#170a36] p-4 shadow-[0_0_30px_rgba(34,197,94,0.35),inset_0_0_15px_rgba(245,158,11,0.25)]">
          <div className="flex items-center justify-center gap-3">
            <span className="text-3xl sm:text-4xl animate-bounce">🐍</span>
            <div className="text-center">
              <p className="font-retro text-[10px] sm:text-xs text-emerald-400 tracking-widest uppercase pixel-text-shadow-green">
                — IN —
              </p>
              <h1 className="font-pixel text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-wider text-amber-400 pixel-text-shadow-gold uppercase my-1">
                ADVENTURES IN PYTHONIA
              </h1>
            </div>
            <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-lg border-2 border-emerald-400 bg-emerald-950/80 text-2xl shadow-[0_0_12px_rgba(34,197,94,0.6)]">
              🐉
            </div>
          </div>
        </div>

        {/* GREEN PIXEL ART BATTLEFIELD & SCENE CONTAINER */}
        <div className="relative mx-auto mt-8 max-w-4xl overflow-hidden rounded-2xl border-4 border-emerald-500/80 bg-[#091512] shadow-[0_0_40px_rgba(34,197,94,0.3)]">
          
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

            {/* Middle Ground: Grassy Pixel Hills & Trees */}
            <div className="absolute bottom-24 inset-x-0 h-28 flex justify-between items-end px-4 pointer-events-none opacity-90">
              <div className="text-3xl text-emerald-600 space-x-1">🌲🌲🌲</div>
              <div className="text-3xl text-emerald-600 space-x-1">🌲🌲</div>
            </div>

            {/* Foreground Grassy Dirt Path */}
            <div className="absolute bottom-20 inset-x-0 h-10 bg-gradient-to-r from-emerald-800 via-green-700 to-emerald-800 border-t-4 border-emerald-400 shadow-inner" />

            {/* BATTLE ENTITIES (HERO vs DRAGON IN DIRECT COMBAT) */}
            <div className="relative z-10 flex justify-between items-end h-[240px] sm:h-[280px] pb-24 px-6 sm:px-12">
              
              {/* Left Side: Blue Spellcaster Knight Hero */}
              <div className="flex flex-col items-center group">
                <div className="rounded bg-cyan-950/90 border border-cyan-400 px-2.5 py-1 font-retro text-[9px] text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.6)] mb-2 animate-pulse">
                  ✨ CAST SPELL
                </div>
                <div className="text-5xl sm:text-7xl filter drop-shadow-[0_0_15px_rgba(6,182,212,0.9)] hover:scale-110 transition-transform">
                  🛡️⚔️
                </div>
                <span className="mt-1 font-retro text-[10px] sm:text-xs text-cyan-300 font-bold bg-slate-950/80 px-2 py-0.5 rounded border border-cyan-500/40">
                  PYTHON HERO
                </span>
              </div>

              {/* Center Spell Energy Attack Line */}
              <div className="flex flex-col items-center justify-center space-y-1 mb-8">
                <div className="font-retro text-[10px] sm:text-xs text-amber-300 animate-bounce bg-slate-950/80 px-2 py-1 rounded border border-amber-400">
                  💥 CRIT XP -280 HP!
                </div>
                <div className="font-retro text-sm sm:text-xl text-cyan-300 animate-pulse tracking-widest">
                  ═══ ⚡ ═══►
                </div>
              </div>

              {/* Right Side: Green Dragon Boss */}
              <div className="flex flex-col items-center group">
                <div className="rounded bg-rose-950/90 border border-rose-500 px-2.5 py-1 font-retro text-[9px] text-rose-300 shadow-[0_0_10px_rgba(244,63,94,0.6)] mb-2">
                  🐉 BOSS: PYDRAGON
                </div>
                <div className="text-5xl sm:text-7xl filter drop-shadow-[0_0_20px_rgba(34,197,94,0.9)] hover:scale-110 transition-transform">
                  🐲🔥
                </div>
                <span className="mt-1 font-retro text-[10px] sm:text-xs text-emerald-400 font-bold bg-slate-950/80 px-2 py-0.5 rounded border border-emerald-500/40">
                  SYNTAX BEAST
                </span>
              </div>
            </div>

            {/* Bottom HUD Box (Code Terminal & Badges) */}
            <div className="absolute inset-x-0 bottom-0 border-t-4 border-emerald-500/60 bg-[#050c09]/95 p-3 sm:p-4 backdrop-blur-md">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-xs text-slate-200">
                
                {/* Code Terminal Output */}
                <div className="space-y-0.5 text-left font-mono text-xs sm:text-sm">
                  <div className="text-purple-300">if cast_spell(hero):</div>
                  <div className="text-slate-400 pl-3">target.hp -= power</div>
                  <div className="text-emerald-400 font-bold flex items-center gap-1">
                    <span>&gt; pythonia.level.1.start()</span>
                    <span className="h-4 w-2 bg-emerald-400 animate-pulse" />
                  </div>
                </div>

                {/* Badges */}
                <div className="flex items-center gap-2">
                  <div className="rounded border-2 border-purple-500 bg-purple-950/90 px-3 py-1 font-retro text-xs text-purple-200 shadow-[0_0_10px_rgba(168,85,247,0.4)]">
                    Step 1
                  </div>
                  <div className="rounded border-2 border-emerald-400 bg-emerald-950/90 px-3 py-1 font-retro text-xs text-emerald-300 shadow-[0_0_10px_rgba(34,197,94,0.5)]">
                    BEGINNER
                  </div>
                </div>
              </div>

              {/* Status Bar */}
              <div className="mt-2 flex justify-between border-t border-emerald-900/60 pt-2 font-retro text-[9px] text-slate-400">
                <div className="flex gap-4">
                  <span className="text-emerald-400">HERO HP: <strong className="text-white">120/120</strong></span>
                  <span className="text-cyan-400">MP: <strong className="text-white">45/45</strong></span>
                </div>
                <span className="text-rose-400">PYDRAGON HP: <strong className="text-white">???/???</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* HERO TAGLINE (Clean Readable Font) */}
        <p className="mx-auto mt-8 max-w-2xl font-sans text-base sm:text-xl font-medium text-slate-200 leading-relaxed">
          Master Python in an epic <span className="font-extrabold text-amber-300 underline decoration-amber-400 underline-offset-4">28-day</span> RPG video game adventure! Pick your hero archetype, complete daily coding sub-quests, slay mini-bosses, and conquer weekly dungeons.
        </p>

        {/* ACTION BUTTONS (Crisp & Readable) */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="/auth/signup"
            className="rounded-lg border-2 border-emerald-400 bg-emerald-600 px-8 py-4 font-sans text-lg font-extrabold text-slate-950 shadow-[4px_4px_0px_#000000,0_0_20px_rgba(34,197,94,0.4)] transition hover:scale-105 hover:bg-emerald-500 active:translate-y-1 active:shadow-none"
          >
            ⚔️ Create Hero &amp; Begin Day 1
          </a>
          <a
            href="#download-section"
            className="flex items-center gap-2 rounded-lg border-2 border-purple-500 bg-[#160b33] px-8 py-4 font-sans text-lg font-bold text-purple-200 shadow-[4px_4px_0px_#000000,0_0_15px_rgba(168,85,247,0.3)] transition hover:scale-105 hover:border-emerald-400 hover:text-emerald-300"
          >
            <span>💻 Desktop App (.exe / .dmg)</span>
          </a>
          <a
            href="/auth/login"
            className="rounded-lg border-2 border-slate-700 bg-slate-900/90 px-8 py-4 font-sans text-lg font-bold text-slate-200 shadow-[4px_4px_0px_#000000] transition hover:border-slate-500 hover:text-amber-300"
          >
            Resume Journey
          </a>
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
      </section>

      {/* Download Desktop Application Banner */}
      <section id="download-section" className="mx-auto max-w-6xl px-4 pb-16 scroll-mt-20">
        <div className="rounded-2xl border-4 border-emerald-500/70 bg-gradient-to-br from-[#0c1c14] via-[#0f1524] to-[#070d18] p-8 shadow-[0_0_30px_rgba(34,197,94,0.25)] md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center md:text-left">
              <span className="inline-block rounded border-2 border-emerald-400 bg-emerald-950/80 px-3 py-1 font-retro text-[10px] text-emerald-300 tracking-wider">
                100% OFFLINE PLAYABLE • NO WI-FI NEEDED
              </span>
              <h2 className="font-pixel text-3xl sm:text-4xl font-extrabold text-amber-300 pixel-text-shadow-gold">
                Download Pythonia Desktop Edition
              </h2>
              <p className="max-w-xl font-sans text-sm text-slate-200 leading-relaxed">
                Get the standalone portable game executable for Windows or macOS. Play the full 28-day RPG campaign anywhere without requiring an internet connection!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <a
                href="https://github.com/Tormento416/AdventuresInPythonia/releases/latest"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-3 rounded-lg border-2 border-emerald-400 bg-emerald-600 px-6 py-4 font-sans text-sm font-bold text-slate-950 shadow-[3px_3px_0px_#000000] transition hover:bg-emerald-500 hover:scale-105"
              >
                <span className="text-2xl">🪟</span>
                <div className="text-left">
                  <div className="leading-tight text-base font-extrabold">Windows .EXE</div>
                  <div className="text-[11px] font-mono text-slate-950">Portable 64-Bit</div>
                </div>
              </a>

              <a
                href="https://github.com/Tormento416/AdventuresInPythonia/releases/latest"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-3 rounded-lg border-2 border-purple-400 bg-[#1a0e3d] px-6 py-4 font-sans text-sm font-bold text-white shadow-[3px_3px_0px_#000000] transition hover:border-emerald-400 hover:scale-105"
              >
                <span className="text-2xl">🍎</span>
                <div className="text-left">
                  <div className="leading-tight text-base font-extrabold">macOS .DMG</div>
                  <div className="text-[11px] font-mono text-purple-300">Standalone App</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Archetypes Section */}
      <section className="border-t-2 border-emerald-900/60 bg-[#09121d] py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <span className="font-retro text-xs font-bold uppercase tracking-widest text-emerald-400">7 Hero Specializations</span>
            <h2 className="mt-2 font-pixel text-3xl sm:text-4xl font-extrabold text-white">Choose Your Character Archetype</h2>
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

      {/* 4-Week Campaign Roadmap */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <span className="font-retro text-xs font-bold uppercase tracking-widest text-amber-400">Curriculum Structure</span>
            <h2 className="mt-2 font-pixel text-3xl sm:text-4xl font-extrabold text-white">The 4-Week Journey to Mastery</h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="pixel-card rounded-xl p-6 border-l-4 border-l-cyan-400">
              <span className="rounded bg-cyan-950 border border-cyan-400 px-2.5 py-1 font-retro text-[9px] text-cyan-300">WEEK 1</span>
              <h3 className="mt-3 font-pixel text-xl font-bold text-white">Syntax &amp; Control</h3>
              <p className="mt-2 font-sans text-xs text-slate-300 leading-relaxed">
                Variables, print formatting, data types, arithmetic, conditional branching, and for loops.
              </p>
              <div className="mt-4 font-retro text-[10px] text-rose-400">👑 Day 7 Boss: Syntaxius</div>
            </div>

            <div className="pixel-card rounded-xl p-6 border-l-4 border-l-emerald-400">
              <span className="rounded bg-emerald-950 border border-emerald-400 px-2.5 py-1 font-retro text-[9px] text-emerald-300">WEEK 2</span>
              <h3 className="mt-3 font-pixel text-xl font-bold text-white">Data &amp; Functions</h3>
              <p className="mt-2 font-sans text-xs text-slate-300 leading-relaxed">
                Lists, tuples, dictionaries, sets, while loops, custom functions, parameters, and *args/**kwargs.
              </p>
              <div className="mt-4 font-retro text-[10px] text-rose-400">👑 Day 14 Boss: Algorithma</div>
            </div>

            <div className="pixel-card rounded-xl p-6 border-l-4 border-l-purple-400">
              <span className="rounded bg-purple-950 border border-purple-400 px-2.5 py-1 font-retro text-[9px] text-purple-300">WEEK 3</span>
              <h3 className="mt-3 font-pixel text-xl font-bold text-white">OOP &amp; Persistence</h3>
              <p className="mt-2 font-sans text-xs text-slate-300 leading-relaxed">
                Classes, objects, inheritance, polymorphism, magic dunder methods, standard modules, exceptions, and file I/O.
              </p>
              <div className="mt-4 font-retro text-[10px] text-rose-400">👑 Day 21 Boss: Iron Colossus</div>
            </div>

            <div className="pixel-card rounded-xl p-6 border-l-4 border-l-amber-400">
              <span className="rounded bg-amber-950 border border-amber-400 px-2.5 py-1 font-retro text-[9px] text-amber-300">WEEK 4</span>
              <h3 className="mt-3 font-pixel text-xl font-bold text-white">Frameworks &amp; Sorcery</h3>
              <p className="mt-2 font-sans text-xs text-slate-300 leading-relaxed">
                Virtual environments, PIP, REST APIs, CLI rich tools, web endpoints, pandas/numpy data, and Pygame.
              </p>
              <div className="mt-4 font-retro text-[10px] text-amber-400">👑 Day 28 Final Boss: Malakor</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
