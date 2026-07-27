export type Archetype = 
  | 'wizard'   // AI focus, generative AI and logical reasoning
  | 'warrior'  // Data Science
  | 'trickster'// Game Development
  | 'rogue'    // Cybersecurity tools (red team)
  | 'ranger'   // Web Development
  | 'healer'   // Cybersecurity (blue team)
  | 'tank';    // Software Development

export interface ArchetypeDetails {
  id: Archetype;
  name: string;
  roleTitle: string;
  focusArea: string;
  icon: string;
  description: string;
  traitBonus: string;
  starterSpell: string;
}

export const ARCHETYPES: Record<Archetype, ArchetypeDetails> = {
  wizard: {
    id: 'wizard',
    name: 'Wizard',
    roleTitle: 'Archmage of Neural Logic',
    focusArea: 'AI & Generative Reasoning',
    icon: '🧙‍♂️',
    description: 'Focuses on logic gate puzzles and semantic text processing. Mid-game challenges involve writing structured prompts or parsing response strings using local SLM interfaces.',
    traitBonus: '+15% Mana efficiency on AI & algorithmic puzzles.',
    starterSpell: 'Promptic Bolt'
  },
  warrior: {
    id: 'warrior',
    name: 'Warrior',
    roleTitle: 'Titan of Data Analytics',
    focusArea: 'Data Science & Matrix Operations',
    icon: '⚔️',
    description: 'Focuses on horde management (large dataset filtering). Challenges require list comprehensions and array operations to filter active threats (e.g., [e for e in enemies if e.is_active]).',
    traitBonus: '+20% Critical Hit damage when solving list & dataframe array challenges.',
    starterSpell: 'Data Cleave'
  },
  trickster: {
    id: 'trickster',
    name: 'Trickster',
    roleTitle: 'Master of Game Engines',
    focusArea: 'Game Development & Animation Logic',
    icon: '🃏',
    description: 'Weaver of physics loops, sprite collisions, and interactive gaming worlds. Challenges involve timing, event loops, and pixel-grid coordinate systems.',
    traitBonus: 'Dodge 1 failed execution per daily challenge with Illusion Shield.',
    starterSpell: 'Sprite Warp'
  },
  rogue: {
    id: 'rogue',
    name: 'Rogue',
    roleTitle: 'Red Team Cyber Shadow',
    focusArea: 'Offensive Security & PenTesting',
    icon: '🗡️',
    description: 'Focuses on decoding locks, regex matching, and payload creation. Challenges include intercepting mock network packet lists and extracting auth tokens via string slicing.',
    traitBonus: 'Uncovers secret hints and backdoor exploit solutions.',
    starterSpell: 'Shadow Infiltration'
  },
  ranger: {
    id: 'ranger',
    name: 'Ranger',
    roleTitle: 'Web Realm Navigator',
    focusArea: 'Web Development & RESTful API Architecture',
    icon: '🏹',
    description: 'Builder of web services, API endpoints, microservices, and client interfaces. Challenges involve HTTP request handling and JSON data wrangling.',
    traitBonus: '+15% Speed bonus when building REST endpoints and string builders.',
    starterSpell: 'HTTP Arrow'
  },
  healer: {
    id: 'healer',
    name: 'Healer',
    roleTitle: 'Blue Team Sentinel',
    focusArea: 'Defensive Security & Threat Hunting',
    icon: '🛡️',
    description: 'Focuses on error handling, log parsing, and state protection. Challenges heavily feature try/except blocks to neutralize runtime exceptions and corruption loops.',
    traitBonus: 'Restores 25 HP upon resolving try/except error handling challenges.',
    starterSpell: 'Sanctuary Ward'
  },
  tank: {
    id: 'tank',
    name: 'Tank',
    roleTitle: 'Architect of Software Engineering',
    focusArea: 'Systems Design & OOP Engineering',
    icon: '🏰',
    description: 'Sturdy builder of clean code, object-oriented design patterns, and enterprise tools. Challenges involve class design, inheritance hierarchies, and abstract interfaces.',
    traitBonus: 'Absorbs syntax errors with Ironclad Refactoring.',
    starterSpell: 'OOP Bastion'
  }
};

export interface SubQuest {
  id: string;
  title: string;
  narrative: string;
  conceptExplanation: string;
  codeTask: string;
  starterCode: string;
  solutionCode: string;
  testAssertion: string; // JavaScript / Pyodide assertion check code
  xpReward: number;
  hints: string[];
  contextCloudHint?: string; // Syntax cheat-sheet snippet shown in the Context Cloud companion
  archetypeVariant?: Partial<Record<Archetype, {
    title?: string;
    narrative?: string;
    codeTask?: string;
    starterCode?: string;
    solutionCode?: string;
    testAssertion?: string;
  }>>;
}

export interface MiniBoss {
  id: string;
  bossName: string;
  bossTitle: string;
  bossAvatar: string;
  bossHp: number;
  narrative: string;
  combatTask: string;
  starterCode: string;
  solutionCode: string;
  testAssertion: string;
  xpReward: number;
  lootReward: string;
}

export interface Quest {
  _id?: string;
  dayNumber: number;
  title: string;
  subtitle: string;
  chapterWeek: number; // 1, 2, 3, or 4
  floorLevel?: number; // 1-4, corresponds to the 4 narrative Floor Levels in the dungeon arc
  category: string;
  isWeeklyBossDay: boolean; // true for Days 7, 14, 21, 28
  subQuests: SubQuest[];
  miniBoss?: MiniBoss;
}

export interface WeeklyBossQuestion {
  id: string;
  title: string;
  prompt: string;
  combatPhase: string; // e.g. "Phase 1: Armor Break"
  starterCode: string;
  solutionCode: string;
  testAssertion: string;
  damageValue: number;
}

export interface WeeklyBoss {
  _id?: string;
  weekNumber: number; // 1, 2, 3, 4
  dayNumber: number; // 7, 14, 21, 28
  bossName: string;
  bossTitle: string;
  bossAvatar: string;
  bossHp: number;
  narrative: string;
  questions: WeeklyBossQuestion[];
  xpReward: number;
  lootBadge: string;
}

export interface UserProfile {
  _id?: string;
  username: string;
  displayName: string;
  archetype?: Archetype;
  characterClass?: string;
  level: number;
  xp: number;
  hp: number;
  maxHp: number;
  mana: number;
  maxMana: number;
  currentDay: number;
  completedSubQuestIds: string[];
  completedMiniBossDays: number[];
  completedWeeklyBossWeeks: number[];
  lootInventory: string[];
  userCodeSubmissions: Record<string, string>; // questId/subQuestId -> user's code
  createdAt: Date;
  updatedAt: Date;
}
