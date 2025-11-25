import { PrismaClient } from "@prisma/client";
import { OpenAI } from "openai";

const prisma = new PrismaClient();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function getInsight(req, res) {
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
      take: 30, // last 30 days
    });

    const prompt = `
You are an assistant analyzing a user's physical and mental energy metrics.

Each entry has:
- energy (1–10)
- motivation (1–10)
- stress (1–10)
- sleep_hours
- water_liters
- caffeine_mg
- exercise_mins
- notes
- createdAt

Here is the JSON data:
${JSON.stringify(logs)}

1. Summarize key patterns in 3–4 sentences.
2. Mention any correlations you see (sleep vs energy, caffeine vs stress, etc.).
3. Suggest 2 very small, specific actions they can try tomorrow.
Use simple, friendly language.
`;

    const result = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });

    return res.status(200).json({
      message: "Insight generated",
      insight: result.output_text,
    });
  } catch (e) {
    console.error("Error in getInsight:", e);
    return res.status(500).json({ message: "Something went wrong" });
  }
}
