import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function getAverages(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  try {
    const { email, user } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const logs = await prisma.energyLog.findMany({
      where: { userId: user.id || user.userId },
    });

    if (!logs.length) {
      return res.status(200).json({
        message: "No logs yet",
        averages: {},
      });
    }

    const avg = (arr) =>
      arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

    const averages = {
      avgEnergy: avg(logs.map((l) => l.energy)),
      avgMotivation: avg(logs.map((l) => l.motivation)),
      avgStress: avg(logs.map((l) => l.stress)),
      avgSleep: avg(logs.map((l) => l.sleep_hours)),
      avgWater: avg(logs.map((l) => l.water_liters)),
      avgCaffeine: avg(logs.map((l) => l.caffeine_mg)),
      avgExercise: avg(logs.map((l) => l.exercise_mins)),
    };

    return res.status(200).json({
      message: "Averages calculated!",
      averages,
    });
  } catch (e) {
    console.error("Error in getAverages:", e);
    return res.status(500).json({ message: "Something went wrong" });
  }
}
