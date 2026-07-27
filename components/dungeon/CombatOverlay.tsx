"use client";

import React from "react";
import { SubQuest, MiniBoss } from "@/lib/db/models";
import { ObstacleConfig } from "@/lib/dungeon/types";
import { CodeEditor } from "@/components/CodeEditor";

interface CombatOverlayProps {
  obstacle: ObstacleConfig;
  subQuest?: SubQuest;
  miniBoss?: MiniBoss;
  userArchetype?: string;
  onSolveSubQuest: (subQuestId: string, code: string) => void;
  onSolveMiniBoss: (code: string) => void;
  onClose: () => void;
}

export function CombatOverlay({
  obstacle,
  subQuest,
  miniBoss,
  userArchetype = "wizard",
  onSolveSubQuest,
  onSolveMiniBoss,
  onClose,
}: CombatOverlayProps) {
  // Resolve archetype variant if present on subQuest
  const variant = subQuest?.archetypeVariant?.[userArchetype as keyof typeof subQuest.archetypeVariant];

  const title = variant?.title || subQuest?.title || miniBoss?.bossName || obstacle.label;
  const narrative = variant?.narrative || subQuest?.narrative || miniBoss?.narrative || "";
  const codeTask = variant?.codeTask || subQuest?.codeTask || miniBoss?.combatTask || "";
  const starterCode = variant?.starterCode || subQuest?.starterCode || miniBoss?.starterCode || "";
  const testAssertion = variant?.testAssertion || subQuest?.testAssertion || miniBoss?.testAssertion || "";
  const hints = subQuest?.hints || ["Check syntax carefully!"];

  const isBoss = obstacle.type === "enemy";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md overflow-y-auto">
      <div
        className={`w-full max-w-3xl rounded-3xl border-2 ${
          isBoss
            ? "border-rose-500/80 bg-[#120508]/95 shadow-[0_0_50px_rgba(244,63,94,0.3)]"
            : "border-cyan-500/80 bg-[#050e14]/95 shadow-[0_0_50px_rgba(6,182,212,0.3)]"
        } p-6 sm:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto`}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{isBoss ? "👺" : "🎁"}</span>
            <div>
              <span
                className={`font-retro text-[10px] uppercase tracking-widest ${
                  isBoss ? "text-rose-400" : "text-cyan-400"
                }`}
              >
                {isBoss ? "DUNGEON GATEKEEPER BOSS" : "SIDE QUEST CHEST"}
              </span>
              <h2 className="font-pixel text-xl sm:text-2xl font-bold text-white">
                {title}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-1.5 font-retro text-xs text-slate-400 hover:text-white hover:border-slate-500 transition"
          >
            ✕ ESC
          </button>
        </div>

        {/* Narrative & Task */}
        <div className="space-y-4">
          {narrative && (
            <p className="font-sans text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              {narrative}
            </p>
          )}

          {subQuest?.conceptExplanation && (
            <div className="rounded-xl border border-cyan-500/20 bg-cyan-950/30 p-4">
              <span className="font-retro text-[10px] text-cyan-400 uppercase tracking-widest block mb-1">
                🔮 SPELL KNOWLEDGE
              </span>
              <p className="font-sans text-xs text-cyan-200">
                {subQuest.conceptExplanation}
              </p>
            </div>
          )}

          <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4">
            <span className="font-retro text-[10px] text-amber-400 uppercase tracking-widest block mb-1">
              ⚡ QUEST OBJECTIVE
            </span>
            <p className="font-sans text-sm font-semibold text-white">
              {codeTask}
            </p>
          </div>
        </div>

        {/* Python Code Editor */}
        <div className="mt-4">
          <CodeEditor
            initialCode={starterCode}
            testAssertion={testAssertion}
            hints={hints}
            onSuccess={(code) => {
              if (isBoss) {
                onSolveMiniBoss(code);
              } else if (subQuest) {
                onSolveSubQuest(subQuest.id, code);
              }
            }}
            submitLabel={isBoss ? "Cast Boss Finisher Spell" : "Unlock Chest Spell"}
          />
        </div>
      </div>
    </div>
  );
}
