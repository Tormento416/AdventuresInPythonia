"use client";

import { useEffect, useState } from "react";
import { ArchetypeSelector } from "@/components/ArchetypeSelector";
import { Archetype } from "@/lib/db/models";

export default function CreateCharacterPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cached = localStorage.getItem("py_hero_user");
    if (cached) {
      try {
        setUser(JSON.parse(cached));
      } catch (e) {}
    }
  }, []);

  async function handleSelectArchetype(archetype: Archetype) {
    setLoading(true);

    // Build updated hero profile object
    const updatedUser = {
      ...(user || {}),
      id: user?.id || "guest_" + Date.now(),
      username: user?.username || "GuestHero",
      displayName: user?.displayName || "Guest Hero",
      archetype,
      level: user?.level || 1,
      xp: user?.xp || 0,
      hp: 100,
      maxHp: 100,
      mana: 100,
      maxMana: 100,
      currentDay: user?.currentDay || 1,
      completedSubQuestIds: user?.completedSubQuestIds || [],
      completedMiniBossDays: user?.completedMiniBossDays || [],
      completedWeeklyBossWeeks: user?.completedWeeklyBossWeeks || [],
      lootInventory: user?.lootInventory || [],
    };

    // Save hero state locally
    localStorage.setItem("py_hero_user", JSON.stringify(updatedUser));

    // Try cloud save if registered user
    if (user && user.id && !user.isGuest && !user.id.startsWith("guest_")) {
      try {
        await fetch("/api/profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id || user._id,
            archetype,
          }),
        });
      } catch (err: any) {}
    }

    // Always launch directly into Day 1 Quest Dungeon
    window.location.href = "/quests/1";
  }

  return (
    <main className="min-h-screen px-6 py-12">
      <ArchetypeSelector
        currentArchetype={user?.archetype}
        onSelect={handleSelectArchetype}
        loading={loading}
      />
    </main>
  );
}
