"use client";

import { useEffect, useState } from "react";
import { DAILY_QUESTS_SEED } from "@/lib/db/seedData";

export default function QuestMapPage() {
  const [user, setUser] = useState<any>(null);
  const [quests, setQuests] = useState<any[]>(DAILY_QUESTS_SEED);

  useEffect(() => {
    const cached = localStorage.getItem("py_hero_user");
    if (cached) {
      try {
        setUser(JSON.parse(cached));
      } catch (e) {}
    }

    fetch("/api/quests")
      .then((res) => res.json())
      .then((data) => {
        if (data.quests && data.quests.length > 0) {
          setQuests(data.quests);
        }
      })
      .catch(() => {});
  }, []);

  const completedMiniBosses = new Set<number>(user?.completedMiniBossDays || []);
  const completedWeeklyBosses = new Set<number>(user?.completedWeeklyBossWeeks || []);
  const activeDay = user?.currentDay || 1;

  const weeks = [
    { number: 1, title: "Week 1: Syntax, Variables & Control", days: quests.filter(q => q.dayNumber >= 1 && q.dayNumber <= 7) },
    { number: 2, title: "Week 2: Data Structures & Functions", days: quests.filter(q => q.dayNumber >= 8 && q.dayNumber <= 14) },
    { number: 3, title: "Week 3: OOP, Modules & Persistence", days: quests.filter(q => q.dayNumber >= 15 && q.dayNumber <= 21) },
    { number: 4, title: "Week 4: Frameworks, Extensions & Libraries", days: quests.filter(q => q.dayNumber >= 22 && q.dayNumber <= 28) }
  ];

  return (
    <main className="min-h-screen bg-[#0a0518] p-6 sm:p-10 text-slate-100">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="text-center">
          <span className="rounded border-2 border-emerald-400 bg-emerald-950/80 px-4 py-1.5 font-retro text-[10px] uppercase tracking-widest text-emerald-300 shadow-[0_0_10px_rgba(34,197,94,0.3)]">
            28-Day Campaign Board
          </span>
          <h1 className="mt-4 font-pixel text-4xl sm:text-5xl font-extrabold text-amber-300 pixel-text-shadow-gold">
            Pythonia Quest Board
          </h1>
          <p className="mt-2 font-sans text-sm text-purple-200/90">
            Complete daily side quests and defeat Mini-Bosses. Every 7 days, conquer the Weekly Epic Boss Dungeon!
          </p>
        </div>

        {weeks.map((week) => (
          <section key={week.number} className="rounded-2xl border-4 border-[#3b1e6e] bg-[#12092c]/90 p-6 shadow-[0_0_20px_rgba(0,0,0,0.6)]">
            <div className="flex items-center justify-between border-b-2 border-[#2b1652] pb-4">
              <h2 className="font-pixel text-2xl font-bold text-white">{week.title}</h2>
              <span className="font-retro text-xs text-amber-400">
                {completedWeeklyBosses.has(week.number) ? "🏆 Boss Defeated" : `Week ${week.number}`}
              </span>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {week.days.map((q) => {
                const isWeeklyBoss = q.isWeeklyBossDay || q.dayNumber % 7 === 0;
                const isMiniBossDone = completedMiniBosses.has(q.dayNumber);
                const isActive = q.dayNumber === activeDay;

                const linkHref = isWeeklyBoss
                  ? `/boss/${Math.floor(q.dayNumber / 7)}`
                  : `/quests/${q.dayNumber}`;

                return (
                  <a
                    key={q.dayNumber}
                    href={linkHref}
                    className={`group relative flex flex-col justify-between rounded-xl border-2 p-5 transition-all duration-300 ${
                      isWeeklyBoss
                        ? "border-rose-500 bg-[#280918] hover:border-rose-400 shadow-[4px_4px_0px_#000000,0_0_15px_rgba(244,63,94,0.3)]"
                        : isActive
                        ? "border-emerald-400 bg-[#16271c] shadow-[4px_4px_0px_#000000,0_0_20px_rgba(34,197,94,0.4)] ring-2 ring-emerald-400"
                        : "border-[#3b1e6e] bg-[#0c061d] hover:border-purple-500 hover:bg-[#150b33] shadow-[3px_3px_0px_#000000]"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between font-retro text-[10px] font-bold">
                        <span className={isWeeklyBoss ? "text-rose-400" : isActive ? "text-emerald-300" : "text-purple-300"}>
                          Day {q.dayNumber}
                        </span>
                        {isWeeklyBoss ? (
                          <span className="rounded bg-rose-950 border border-rose-500/60 px-1.5 py-0.5 text-[9px] text-rose-300">
                            👑 EPIC BOSS
                          </span>
                        ) : isMiniBossDone ? (
                          <span className="text-emerald-400">✓ Done</span>
                        ) : (
                          <span className="text-slate-400">👹 Mini-Boss</span>
                        )}
                      </div>

                      <h3 className="mt-3 font-pixel text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                        {q.title}
                      </h3>
                      <p className="mt-1 font-sans text-xs text-purple-200/80 line-clamp-2">{q.subtitle}</p>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-[#231244] pt-3 text-[11px] font-pixel">
                      <span className="text-purple-300">{q.category}</span>
                      <span className="font-bold text-emerald-400">
                        +{isWeeklyBoss ? 500 : 250} XP
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
