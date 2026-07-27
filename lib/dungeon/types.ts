// lib/dungeon/types.ts
// Core type definitions for the dungeon game engine

export type TileType =
  | 'floor'
  | 'wall'
  | 'chest'        // SubQuest obstacle — interact to trigger Python challenge
  | 'enemy'        // MiniBoss obstacle — interact to trigger boss fight
  | 'door_locked'  // Impassable until linked quest is solved
  | 'door_open'    // Passable after quest solved (runtime only)
  | 'exit'         // Day complete portal — walkable after miniboss defeated
  | 'sign'         // Tutorial NPC/sign — press E to read
  | 'book'         // Source of Truth book — press E to read real-world skills
  | 'cloud_zone'   // Context Cloud trigger zone
  | 'spawn';       // Player start tile (treated as floor during play)

/** Map char → tile type for parsing string maps */
export const TILE_CHARS: Record<string, TileType> = {
  W: 'wall',
  '.': 'floor',
  '@': 'spawn',
  C: 'chest',
  E: 'enemy',
  D: 'door_locked',
  X: 'exit',
  S: 'sign',
  B: 'book',
  K: 'cloud_zone',
};

/** Tiles the player can walk through */
export const WALKABLE: ReadonlySet<TileType> = new Set([
  'floor', 'spawn', 'cloud_zone', 'exit', 'sign', 'book',
]);

/** Tiles the player can interact with (E/Space) */
export const INTERACTIVE: ReadonlySet<TileType> = new Set([
  'chest', 'enemy', 'sign', 'book',
]);

export type DungeonTheme = 'syntaxia' | 'cavern' | 'citadel' | 'realm';

/** Theme → color palette */
export const THEME_COLORS: Record<DungeonTheme, {
  bg: string;
  floor: string;
  floorGrid: string;
  wall: string;
  wallTop: string;
  wallShadow: string;
  accent: string;
  cloudFloor: string;
}> = {
  syntaxia: {
    bg:         '#050d09',
    floor:      '#0b1f10',
    floorGrid:  'rgba(34,197,94,0.04)',
    wall:       '#1a3d22',
    wallTop:    '#2d6638',
    wallShadow: 'rgba(0,0,0,0.5)',
    accent:     '#22c55e',
    cloudFloor: 'rgba(6,182,212,0.12)',
  },
  cavern: {
    bg:         '#050d0d',
    floor:      '#0b1f1a',
    floorGrid:  'rgba(16,185,129,0.04)',
    wall:       '#1a3d32',
    wallTop:    '#2d6a52',
    wallShadow: 'rgba(0,0,0,0.5)',
    accent:     '#10b981',
    cloudFloor: 'rgba(6,182,212,0.12)',
  },
  citadel: {
    bg:         '#0a0512',
    floor:      '#130d22',
    floorGrid:  'rgba(168,85,247,0.04)',
    wall:       '#2d1a55',
    wallTop:    '#4a2d88',
    wallShadow: 'rgba(0,0,0,0.5)',
    accent:     '#a855f7',
    cloudFloor: 'rgba(168,85,247,0.12)',
  },
  realm: {
    bg:         '#100802',
    floor:      '#1e1004',
    floorGrid:  'rgba(245,158,11,0.04)',
    wall:       '#3d2209',
    wallTop:    '#6a3d0f',
    wallShadow: 'rgba(0,0,0,0.5)',
    accent:     '#f59e0b',
    cloudFloor: 'rgba(245,158,11,0.12)',
  },
};

/** Archetype → canvas sprite emoji */
export const ARCHETYPE_SPRITES: Record<string, string> = {
  wizard:    '🧙',
  rogue:     '🥷',
  warrior:   '⚔',
  healer:    '🛡',
  trickster: '🃏',
  ranger:    '🏹',
  tank:      '🏰',
  default:   '👾',
};

/** Archetype → HEX tint for player glow */
export const ARCHETYPE_COLORS: Record<string, string> = {
  wizard:    '#06b6d4',
  rogue:     '#f43f5e',
  warrior:   '#f59e0b',
  healer:    '#22c55e',
  trickster: '#a855f7',
  ranger:    '#10b981',
  tank:      '#3b82f6',
  default:   '#94a3b8',
};

/** Dungeon obstacle — maps a tile to a quest ID */
export interface ObstacleConfig {
  tileX: number;
  tileY: number;
  type: 'chest' | 'enemy' | 'sign' | 'door' | 'book';
  questId: string;       // matches SubQuest.id, MiniBoss.id, or a door ID
  label: string;         // shown above the obstacle when in range
  unlocksWhen?: string;  // for doors: the questId that must be solved first
  message?: string;      // for signs: the tutorial message to display
  dayNumber?: number;    // for books: day number for Source of Truth lookup
}

/** Tutorial overlay zone — a rectangular area that triggers a tip */
export interface TutorialZone {
  tileX: number;
  tileY: number;
  width: number;
  height: number;
  tip: string;
  icon: string;
  triggeredOnce?: boolean;
}

export interface DungeonLevel {
  dayNumber: number;
  name: string;
  theme: DungeonTheme;
  /** 
   * Array of row strings. Each char maps to a TileType via TILE_CHARS.
   * Maps should be 25 chars wide × 15 rows tall.
   * Out-of-bounds or unmapped chars default to 'wall'.
   */
  map: string[];
  spawnX: number;
  spawnY: number;
  obstacles: ObstacleConfig[];
  isTutorial?: boolean;
  tutorialZones?: TutorialZone[];
}
