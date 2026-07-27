"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DungeonCanvas } from "@/components/dungeon/DungeonCanvas";
import { CombatOverlay } from "@/components/dungeon/CombatOverlay";
import { ContextCloud } from "@/components/ContextCloud";
import { DAILY_QUESTS_SEED } from "@/lib/db/seedData";
import { getDungeonLevel } from "@/lib/dungeon/levels";
import { ObstacleConfig } from "@/lib/dungeon/types";
import { Quest, Archetype, SubQuest } from "@/lib/db/models";

export default function DailyQuestPage({ params }: { params: { day: string } }) {
  const dayNum = Number(params.day);
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [quest, setQuest] = useState<Quest | null>(null);
  const [loading, setLoading] = useState(true);

  // Active interaction in Dungeon
  const [activeObstacle, setActiveObstacle] = useState<ObstacleConfig | null>(null);
  const [isCloudOpen, setIsCloudOpen] = useState(false);

  useEffect(() => {
    // If Day 7, 14, 21, or 28 -> redirect to Weekly Boss page
    if (dayNum % 7 === 0) {
      router.push(`/boss/${dayNum / 7}`);
      return;
    }

    const cached = localStorage.getItem("py_hero_user");
    if (cached) {
      try {
        setUser(JSON.parse(cached));
      } catch (e) {}
    } else {
      // Default initial guest hero
      const guest = {
        id: "guest_" + Date.now(),
        username: "GuestHero",
        displayName: "Guest Hero",
        level: 1,
        xp: 0,
        currentDay: 1,
        completedSubQuestIds: [],
        completedMiniBossDays: [],
        completedWeeklyBossWeeks: [],
        isGuest: true,
      };
      setUser(guest);
      localStorage.setItem("py_hero_user", JSON.stringify(guest));
    }

    // Load quest details from API or seed data
    fetch(`/api/quests?day=${dayNum}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.quest) {
          setQuest(data.quest);
        } else {
          const fallback = DAILY_QUESTS_SEED.find((q) => q.dayNumber === dayNum);
          setQuest(fallback || null);
        }
        setLoading(false);
      })
      .catch(() => {
        const fallback = DAILY_QUESTS_SEED.find((q) => q.dayNumber === dayNum);
        setQuest(fallback || null);
        setLoading(false);
      });
  }, [dayNum, router]);

  async function handleCompleteSubQuest(subQuestId: string, userCode: string) {
    const isCloudUser = user?.id && !user.isGuest && !user.id.startsWith("guest_");

    if (isCloudUser) {
      try {
        const res = await fetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id || user._id,
            type: "subquest",
            subQuestId,
            userCode,
            xpEarned: 50,
          }),
        });
        const data = await res.json();
        if (res.ok) {
          const updatedUser = {
            ...user,
            xp: data.xp,
            level: data.level,
            completedSubQuestIds: data.completedSubQuestIds,
          };
          setUser(updatedUser);
          localStorage.setItem("py_hero_user", JSON.stringify(updatedUser));
          setActiveObstacle(null);
          return;
        }
      } catch (e) {}
    }

    // Fallback or Guest Mode: Update local storage
    const currentCompleted = user?.completedSubQuestIds || [];
    const newCompleted = currentCompleted.includes(subQuestId)
      ? currentCompleted
      : [...currentCompleted, subQuestId];
    const newXp = (user?.xp || 0) + 50;
    const newLevel = Math.floor(newXp / 250) + 1;

    const updatedGuest = {
      ...(user || {}),
      xp: newXp,
      level: newLevel,
      completedSubQuestIds: newCompleted,
    };
    setUser(updatedGuest);
    localStorage.setItem("py_hero_user", JSON.stringify(updatedGuest));
    setActiveObstacle(null);
  }

  async function handleCompleteMiniBoss(userCode: string) {
    if (!quest?.miniBoss) return;
    const isCloudUser = user?.id && !user.isGuest && !user.id.startsWith("guest_");

    if (isCloudUser) {
      try {
        const res = await fetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id || user._id,
            type: "miniboss",
            dayNumber: dayNum,
            userCode,
            xpEarned: 150,
            lootEarned: quest.miniBoss.lootReward,
          }),
        });
        const data = await res.json();
        if (res.ok) {
          const updatedUser = {
            ...user,
            xp: data.xp,
            level: data.level,
            currentDay: data.currentDay,
            completedMiniBossDays: data.completedMiniBossDays,
            lootInventory: data.lootInventory,
          };
          setUser(updatedUser);
          localStorage.setItem("py_hero_user", JSON.stringify(updatedUser));
          setActiveObstacle(null);
          return;
        }
      } catch (e) {}
    }

    // Fallback or Guest Mode: Update local storage
    const currentBosses = user?.completedMiniBossDays || [];
    const newBosses = currentBosses.includes(dayNum) ? currentBosses : [...currentBosses, dayNum];
    const currentLoot = user?.lootInventory || [];
    const newLoot =
      quest.miniBoss.lootReward && !currentLoot.includes(quest.miniBoss.lootReward)
        ? [...currentLoot, quest.miniBoss.lootReward]
        : currentLoot;

    const newXp = (user?.xp || 0) + 150;
    const newLevel = Math.floor(newXp / 250) + 1;

    const updatedGuest = {
      ...(user || {}),
      xp: newXp,
      level: newLevel,
      currentDay: Math.max(user?.currentDay || 1, dayNum + 1),
      completedMiniBossDays: newBosses,
      lootInventory: newLoot,
    };
    setUser(updatedGuest);
    localStorage.setItem("py_hero_user", JSON.stringify(updatedGuest));
    setActiveObstacle(null);
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center p-8">
        <p className="text-sm font-semibold text-cyan-300 animate-pulse">Loading Day {dayNum} Dungeon...</p>
      </main>
    );
  }

  if (!quest) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
        <h1 className="text-3xl font-bold text-white">Day {dayNum} Quest Not Found</h1>
        <p className="mt-2 text-sm text-slate-400">Return to the quest board to select a valid day.</p>
        <a href="/quests" className="mt-6 rounded-full bg-cyan-400 px-6 py-2.5 text-xs font-bold text-slate-950">
          Back to Quest Board
        </a>
      </main>
    );
  }

  const completedSubQuestIds = user?.completedSubQuestIds || [];
  const completedMiniBoss = (user?.completedMiniBossDays || []).includes(dayNum);
  const dungeonLevel = getDungeonLevel(dayNum);

  // Find subquest or boss for active obstacle modal
  let activeSubQuest: SubQuest | undefined;
  if (activeObstacle && activeObstacle.type === "chest") {
    activeSubQuest = quest.subQuests.find((sq) => sq.id === activeObstacle.questId);
    if (!activeSubQuest && dungeonLevel) {
      const chests = dungeonLevel.obstacles.filter((o) => o.type === "chest");
      const chestIdx = chests.findIndex((o) => o.tileX === activeObstacle.tileX && o.tileY === activeObstacle.tileY);
      if (chestIdx >= 0 && chestIdx < quest.subQuests.length) {
        activeSubQuest = quest.subQuests[chestIdx];
      }
    }
    if (!activeSubQuest && quest.subQuests.length > 0) {
      activeSubQuest = quest.subQuests[0];
    }
  }

  return (
    <main className="min-h-screen p-4 sm:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Quest Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-cyan-500/20 bg-slate-900/60 p-5 backdrop-blur-xl">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-cyan-400 px-3 py-1 text-xs font-black text-slate-950">
                DAY {quest.dayNumber}
              </span>
              <span className="text-xs font-bold text-slate-400">{quest.category}</span>
              {user?.archetype && (
                <span className="rounded-full bg-amber-400/20 border border-amber-400/40 px-3 py-1 text-[10px] font-bold text-amber-300">
                  Specialization: {user.archetype.toUpperCase()}
                </span>
              )}
            </div>
            <h1 className="mt-2 text-2xl sm:text-3xl font-black text-white">{quest.title}</h1>
            <p className="text-xs font-semibold text-cyan-300">{quest.subtitle}</p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/quests"
              className="rounded-full border border-slate-700 bg-slate-950 px-5 py-2.5 text-xs font-bold text-slate-300 hover:bg-slate-900 transition"
            >
              Quest Map
            </a>
            {dayNum < 28 && (
              <a
                href={`/quests/${dayNum + 1}`}
                className="rounded-full bg-cyan-400 px-5 py-2.5 text-xs font-extrabold text-slate-950 shadow-md shadow-cyan-400/20 hover:bg-cyan-300 transition"
              >
                Next Day →
              </a>
            )}
          </div>
        </div>

        {/* Top-Down 2D Dungeon View */}
        {dungeonLevel && (
          <div className="space-y-4">
            <DungeonCanvas
              level={dungeonLevel}
              userArchetype={user?.archetype}
              completedSubQuestIds={completedSubQuestIds}
              completedMiniBoss={completedMiniBoss}
              onObstacleInteract={(obs) => setActiveObstacle(obs)}
              onContextCloudTrigger={() => setIsCloudOpen(true)}
              onExitReach={() => {
                if (dayNum < 28) router.push(`/quests/${dayNum + 1}`);
                else router.push("/quests");
              }}
            />
          </div>
        )}
      </div>

      {/* Combat / Code Editor Modal when interacting with obstacles */}
      {activeObstacle && (
        <CombatOverlay
          obstacle={activeObstacle}
          subQuest={activeSubQuest}
          miniBoss={quest.miniBoss}
          userArchetype={user?.archetype}
          onSolveSubQuest={handleCompleteSubQuest}
          onSolveMiniBoss={handleCompleteMiniBoss}
          onClose={() => setActiveObstacle(null)}
        />
      )}

      {/* Context Cloud Floating Companion */}
      <ContextCloud
        currentDay={dayNum}
        userArchetype={user?.archetype as Archetype | undefined}
        autoExpand={isCloudOpen}
      />
    </main>
  );
}
