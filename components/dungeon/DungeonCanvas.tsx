"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  DungeonLevel,
  ObstacleConfig,
  THEME_COLORS,
  ARCHETYPE_SPRITES,
  ARCHETYPE_COLORS,
  WALKABLE,
  INTERACTIVE,
  TileType,
  TILE_CHARS,
} from "@/lib/dungeon/types";
import { SOURCE_OF_TRUTH, SourceOfTruthEntry } from "@/lib/dungeon/sourceOfTruth";

interface DungeonCanvasProps {
  level: DungeonLevel;
  userArchetype?: string;
  completedSubQuestIds: string[];
  completedMiniBoss: boolean;
  onObstacleInteract: (obstacle: ObstacleConfig) => void;
  onContextCloudTrigger?: () => void;
  onExitReach?: () => void;
}

const TILE_SIZE = 46; // 46px per tile (15% larger)
const VIEWPORT_WIDTH = 20; // 20 tiles wide viewport (920px)
const VIEWPORT_HEIGHT = 12; // 12 tiles tall viewport (552px)

function drawArchetypeSprite(
  ctx: CanvasRenderingContext2D,
  archetype: string,
  px: number,
  py: number,
  tileSize: number
) {
  const cx = px + tileSize / 2;
  const cy = py + tileSize / 2;
  const t = Date.now() / 200; // pulse timer

  ctx.save();

  switch (archetype) {
    case "wizard": {
      const aura = Math.sin(t) * 2 + 10;
      ctx.shadowColor = "#06b6d4";
      ctx.shadowBlur = aura;
      ctx.fillStyle = "rgba(6, 182, 212, 0.25)";
      ctx.beginPath();
      ctx.arc(cx, cy, 18, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#3b0764";
      ctx.beginPath();
      ctx.moveTo(cx - 10, cy + 16);
      ctx.lineTo(cx + 10, cy + 16);
      ctx.lineTo(cx + 6, cy - 2);
      ctx.lineTo(cx - 6, cy - 2);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#06b6d4";
      ctx.fillRect(cx - 2, cy - 2, 4, 18);

      ctx.fillStyle = "#fde047";
      ctx.fillRect(cx - 5, cy - 8, 10, 7);

      ctx.fillStyle = "#06b6d4";
      ctx.fillRect(cx - 3, cy - 6, 2, 2);
      ctx.fillRect(cx + 1, cy - 6, 2, 2);

      ctx.fillStyle = "#0284c7";
      ctx.beginPath();
      ctx.moveTo(cx - 12, cy - 7);
      ctx.lineTo(cx + 12, cy - 7);
      ctx.lineTo(cx + 8, cy - 9);
      ctx.lineTo(cx, cy - 22);
      ctx.lineTo(cx - 8, cy - 9);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#f59e0b";
      ctx.fillRect(cx - 8, cy - 9, 16, 2);
      ctx.fillStyle = "#fbbf24";
      ctx.font = "9px monospace";
      ctx.fillText("★", cx - 3, cy - 11);

      ctx.strokeStyle = "#78350f";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(cx + 11, cy + 14);
      ctx.lineTo(cx + 11, cy - 10);
      ctx.stroke();

      ctx.shadowColor = "#38bdf8";
      ctx.shadowBlur = 12;
      ctx.fillStyle = "#60a5fa";
      ctx.beginPath();
      ctx.arc(cx + 11, cy - 12, 5, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case "rogue": {
      const pulse = Math.sin(t * 1.5) * 3 + 12;
      ctx.shadowColor = "#f43f5e";
      ctx.shadowBlur = pulse;
      ctx.fillStyle = "rgba(244, 63, 94, 0.25)";
      ctx.beginPath();
      ctx.arc(cx, cy, 18, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#18181b";
      ctx.beginPath();
      ctx.moveTo(cx - 9, cy + 16);
      ctx.lineTo(cx + 9, cy + 16);
      ctx.lineTo(cx + 5, cy - 2);
      ctx.lineTo(cx - 5, cy - 2);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = "#e11d48";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx - 7, cy - 1);
      ctx.lineTo(cx + 7, cy + 14);
      ctx.moveTo(cx + 7, cy - 1);
      ctx.lineTo(cx - 7, cy + 14);
      ctx.stroke();

      ctx.fillStyle = "#881337";
      ctx.beginPath();
      ctx.arc(cx, cy - 7, 8, Math.PI, 0);
      ctx.lineTo(cx + 8, cy - 1);
      ctx.lineTo(cx - 8, cy - 1);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#09090b";
      ctx.fillRect(cx - 6, cy - 7, 12, 4);
      ctx.fillStyle = "#f43f5e";
      ctx.fillRect(cx - 4, cy - 6, 2, 2);
      ctx.fillRect(cx + 2, cy - 6, 2, 2);

      ctx.strokeStyle = "#e2e8f0";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx + 9, cy + 5);
      ctx.lineTo(cx + 14, cy - 5);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cx - 9, cy + 5);
      ctx.lineTo(cx - 14, cy - 5);
      ctx.stroke();
      break;
    }

    case "warrior": {
      ctx.shadowColor = "#f59e0b";
      ctx.shadowBlur = 12;
      ctx.fillStyle = "rgba(245, 158, 11, 0.25)";
      ctx.beginPath();
      ctx.arc(cx, cy, 19, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#475569";
      ctx.fillRect(cx - 10, cy - 2, 20, 18);
      ctx.fillStyle = "#f59e0b";
      ctx.fillRect(cx - 12, cy - 3, 5, 6);
      ctx.fillRect(cx + 7, cy - 3, 5, 6);

      ctx.fillStyle = "#334155";
      ctx.fillRect(cx - 7, cy - 14, 14, 11);
      ctx.fillStyle = "#f59e0b";
      ctx.beginPath();
      ctx.moveTo(cx - 7, cy - 12);
      ctx.lineTo(cx - 13, cy - 18);
      ctx.lineTo(cx - 6, cy - 8);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(cx + 7, cy - 12);
      ctx.lineTo(cx + 13, cy - 18);
      ctx.lineTo(cx + 6, cy - 8);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#fbbf24";
      ctx.fillRect(cx - 5, cy - 10, 10, 3);

      ctx.fillStyle = "#e2e8f0";
      ctx.fillRect(cx + 10, cy - 16, 4, 24);
      ctx.fillStyle = "#f59e0b";
      ctx.fillRect(cx + 8, cy + 4, 8, 3);
      break;
    }

    case "healer": {
      ctx.shadowColor = "#10b981";
      ctx.shadowBlur = 14;
      ctx.fillStyle = "rgba(16, 185, 129, 0.25)";
      ctx.beginPath();
      ctx.arc(cx, cy, 19, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#047857";
      ctx.beginPath();
      ctx.moveTo(cx - 9, cy + 16);
      ctx.lineTo(cx + 9, cy + 16);
      ctx.lineTo(cx + 5, cy - 2);
      ctx.lineTo(cx - 5, cy - 2);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(cx - 2, cy + 2, 4, 10);
      ctx.fillRect(cx - 5, cy + 5, 10, 4);

      ctx.fillStyle = "#fde047";
      ctx.fillRect(cx - 5, cy - 8, 10, 7);

      ctx.strokeStyle = "#f59e0b";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy - 13, 7, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = "#10b981";
      ctx.fillRect(cx - 14, cy - 4, 7, 16);
      ctx.strokeStyle = "#ffffff";
      ctx.strokeRect(cx - 14, cy - 4, 7, 16);
      break;
    }

    case "trickster": {
      ctx.shadowColor = "#a855f7";
      ctx.shadowBlur = 12;
      ctx.fillStyle = "rgba(168, 85, 247, 0.25)";
      ctx.beginPath();
      ctx.arc(cx, cy, 18, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#6b21a8";
      ctx.fillRect(cx - 8, cy - 2, 16, 18);

      ctx.fillStyle = "#fed7aa";
      ctx.fillRect(cx - 5, cy - 8, 10, 7);

      ctx.fillStyle = "#c084fc";
      ctx.beginPath();
      ctx.moveTo(cx - 8, cy - 8);
      ctx.lineTo(cx - 15, cy - 16);
      ctx.lineTo(cx - 3, cy - 8);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(cx + 8, cy - 8);
      ctx.lineTo(cx + 15, cy - 16);
      ctx.lineTo(cx + 3, cy - 8);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#fbbf24";
      ctx.beginPath();
      ctx.arc(cx - 15, cy - 16, 2.5, 0, Math.PI * 2);
      ctx.arc(cx + 15, cy - 16, 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(cx + 9, cy - 6, 5, 7);
      ctx.fillRect(cx - 13, cy + 2, 5, 7);
      break;
    }

    case "ranger": {
      ctx.shadowColor = "#22c55e";
      ctx.shadowBlur = 12;
      ctx.fillStyle = "rgba(34, 197, 94, 0.25)";
      ctx.beginPath();
      ctx.arc(cx, cy, 18, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#15803d";
      ctx.fillRect(cx - 8, cy - 2, 16, 18);

      ctx.fillStyle = "#166534";
      ctx.beginPath();
      ctx.arc(cx, cy - 6, 8, Math.PI, 0);
      ctx.lineTo(cx + 7, cy - 1);
      ctx.lineTo(cx - 7, cy - 1);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#86efac";
      ctx.fillRect(cx - 4, cy - 5, 2, 2);
      ctx.fillRect(cx + 2, cy - 5, 2, 2);

      ctx.strokeStyle = "#b45309";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(cx + 10, cy + 2, 11, -Math.PI / 2, Math.PI / 2);
      ctx.stroke();
      break;
    }

    case "tank": {
      ctx.shadowColor = "#3b82f6";
      ctx.shadowBlur = 14;
      ctx.fillStyle = "rgba(59, 130, 246, 0.25)";
      ctx.beginPath();
      ctx.arc(cx, cy, 21, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#1e293b";
      ctx.fillRect(cx - 12, cy - 4, 24, 20);
      ctx.fillStyle = "#3b82f6";
      ctx.fillRect(cx - 4, cy - 4, 8, 20);

      ctx.fillStyle = "#334155";
      ctx.fillRect(cx - 9, cy - 16, 18, 12);
      ctx.fillStyle = "#60a5fa";
      ctx.fillRect(cx - 6, cy - 11, 12, 3);

      ctx.fillStyle = "#1e3a8a";
      ctx.fillRect(cx - 16, cy - 8, 8, 22);
      ctx.strokeStyle = "#60a5fa";
      ctx.strokeRect(cx - 16, cy - 8, 8, 22);
      break;
    }

    default: {
      ctx.shadowColor = "#94a3b8";
      ctx.shadowBlur = 10;
      ctx.fillStyle = "#94a3b8";
      ctx.beginPath();
      ctx.arc(cx, cy, 14, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
  }

  ctx.restore();
}

export function DungeonCanvas({
  level,
  userArchetype = "wizard",
  completedSubQuestIds,
  completedMiniBoss,
  onObstacleInteract,
  onContextCloudTrigger,
  onExitReach,
}: DungeonCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [playerGrid, setPlayerGrid] = useState({ x: level.spawnX, y: level.spawnY });
  const renderPosRef = useRef({ x: level.spawnX * TILE_SIZE, y: level.spawnY * TILE_SIZE });

  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const lastMoveTime = useRef<number>(0);
  const MOVE_COOLDOWN = 140;

  const [nearObstacle, setNearObstacle] = useState<ObstacleConfig | null>(null);
  const nearObstacleRef = useRef<ObstacleConfig | null>(null);

  const [activeSignMessage, setActiveSignMessage] = useState<string | null>(null);
  const [activeBookData, setActiveBookData] = useState<SourceOfTruthEntry | null>(null);
  const [tutorialTip, setTutorialTip] = useState<string | null>(null);

  const updateNearObstacle = (obs: ObstacleConfig | null) => {
    nearObstacleRef.current = obs;
    setNearObstacle(obs);
  };

  const completedSet = useRef(new Set(completedSubQuestIds));
  useEffect(() => {
    completedSet.current = new Set(completedSubQuestIds);
  }, [completedSubQuestIds]);

  const completedMiniBossRef = useRef(completedMiniBoss);
  useEffect(() => {
    completedMiniBossRef.current = completedMiniBoss;
  }, [completedMiniBoss]);

  const gridHeight = level.map.length;
  const gridWidth = Math.max(...level.map.map((r) => r.length));

  const getTile = useCallback(
    (x: number, y: number): TileType => {
      if (y < 0 || y >= gridHeight || x < 0 || x >= gridWidth) return "wall";
      const char = level.map[y]?.[x] || "W";
      const tileType = TILE_CHARS[char] || "wall";

      if (tileType === "door_locked") {
        const obs = level.obstacles.find((o) => o.tileX === x && o.tileY === y);
        if (obs && obs.unlocksWhen && completedSet.current.has(obs.unlocksWhen)) {
          return "door_open";
        }
      }
      return tileType;
    },
    [level, gridHeight, gridWidth]
  );

  const isPassable = useCallback(
    (x: number, y: number): boolean => {
      const tile = getTile(x, y);
      if (WALKABLE.has(tile) || tile === "door_open") return true;

      const obs = level.obstacles.find((o) => o.tileX === x && o.tileY === y);
      if (obs) {
        if (obs.type === "chest" && completedSet.current.has(obs.questId)) return true;
        if (obs.type === "enemy" && completedMiniBossRef.current) return true;
      }
      return false;
    },
    [getTile, level.obstacles]
  );

  const checkProximity = useCallback(
    (px: number, py: number) => {
      const obs = level.obstacles.find((o) => {
        const dx = Math.abs(o.tileX - px);
        const dy = Math.abs(o.tileY - py);
        return dx <= 1 && dy <= 1;
      });

      if (obs) {
        updateNearObstacle(obs);
      } else {
        updateNearObstacle(null);
      }

      if (level.tutorialZones) {
        const matchedZone = level.tutorialZones.find(
          (z) => px >= z.tileX && px < z.tileX + z.width && py >= z.tileY && py < z.tileY + z.height
        );
        if (matchedZone) {
          setTutorialTip(matchedZone.tip);
        } else {
          setTutorialTip(null);
        }
      }

      const tile = getTile(px, py);
      if (tile === "cloud_zone" && onContextCloudTrigger) {
        onContextCloudTrigger();
      }

      if (tile === "exit" && onExitReach && completedMiniBossRef.current) {
        onExitReach();
      }
    },
    [level, getTile, onContextCloudTrigger, onExitReach]
  );

  useEffect(() => {
    setPlayerGrid({ x: level.spawnX, y: level.spawnY });
    renderPosRef.current = { x: level.spawnX * TILE_SIZE, y: level.spawnY * TILE_SIZE };
    checkProximity(level.spawnX, level.spawnY);
  }, [level, checkProximity]);

  const movePlayer = useCallback(
    (dx: number, dy: number) => {
      setPlayerGrid((prev) => {
        const nextX = prev.x + dx;
        const nextY = prev.y + dy;
        if (isPassable(nextX, nextY)) {
          checkProximity(nextX, nextY);
          return { x: nextX, y: nextY };
        }
        return prev;
      });
    },
    [isPassable, checkProximity]
  );

  const triggerInteraction = useCallback(
    (obs: ObstacleConfig) => {
      if (obs.type === "sign") {
        setActiveSignMessage(obs.message || "A secret hint scroll.");
      } else if (obs.type === "book") {
        const entry = SOURCE_OF_TRUTH[obs.dayNumber || level.dayNumber] || SOURCE_OF_TRUTH[1];
        setActiveBookData(entry);
      } else {
        onObstacleInteract(obs);
      }
    },
    [onObstacleInteract, level.dayNumber]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement &&
        ["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)
      ) {
        return;
      }

      const key = e.key.toLowerCase();
      const moveKeys = ["w", "a", "s", "d", "arrowup", "arrowdown", "arrowleft", "arrowright"];

      if (moveKeys.includes(key) || key === " " || key === "e") {
        e.preventDefault();
      }

      let dx = 0;
      let dy = 0;
      if (key === "w" || key === "arrowup") dy = -1;
      else if (key === "s" || key === "arrowdown") dy = 1;
      else if (key === "a" || key === "arrowleft") dx = -1;
      else if (key === "d" || key === "arrowright") dx = 1;

      if (dx !== 0 || dy !== 0) {
        if (!keysPressed.current[key]) {
          keysPressed.current[key] = true;
          movePlayer(dx, dy);
          lastMoveTime.current = performance.now();
        }
      }

      if (key === "e" || key === " ") {
        const targetObs = nearObstacleRef.current || nearObstacle;
        if (targetObs) {
          triggerInteraction(targetObs);
        }
      }

      if (e.key === "Escape") {
        setActiveSignMessage(null);
        setActiveBookData(null);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      keysPressed.current[key] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [nearObstacle, triggerInteraction, movePlayer]);

  useEffect(() => {
    let animId: number;

    const gameLoop = (now: number) => {
      if (now - lastMoveTime.current >= MOVE_COOLDOWN) {
        let dx = 0;
        let dy = 0;

        if (keysPressed.current["w"] || keysPressed.current["arrowup"]) dy = -1;
        else if (keysPressed.current["s"] || keysPressed.current["arrowdown"]) dy = 1;
        else if (keysPressed.current["a"] || keysPressed.current["arrowleft"]) dx = -1;
        else if (keysPressed.current["d"] || keysPressed.current["arrowright"]) dx = 1;

        if (dx !== 0 || dy !== 0) {
          movePlayer(dx, dy);
          lastMoveTime.current = now;
        }
      }

      const targetPixelX = playerGrid.x * TILE_SIZE;
      const targetPixelY = playerGrid.y * TILE_SIZE;
      renderPosRef.current.x += (targetPixelX - renderPosRef.current.x) * 0.25;
      renderPosRef.current.y += (targetPixelY - renderPosRef.current.y) * 0.25;

      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          drawDungeon(ctx);
        }
      }

      animId = requestAnimationFrame(gameLoop);
    };

    animId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animId);
  }, [playerGrid, movePlayer, level]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = (VIEWPORT_WIDTH * TILE_SIZE) / rect.width;
    const scaleY = (VIEWPORT_HEIGHT * TILE_SIZE) / rect.height;

    const clickCanvasX = (e.clientX - rect.left) * scaleX;
    const clickCanvasY = (e.clientY - rect.top) * scaleY;

    const playerPixel = renderPosRef.current;
    const cameraX = Math.max(
      0,
      Math.min(gridWidth * TILE_SIZE - VIEWPORT_WIDTH * TILE_SIZE, playerPixel.x - (VIEWPORT_WIDTH * TILE_SIZE) / 2 + TILE_SIZE / 2)
    );
    const cameraY = Math.max(
      0,
      Math.min(gridHeight * TILE_SIZE - VIEWPORT_HEIGHT * TILE_SIZE, playerPixel.y - (VIEWPORT_HEIGHT * TILE_SIZE) / 2 + TILE_SIZE / 2)
    );

    const worldX = Math.floor((clickCanvasX + cameraX) / TILE_SIZE);
    const worldY = Math.floor((clickCanvasY + cameraY) / TILE_SIZE);

    const clickedObs = level.obstacles.find((o) => o.tileX === worldX && o.tileY === worldY);
    if (clickedObs) {
      triggerInteraction(clickedObs);
      return;
    }

    const currentNear = nearObstacleRef.current || nearObstacle;
    if (currentNear) {
      triggerInteraction(currentNear);
    }
  };

  const drawDungeon = (ctx: CanvasRenderingContext2D) => {
    const theme = THEME_COLORS[level.theme] || THEME_COLORS.syntaxia;
    const playerPixel = renderPosRef.current;

    const cameraX = Math.max(
      0,
      Math.min(gridWidth * TILE_SIZE - VIEWPORT_WIDTH * TILE_SIZE, playerPixel.x - (VIEWPORT_WIDTH * TILE_SIZE) / 2 + TILE_SIZE / 2)
    );
    const cameraY = Math.max(
      0,
      Math.min(gridHeight * TILE_SIZE - VIEWPORT_HEIGHT * TILE_SIZE, playerPixel.y - (VIEWPORT_HEIGHT * TILE_SIZE) / 2 + TILE_SIZE / 2)
    );

    ctx.fillStyle = theme.bg;
    ctx.fillRect(0, 0, VIEWPORT_WIDTH * TILE_SIZE, VIEWPORT_HEIGHT * TILE_SIZE);

    ctx.save();
    ctx.translate(-cameraX, -cameraY);

    for (let r = 0; r < gridHeight; r++) {
      for (let c = 0; c < gridWidth; c++) {
        const tileX = c * TILE_SIZE;
        const tileY = r * TILE_SIZE;
        const tileType = getTile(c, r);

        if (
          tileX + TILE_SIZE < cameraX ||
          tileX > cameraX + VIEWPORT_WIDTH * TILE_SIZE ||
          tileY + TILE_SIZE < cameraY ||
          tileY > cameraY + VIEWPORT_HEIGHT * TILE_SIZE
        ) {
          continue;
        }

        ctx.fillStyle = theme.floor;
        ctx.fillRect(tileX, tileY, TILE_SIZE, TILE_SIZE);
        ctx.strokeStyle = theme.floorGrid;
        ctx.strokeRect(tileX, tileY, TILE_SIZE, TILE_SIZE);

        if (tileType === "wall") {
          ctx.fillStyle = theme.wall;
          ctx.fillRect(tileX, tileY, TILE_SIZE, TILE_SIZE);
          ctx.fillStyle = theme.wallTop;
          ctx.fillRect(tileX + 2, tileY + 2, TILE_SIZE - 4, TILE_SIZE - 6);
        } else if (tileType === "door_locked") {
          ctx.fillStyle = "#881337";
          ctx.fillRect(tileX + 4, tileY + 4, TILE_SIZE - 8, TILE_SIZE - 8);
          ctx.strokeStyle = "#f43f5e";
          ctx.lineWidth = 2;
          ctx.strokeRect(tileX + 4, tileY + 4, TILE_SIZE - 8, TILE_SIZE - 8);
          ctx.fillStyle = "#ffffff";
          ctx.font = "16px monospace";
          ctx.fillText("🔒", tileX + 13, tileY + 29);
        } else if (tileType === "door_open") {
          ctx.fillStyle = "rgba(34,197,94,0.15)";
          ctx.fillRect(tileX, tileY, TILE_SIZE, TILE_SIZE);
          ctx.strokeStyle = "rgba(34,197,94,0.4)";
          ctx.strokeRect(tileX + 4, tileY + 4, TILE_SIZE - 8, TILE_SIZE - 8);
        } else if (tileType === "cloud_zone") {
          ctx.fillStyle = theme.cloudFloor;
          ctx.fillRect(tileX, tileY, TILE_SIZE, TILE_SIZE);
          ctx.fillStyle = "rgba(6,182,212,0.7)";
          ctx.font = "14px monospace";
          ctx.fillText("☁️", tileX + 14, tileY + 28);
        } else if (tileType === "exit") {
          ctx.fillStyle = "rgba(245,158,11,0.2)";
          ctx.fillRect(tileX, tileY, TILE_SIZE, TILE_SIZE);
          ctx.fillStyle = "#fbbf24";
          ctx.font = "22px monospace";
          ctx.fillText("✨", tileX + 11, tileY + 31);
        }
      }
    }

    // Render Obstacles (Chests, Enemies, Signs, Books)
    for (const obs of level.obstacles) {
      const ox = obs.tileX * TILE_SIZE;
      const oy = obs.tileY * TILE_SIZE;

      if (obs.type === "chest") {
        const isCleared = completedSet.current.has(obs.questId);
        ctx.font = "26px sans-serif";
        if (isCleared) {
          ctx.fillText("📦", ox + 9, oy + 32);
          ctx.fillStyle = "rgba(148,163,184,0.3)";
          ctx.fillRect(ox + 4, oy + 4, TILE_SIZE - 8, TILE_SIZE - 8);
        } else {
          const pulse = Math.sin(Date.now() / 200) * 0.3 + 0.7;
          ctx.shadowColor = "#f59e0b";
          ctx.shadowBlur = 12 * pulse;
          ctx.fillText("🎁", ox + 9, oy + 32);
          ctx.shadowBlur = 0;
        }
      } else if (obs.type === "enemy") {
        const isDefeated = completedMiniBossRef.current;
        if (!isDefeated) {
          const pulse = Math.sin(Date.now() / 150) * 0.4 + 0.6;
          ctx.shadowColor = "#ef4444";
          ctx.shadowBlur = 14 * pulse;
          ctx.font = "28px sans-serif";
          ctx.fillText("👺", ox + 7, oy + 34);
          ctx.shadowBlur = 0;
        } else {
          ctx.font = "20px sans-serif";
          ctx.fillText("💀", ox + 12, oy + 30);
        }
      } else if (obs.type === "sign") {
        ctx.font = "22px sans-serif";
        ctx.fillText("📜", ox + 10, oy + 32);
      } else if (obs.type === "book") {
        const pulse = Math.sin(Date.now() / 250) * 0.3 + 0.7;
        ctx.shadowColor = "#38bdf8";
        ctx.shadowBlur = 14 * pulse;
        ctx.font = "24px sans-serif";
        ctx.fillText("📚", ox + 9, oy + 32);
        ctx.shadowBlur = 0;
      }
    }

    drawArchetypeSprite(ctx, userArchetype, playerPixel.x, playerPixel.y, TILE_SIZE);

    ctx.restore();
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-5xl mx-auto select-none">
      <div className="relative rounded-2xl border-4 border-slate-800 bg-[#050d09] shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden w-full aspect-[20/12]">
        <canvas
          ref={canvasRef}
          width={VIEWPORT_WIDTH * TILE_SIZE}
          height={VIEWPORT_HEIGHT * TILE_SIZE}
          onClick={handleCanvasClick}
          className="w-full h-full object-contain block cursor-pointer"
        />

        <div className="absolute bottom-4 left-4 flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition sm:hidden">
          <div className="flex gap-1">
            <button
              onClick={() => movePlayer(0, -1)}
              className="w-12 h-12 rounded-lg border border-cyan-500/40 bg-slate-900/90 text-cyan-300 font-bold text-lg"
            >
              W
            </button>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => movePlayer(-1, 0)}
              className="w-12 h-12 rounded-lg border border-cyan-500/40 bg-slate-900/90 text-cyan-300 font-bold text-lg"
            >
              A
            </button>
            <button
              onClick={() => movePlayer(0, 1)}
              className="w-12 h-12 rounded-lg border border-cyan-500/40 bg-slate-900/90 text-cyan-300 font-bold text-lg"
            >
              S
            </button>
            <button
              onClick={() => movePlayer(1, 0)}
              className="w-12 h-12 rounded-lg border border-cyan-500/40 bg-slate-900/90 text-cyan-300 font-bold text-lg"
            >
              D
            </button>
          </div>
        </div>

        {nearObstacle && (
          <button
            onClick={() => triggerInteraction(nearObstacle)}
            className="absolute top-4 left-1/2 -translate-x-1/2 rounded-full border-2 border-amber-400 bg-slate-950/95 px-6 py-2.5 shadow-[0_0_25px_rgba(245,158,11,0.6)] flex items-center gap-3 animate-bounce cursor-pointer hover:bg-amber-950 transition"
          >
            <span className="font-retro text-xs text-amber-300">
              [PRESS E / SPACE OR CLICK HERE]
            </span>
            <span className="font-sans text-xs font-bold text-white">
              {nearObstacle.label}
            </span>
          </button>
        )}

        {tutorialTip && !nearObstacle && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 rounded-xl border border-cyan-500/40 bg-cyan-950/90 px-4 py-2 text-xs font-sans text-cyan-200 shadow-lg text-center max-w-md">
            {tutorialTip}
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-4 w-full px-5 py-3 rounded-xl border border-slate-800 bg-slate-950/60 font-retro text-xs text-slate-400">
        <div className="flex items-center gap-4">
          <span>🎮 WASD / ARROWS: Move</span>
          <span>⚡ E / SPACE / CLICK: Interact</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-amber-300">🎁 Chest: Quest</span>
          <span className="text-cyan-300">📚 Book: Source of Truth</span>
          <span className="text-emerald-400">📜 Scroll: Hint</span>
          <span className="text-rose-400">👺 Boss</span>
        </div>
      </div>

      {/* Secret Hint Scroll Modal */}
      {activeSignMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border-2 border-amber-500/70 bg-[#0c0a05] p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-2 border-b border-amber-900/60 pb-3">
              <span className="text-2xl">📜</span>
              <h3 className="font-pixel text-lg font-bold text-amber-300">Secret Hint Scroll</h3>
            </div>
            <p className="font-sans text-sm leading-relaxed text-amber-100 whitespace-pre-line">
              {activeSignMessage}
            </p>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveSignMessage(null)}
                className="rounded-xl border border-amber-500/40 bg-amber-950 px-5 py-2 font-retro text-xs font-bold text-amber-300 hover:bg-amber-900 transition"
              >
                Close [ESC]
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Source of Truth Book Modal */}
      {activeBookData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="w-full max-w-2xl rounded-3xl border-2 border-cyan-400/80 bg-[#051119]/95 p-6 sm:p-8 shadow-[0_0_60px_rgba(6,182,212,0.3)] space-y-5 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-cyan-900/60 pb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">📚</span>
                <div>
                  <span className="font-retro text-[10px] uppercase tracking-widest text-cyan-400">
                    REAL-WORLD SOURCE OF TRUTH • DAY {activeBookData.dayNumber}
                  </span>
                  <h2 className="font-pixel text-xl sm:text-2xl font-bold text-white">
                    {activeBookData.title}
                  </h2>
                </div>
              </div>
              <button
                onClick={() => setActiveBookData(null)}
                className="rounded-xl border border-cyan-800 bg-cyan-950 px-3 py-1.5 font-retro text-xs text-cyan-300 hover:border-cyan-400 transition"
              >
                ✕ ESC
              </button>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/40 p-4">
                <span className="font-retro text-[10px] text-cyan-400 uppercase tracking-widest block mb-1">
                  🎯 CORE LESSON TOPIC
                </span>
                <p className="font-sans text-sm font-semibold text-white">
                  {activeBookData.topic}
                </p>
              </div>

              <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-4">
                <span className="font-retro text-[10px] text-emerald-400 uppercase tracking-widest block mb-1">
                  💼 REAL-WORLD CAREER IMPACT
                </span>
                <p className="font-sans text-xs sm:text-sm text-emerald-200 leading-relaxed">
                  {activeBookData.careerImpact}
                </p>
              </div>

              <div className="rounded-xl border border-purple-500/30 bg-purple-950/30 p-4">
                <span className="font-retro text-[10px] text-purple-400 uppercase tracking-widest block mb-2">
                  🛠️ INDUSTRY STANDARD TOOLS & FRAMEWORKS
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeBookData.industryTools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="rounded-lg border border-purple-500/40 bg-purple-950/70 px-3 py-1 font-retro text-[11px] text-purple-200"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-amber-500/30 bg-amber-950/30 p-4">
                <span className="font-retro text-[10px] text-amber-400 uppercase tracking-widest block mb-1">
                  ⚡ PRODUCTION APPLICATION
                </span>
                <p className="font-sans text-xs sm:text-sm text-amber-100 leading-relaxed">
                  {activeBookData.practicalApplication}
                </p>
              </div>

              <div className="rounded-xl border border-sky-500/30 bg-sky-950/40 p-4">
                <span className="font-retro text-[10px] text-sky-400 uppercase tracking-widest block mb-1">
                  💡 EXPERT PYTHON PRO-TIP
                </span>
                <p className="font-sans text-xs sm:text-sm text-sky-200 leading-relaxed">
                  {activeBookData.proTip}
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveBookData(null)}
                className="rounded-xl bg-cyan-400 px-6 py-2.5 font-retro text-xs font-bold text-slate-950 hover:bg-cyan-300 transition"
              >
                Absorb Knowledge & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
