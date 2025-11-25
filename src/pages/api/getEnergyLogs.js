import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function getEnergyLogs(req, res) {
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
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json({
      message: "Got energy logs successfully!",
      content: logs,
    });
  } catch (e) {
    console.error("Error in getEnergyLogs:", e);
    return res.status(500).json({ message: "Something went wrong" });
  }
}
