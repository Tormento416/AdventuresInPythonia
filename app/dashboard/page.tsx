"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BootcampSummary } from "@/components/BootcampSummary";
import { ContextCloud } from "@/components/ContextCloud";
import { ARCHETYPES, Archetype } from "@/lib/db/models";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const cached = localStorage.getItem("py_hero_user");
    if (!cached) {
      router.push("/auth/login");
      return;
    }

    try {
      const parsed = JSON.parse(cached);
      setUser(parsed);

      // Refresh latest profile from backend API
      const userId = parsed.id || parsed._id;
      if (userId) {
        fetch(`/api/profile?userId=${userId}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.user) {
              setUser(data.user);
              localStorage.setItem("py_hero_user", JSON.stringify(data.user));
            }
          })
          .catch(() => {});
      }
    } catch (e) {}
  }, [router]);

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center p-8">
        <p className="text-sm text-cyan-300">Loading Character Sheet...</p>
      </main>
    );
  }

  const archetypeInfo = user.archetype ? ARCHETYPES[user.archetype as Archetype] : null;
  const currentDay = user.currentDay || 1;
  const currentFloor = Math.min(4, Math.ceil(currentDay / 7));
  const floorNames = [
    "Floor 1 — Awakening of Syntaxia",
    "Floor 2 — The Data Caverns",
    "Floor 3 — The Object-Oriented Citadel",
    "Floor 4 — The Code Sovereign Realm"
  ];
  const floorColors = ["cyan", "emerald", "purple", "amber"];

  return (
    <main className="min-h-screen p-6 sm:p-10">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Main Character Header Summary */}
        <BootcampSummary user={user} />

        {/* Floor Level Progress Banner */}
        <section className={`rounded-2xl border-2 ${
          currentFloor === 4 ? 'border-amber-500/60 bg-amber-950/30' :
          currentFloor === 3 ? 'border-purple-500/60 bg-purple-950/30' :
          currentFloor === 2 ? 'border-emerald-500/60 bg-emerald-950/30' :
          'border-cyan-500/60 bg-cyan-950/30'
        } p-5 backdrop-blur-xl`}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className={`font-retro text-[10px] uppercase tracking-widest ${
                currentFloor === 4 ? 'text-amber-400' :
                currentFloor === 3 ? 'text-purple-400' :
                currentFloor === 2 ? 'text-emerald-400' :
                'text-cyan-400'
              }`}>
                🗺️ Current Dungeon Floor
              </span>
              <h3 className="mt-1 font-pixel text-xl font-bold text-white">
                {floorNames[currentFloor - 1]}
              </h3>
              <p className="mt-1 font-sans text-xs text-slate-400">
                Day {currentDay} of 28 — Floor {currentFloor} of 4
              </p>
            </div>
            <div className="flex gap-2">
              {[1,2,3,4].map((floor) => (
                <div
                  key={floor}
                  className={`h-8 w-8 rounded-lg border-2 flex items-center justify-center font-retro text-xs font-bold ${
                    floor < currentFloor ? 'border-emerald-400 bg-emerald-950 text-emerald-300' :
                    floor === currentFloor ? `border-${floorColors[floor-1]}-400 bg-${floorColors[floor-1]}-950 text-${floorColors[floor-1]}-300 shadow-[0_0_10px_rgba(34,197,94,0.4)]` :
                    'border-slate-700 bg-slate-900 text-slate-600'
                  }`}
                >
                  {floor < currentFloor ? '✓' : floor}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Day 1 Archetype Card if not set */}
        {!user.archetype && (
          <div className="rounded-3xl border border-amber-400/40 bg-amber-500/10 p-6 backdrop-blur-xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-amber-300">⚡ Day 1 Specialization Required</h3>
                <p className="mt-1 text-xs text-amber-200">
                  Select your hero archetype to unlock your specialized quest paths, code examples, and bonus spells!
                </p>
              </div>
              <a
                href="/create-character"
                className="rounded-full bg-amber-400 px-6 py-2.5 text-xs font-black text-slate-950 shadow-md shadow-amber-400/20"
              >
                Choose Archetype Now
              </a>
            </div>
          </div>
        )}

        {/* Fast Action Cards */}
        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">ACTIVE CAMPAIGN DAY</span>
            <h3 className="mt-1 text-2xl font-bold text-white">Day {user.currentDay || 1} Quest Hub</h3>
            <p className="mt-2 text-xs text-slate-300">
              Continue your daily side quests and conquer today's Mini-Boss to earn +150 XP and level up.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`/quests/${user.currentDay || 1}`}
                className="rounded-full bg-cyan-400 px-6 py-3 text-xs font-black text-slate-950 shadow-md shadow-cyan-400/20 hover:bg-cyan-300 transition"
              >
                Enter Day {user.currentDay || 1}
              </a>
              <a
                href="/quests"
                className="rounded-full border border-slate-700 bg-slate-950 px-6 py-3 text-xs font-bold text-white hover:bg-slate-900 transition"
              >
                View 28-Day Quest Board
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">WEEKLY DUNGEON BOSSES</span>
            <h3 className="mt-1 text-2xl font-bold text-white">4 Epic Boss Battlegrounds</h3>
            <p className="mt-2 text-xs text-slate-300">
              Days 7, 14, 21, and 28 feature multi-phase weekly boss fights with no side quests. Prove your weekly mastery!
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <a href="/boss/1" className="rounded-xl border border-rose-500/30 bg-rose-950/40 px-3.5 py-2 text-xs font-bold text-rose-300 hover:bg-rose-900/50 transition">
                Week 1 Boss (Day 7)
              </a>
              <a href="/boss/2" className="rounded-xl border border-rose-500/30 bg-rose-950/40 px-3.5 py-2 text-xs font-bold text-rose-300 hover:bg-rose-900/50 transition">
                Week 2 Boss (Day 14)
              </a>
              <a href="/boss/3" className="rounded-xl border border-rose-500/30 bg-rose-950/40 px-3.5 py-2 text-xs font-bold text-rose-300 hover:bg-rose-900/50 transition">
                Week 3 Boss (Day 21)
              </a>
              <a href="/boss/4" className="rounded-xl border border-amber-500/30 bg-amber-950/40 px-3.5 py-2 text-xs font-bold text-amber-300 hover:bg-amber-900/50 transition">
                Final Boss (Day 28)
              </a>
            </div>
          </div>
        </section>

        {/* Character Class Info Card */}
        {archetypeInfo && (
          <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-xl">
            <div className="flex flex-wrap items-center gap-4 justify-between">
              <div className="flex items-center gap-4">
                <span className="text-4xl">{archetypeInfo.icon}</span>
                <div>
                  <h3 className="text-xl font-bold text-white">{archetypeInfo.name} — Active Specialization Path</h3>
                  <p className="text-xs font-semibold text-cyan-300">{archetypeInfo.roleTitle} · {archetypeInfo.focusArea}</p>
                </div>
              </div>
              <a
                href="/create-character"
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-2 text-xs font-bold text-slate-400 hover:text-white hover:border-slate-500 transition"
              >
                Change Archetype
              </a>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-slate-300">{archetypeInfo.description}</p>
            <div className="mt-4 flex flex-wrap gap-4 text-xs font-semibold text-cyan-200">
              <div className="rounded-xl border border-cyan-500/20 bg-slate-950/60 px-4 py-2">
                ⚡ Trait: {archetypeInfo.traitBonus}
              </div>
              <div className="rounded-xl border border-indigo-500/20 bg-slate-950/60 px-4 py-2">
                🔮 Starter Spell: {archetypeInfo.starterSpell}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Context Cloud Companion */}
      <ContextCloud
        currentDay={currentDay}
        userArchetype={user.archetype as Archetype | undefined}
      />
    </main>
  );
}
