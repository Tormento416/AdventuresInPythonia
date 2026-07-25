"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArchetypeSelector } from "@/components/ArchetypeSelector";
import { Archetype } from "@/lib/db/models";

export default function CreateCharacterPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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

    // If user has a registered cloud account (id exists and not guest), save to MongoDB API
    if (user && user.id && !user.isGuest && !user.id.startsWith("guest_")) {
      try {
        const res = await fetch("/api/profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id || user._id,
            archetype
          })
        });

        const data = await res.json();
        setLoading(false);

        if (res.ok && data.user) {
          localStorage.setItem("py_hero_user", JSON.stringify(data.user));
          router.push("/quests/1");
          return;
        }
      } catch (err: any) {
        setLoading(false);
      }
    }

    // Guest Mode: Create/Update local guest hero profile in browser storage
    const guestUser = {
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
      isGuest: true
    };

    localStorage.setItem("py_hero_user", JSON.stringify(guestUser));
    setLoading(false);
    router.push("/quests/1");
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
