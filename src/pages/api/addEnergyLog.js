import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function addEnergyLog(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  try {
    const {
      email,
      user,
      energy,
      motivation,
      stress,
      sleep_hours,
      water_liters,
      caffeine_mg,
      exercise_mins,
      notes,
    } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const log = await prisma.energyLog.create({
      data: {
        userId: user.userId || user.id,
        energy: Number(energy),
        motivation: Number(motivation),
        stress: Number(stress),
        sleep_hours: Number(sleep_hours),
        water_liters: Number(water_liters),
        caffeine_mg: Number(caffeine_mg),
        exercise_mins: Number(exercise_mins),
        notes: notes || null,
      },
    });

    return res
      .status(201)
      .json({ message: "Energy log recorded successfully!", content: log });
  } catch (e) {
    console.error("Error in addEnergyLog:", e);
    return res.status(500).json({ message: "Something went wrong" });
  }
}
