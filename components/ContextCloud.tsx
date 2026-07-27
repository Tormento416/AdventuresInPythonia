"use client";

import { useState, useEffect } from "react";
import { Archetype, ARCHETYPES } from "@/lib/db/models";

interface ContextCloudProps {
  currentDay?: number;
  currentWeek?: number;
  contextHint?: string;       // Optional quest-specific hint from the current SubQuest
  userArchetype?: Archetype;
  autoExpand?: boolean;        // True when entering an obstacle (quest page load)
}

const WEEK_CHEATSHEETS: Record<number, { title: string; items: { label: string; code: string }[] }> = {
  1: {
    title: "Floor 1 — Syntax Fundamentals",
    items: [
      { label: "Print with f-string", code: 'print(f"HP: {hp}")' },
      { label: "Variable assignment", code: "hero_name = \"Arthur\"" },
      { label: "If / elif / else", code: "if hp < 30:\n    action = 'potion'\nelif hp < 70:\n    action = 'shield'\nelse:\n    action = 'attack'" },
      { label: "For loop with range", code: "for i in range(1, 6):\n    print(i)" },
      { label: "Input & type cast", code: "level = int(input('Enter level: '))" },
    ]
  },
  2: {
    title: "Floor 2 — Data Structures",
    items: [
      { label: "List indexing", code: "items = ['sword', 'potion']\nprint(items[0])" },
      { label: "Dictionary lookup", code: "spellbook = {'fire': 25}\ncost = spellbook.get('fire', 0)" },
      { label: "Set deduplication", code: "unique = list(set(inventory))" },
      { label: "While loop", code: "while mana > 0:\n    mana -= 10" },
      { label: "Function with *args", code: "def total(*args):\n    return sum(args)" },
    ]
  },
  3: {
    title: "Floor 3 — OOP Citadel",
    items: [
      { label: "Class definition", code: "class Hero:\n    def __init__(self, name):\n        self.name = name" },
      { label: "Inheritance", code: "class Paladin(Hero):\n    def strike(self):\n        return 'Holy Shield!'" },
      { label: "Try / except", code: "try:\n    result = a / b\nexcept ZeroDivisionError:\n    result = 0" },
      { label: "File write/read", code: "with open('save.json', 'w') as f:\n    json.dump(data, f)" },
      { label: "Dunder __str__", code: "def __str__(self):\n    return f'Hero: {self.name}'" },
    ]
  },
  4: {
    title: "Floor 4 — Code Sovereign Realm",
    items: [
      { label: "Import module", code: "import json\nimport os\nfrom pathlib import Path" },
      { label: "JSON parse", code: "data = json.loads(payload)\njson.dumps(data)" },
      { label: "List comprehension", code: "[x**2 for x in range(10) if x % 2 == 0]" },
      { label: "REST request sim", code: "import urllib.request\nurl = 'https://api.example.com'\nresponse = urllib.request.urlopen(url)" },
      { label: "CLI args", code: "import sys\nargs = sys.argv[1:]" },
    ]
  }
};

export function ContextCloud({
  currentDay = 1,
  currentWeek,
  contextHint,
  userArchetype,
  autoExpand = false
}: ContextCloudProps) {
  const week = currentWeek ?? Math.min(4, Math.ceil(currentDay / 7));
  const [isOpen, setIsOpen] = useState(autoExpand);
  const [activeTab, setActiveTab] = useState<"cheatsheet" | "hint" | "archetype">("cheatsheet");

  // Auto-expand when entering a quest (obstacle detection)
  useEffect(() => {
    if (autoExpand) {
      setIsOpen(true);
      if (contextHint) setActiveTab("hint");
    }
  }, [autoExpand, contextHint]);

  const cheatsheet = WEEK_CHEATSHEETS[week] ?? WEEK_CHEATSHEETS[1];
  const archetypeInfo = userArchetype ? ARCHETYPES[userArchetype] : null;

  return (
    <>
      {/* Floating Toggle Button (20% Larger) */}
      <button
        id="context-cloud-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Context Cloud Companion"
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full border-2 px-5 py-3.5 font-retro text-sm font-bold shadow-[0_0_25px_rgba(34,197,94,0.5)] transition-all duration-300 hover:scale-110 ${
          isOpen
            ? "border-emerald-400 bg-emerald-950/95 text-emerald-300"
            : "border-cyan-400 bg-[#09121d]/95 text-cyan-300 animate-context-cloud-bob"
        }`}
      >
        <span className="text-2xl" role="img" aria-hidden>☁️</span>
        <span className="hidden sm:inline">{isOpen ? "CLOSE CLOUD" : "CONTEXT CLOUD"}</span>
      </button>

      {/* Context Cloud Panel (20% Larger width & scaled fonts) */}
      {isOpen && (
        <div
          id="context-cloud-panel"
          className="fixed bottom-24 right-6 z-50 w-[420px] sm:w-[480px] rounded-2xl border-2 border-emerald-400/80 bg-[#050e0a]/95 shadow-[0_0_40px_rgba(34,197,94,0.3),0_0_80px_rgba(34,197,94,0.15)] backdrop-blur-xl"
        >
          {/* Panel Header */}
          <div className="flex items-center justify-between rounded-t-2xl border-b border-emerald-900/60 bg-emerald-950/90 px-5 py-3.5">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl animate-context-cloud-bob inline-block">☁️</span>
              <div>
                <div className="font-retro text-xs text-emerald-400">CONTEXT CLOUD ASSISTANT</div>
                <div className="font-retro text-[11px] text-emerald-600">Persistent Companion Active</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-md border border-emerald-700/50 px-3 py-1.5 font-retro text-xs text-emerald-400 hover:border-rose-500 hover:text-rose-400 transition"
            >
              ✕ CLOSE
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-1.5 border-b border-emerald-900/40 px-4 pt-2.5">
            {[
              { id: "cheatsheet" as const, label: "📚 Syntax" },
              ...(contextHint ? [{ id: "hint" as const, label: "💡 Hint" }] : []),
              ...(archetypeInfo ? [{ id: "archetype" as const, label: `${archetypeInfo.icon} Class` }] : []),
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-t-xl px-4 py-2 font-retro text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? "bg-emerald-950 text-emerald-300 border border-b-0 border-emerald-600/70"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Panel Body (20% Larger scroll area & scaled fonts) */}
          <div className="max-h-[440px] overflow-y-auto p-5 space-y-3">
            {/* Cheatsheet Tab */}
            {activeTab === "cheatsheet" && (
              <div>
                <div className="font-retro text-xs text-emerald-400 uppercase tracking-widest mb-3">
                  {cheatsheet.title}
                </div>
                {cheatsheet.items.map((item, i) => (
                  <div key={i} className="mb-3.5 rounded-xl border border-emerald-900/70 bg-[#020d07] p-3">
                    <div className="font-retro text-xs text-emerald-400 mb-1.5">{item.label}</div>
                    <pre className="font-mono text-xs sm:text-sm text-cyan-300 whitespace-pre-wrap leading-relaxed">
                      {item.code}
                    </pre>
                  </div>
                ))}
              </div>
            )}

            {/* Hint Tab */}
            {activeTab === "hint" && contextHint && (
              <div className="rounded-xl border border-amber-500/40 bg-amber-950/40 p-4">
                <div className="font-retro text-xs text-amber-400 uppercase tracking-widest mb-2">
                  💡 Obstacle Guidance
                </div>
                <p className="font-sans text-sm text-amber-200 leading-relaxed">{contextHint}</p>
              </div>
            )}

            {/* Archetype Tab */}
            {activeTab === "archetype" && archetypeInfo && (
              <div className="space-y-3">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{archetypeInfo.icon}</span>
                  <div>
                    <div className="font-retro text-sm font-bold text-cyan-300">{archetypeInfo.name}</div>
                    <div className="font-retro text-xs text-cyan-600">{archetypeInfo.roleTitle}</div>
                  </div>
                </div>
                <div className="rounded-xl border border-cyan-900/60 bg-cyan-950/40 p-3.5">
                  <div className="font-retro text-xs text-cyan-400 mb-1">SPECIALIZATION PATH</div>
                  <p className="font-sans text-sm text-slate-200 leading-relaxed">{archetypeInfo.description}</p>
                </div>
                <div className="rounded-xl border border-purple-900/60 bg-purple-950/40 p-3.5">
                  <div className="font-retro text-xs text-purple-400 mb-1">⚡ TRAIT BONUS</div>
                  <p className="font-sans text-sm text-purple-200">{archetypeInfo.traitBonus}</p>
                </div>
                <div className="rounded-xl border border-amber-900/60 bg-amber-950/40 p-3">
                  <span className="font-retro text-xs text-amber-400">🔮 STARTER SPELL: </span>
                  <span className="font-mono text-sm text-amber-200">{archetypeInfo.starterSpell}</span>
                </div>
              </div>
            )}
          </div>

          {/* Day Indicator Footer */}
          <div className="border-t border-emerald-900/50 px-5 py-2.5 flex items-center justify-between">
            <span className="font-retro text-[10px] text-emerald-600">
              DAY {currentDay} • FLOOR {week}
            </span>
            <span className="font-retro text-[10px] text-emerald-600">
              PYODIDE 3.11 ENGINE ONLINE
            </span>
          </div>
        </div>
      )}
    </>
  );
}
