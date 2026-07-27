"use client";

import { useState } from "react";
import { Quest, SubQuest, MiniBoss, Archetype } from "@/lib/db/models";
import { CodeEditor } from "./CodeEditor";

interface SubQuestStepperProps {
  quest: Quest;
  completedSubQuestIds: string[];
  completedMiniBoss: boolean;
  userArchetype?: Archetype;
  onCompleteSubQuest: (subQuestId: string, code: string) => void;
  onCompleteMiniBoss: (code: string) => void;
}

export function SubQuestStepper({
  quest,
  completedSubQuestIds,
  completedMiniBoss,
  userArchetype,
  onCompleteSubQuest,
  onCompleteMiniBoss
}: SubQuestStepperProps) {
  const [activeStep, setActiveStep] = useState(0);

  const completedSet = new Set(completedSubQuestIds);
  const totalSteps = quest.subQuests.length + (quest.miniBoss ? 1 : 0);

  const isMiniBossStep = activeStep === quest.subQuests.length;
  const currentSubQuest: SubQuest | undefined = quest.subQuests[activeStep];
  const miniBoss: MiniBoss | undefined = quest.miniBoss;

  // Resolve archetype-specific variant for current sub-quest (if available)
  const archetypeVariant = userArchetype && currentSubQuest?.archetypeVariant?.[userArchetype];
  const activeTitle = archetypeVariant?.title ?? currentSubQuest?.title;
  const activeNarrative = archetypeVariant?.narrative ?? currentSubQuest?.narrative;
  const activeCodeTask = archetypeVariant?.codeTask ?? currentSubQuest?.codeTask;
  const activeStarterCode = archetypeVariant?.starterCode ?? currentSubQuest?.starterCode;
  const activeTestAssertion = archetypeVariant?.testAssertion ?? currentSubQuest?.testAssertion;

  return (
    <div className="space-y-6">
      {/* Stepper Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-slate-800 bg-slate-900/60 p-2">
        {quest.subQuests.map((sq, idx) => {
          const isDone = completedSet.has(sq.id);
          const isActive = activeStep === idx;
          return (
            <button
              key={sq.id}
              onClick={() => setActiveStep(idx)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
                isActive
                  ? "bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/20"
                  : isDone
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                  : "bg-slate-800/60 text-slate-300 hover:bg-slate-800"
              }`}
            >
              <span>{isDone ? "✓" : `Quest ${idx + 1}`}</span>
              <span className="truncate max-w-[120px]">{sq.title.split(":")[1] || sq.title}</span>
              <span className="rounded bg-slate-950/40 px-1.5 py-0.5 text-[10px]">+50 XP</span>
            </button>
          );
        })}

        {miniBoss && (
          <button
            onClick={() => setActiveStep(quest.subQuests.length)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
              isMiniBossStep
                ? "bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-md shadow-rose-500/20"
                : completedMiniBoss
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                : "bg-rose-950/40 text-rose-300 border border-rose-500/30 hover:bg-rose-950/70"
            }`}
          >
            <span>👹 Mini-Boss: {miniBoss.bossName}</span>
            <span className="rounded bg-slate-950/40 px-1.5 py-0.5 text-[10px]">+150 XP</span>
          </button>
        )}
      </div>

      {/* Main Step Content */}
      {!isMiniBossStep && currentSubQuest && (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-400 border border-cyan-500/20">
              Side Quest {activeStep + 1} of {quest.subQuests.length}
            </span>
            <div className="flex items-center gap-2">
              {archetypeVariant && (
                <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-400 border border-amber-500/20">
                  ⚡ Archetype Variant Active
                </span>
              )}
              <span className="text-xs font-semibold text-emerald-400">+50 XP Reward</span>
            </div>
          </div>

          <h2 className="mt-3 text-2xl font-bold text-white">{activeTitle}</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">{activeNarrative}</p>

          <div className="mt-4 rounded-2xl border border-cyan-500/20 bg-cyan-950/30 p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300">Spell Knowledge</h4>
            <p className="mt-1 text-xs leading-relaxed text-slate-200">{currentSubQuest.conceptExplanation}</p>
          </div>

          <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950 p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">Quest Requirement</h4>
            <p className="mt-1 text-sm font-semibold text-white">{activeCodeTask}</p>
          </div>

          <div className="mt-6">
            <CodeEditor
              initialCode={activeStarterCode ?? ""}
              testAssertion={activeTestAssertion}
              hints={currentSubQuest.hints}
              onSuccess={(code) => onCompleteSubQuest(currentSubQuest.id, code)}
              submitLabel="Cast Quest Spell"
            />
          </div>
        </div>
      )}

      {/* Daily Mini-Boss Fight Step */}
      {isMiniBossStep && miniBoss && (
        <div className="rounded-3xl border border-rose-500/30 bg-gradient-to-b from-rose-950/30 via-slate-900/60 to-slate-950 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-rose-500/20 px-3 py-1 text-xs font-bold text-rose-300 border border-rose-500/30">
              ⚔️ DAILY MINI-BOSS BATTLE
            </span>
            <span className="text-xs font-semibold text-amber-400">+150 XP & Loot Reward</span>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <span className="text-5xl">{miniBoss.bossAvatar}</span>
            <div>
              <h2 className="text-2xl font-black text-rose-300">{miniBoss.bossName}</h2>
              <p className="text-xs font-semibold text-slate-400">{miniBoss.bossTitle}</p>
            </div>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-slate-300">{miniBoss.narrative}</p>

          <div className="mt-4 rounded-2xl border border-rose-500/30 bg-rose-950/40 p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400">Boss Counter Strike Task</h4>
            <p className="mt-1 text-sm font-semibold text-white">{miniBoss.combatTask}</p>
          </div>

          <div className="mt-6">
            <CodeEditor
              initialCode={miniBoss.starterCode}
              testAssertion={miniBoss.testAssertion}
              onSuccess={(code) => onCompleteMiniBoss(code)}
              submitLabel={`Strike ${miniBoss.bossName}`}
            />
          </div>
        </div>
      )}
    </div>
  );
}
