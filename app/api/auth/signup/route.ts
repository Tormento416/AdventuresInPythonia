import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";

export async function POST(req: Request) {
  try {
    const {
      username,
      password,
      displayName,
      archetype,
      level,
      xp,
      currentDay,
      completedSubQuestIds,
      completedMiniBossDays,
      completedWeeklyBossWeeks,
      lootInventory
    } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password required" }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const usersCollection = db.collection("users");

    const cleanUsername = username.trim().toLowerCase();
    const existing = await usersCollection.findOne({ username: cleanUsername });
    if (existing) {
      return NextResponse.json({ error: "Username already taken" }, { status: 400 });
    }

    const newUser = {
      username: cleanUsername,
      password: password,
      displayName: displayName || username,
      archetype: archetype || null,
      level: level || 1,
      xp: xp || 0,
      hp: 100,
      maxHp: 100,
      mana: 100,
      maxMana: 100,
      currentDay: currentDay || 1,
      completedSubQuestIds: completedSubQuestIds || [],
      completedMiniBossDays: completedMiniBossDays || [],
      completedWeeklyBossWeeks: completedWeeklyBossWeeks || [],
      lootInventory: lootInventory || [],
      userCodeSubmissions: {},
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await usersCollection.insertOne(newUser);
    const userId = result.insertedId.toString();

    const userProfile = {
      id: userId,
      ...newUser
    };

    const response = NextResponse.json({ user: userProfile, success: true });
    response.cookies.set("py_user_id", userId, { path: "/", httpOnly: false });
    return response;
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Signup failed" }, { status: 500 });
  }
}
