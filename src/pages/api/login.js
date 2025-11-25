import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password are required" });

  try {

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser)
      return res.status(401).json({ message: "User does not exist" });


    const correctPass = await bcrypt.compare(password, existingUser.password);
    if (!correctPass)
      return res.status(401).json({ message: "Incorrect password" });

    return res.status(200).json({
      message: "User Logged In",
      userId: existingUser.id,
      userName: existingUser.name,
      email: existingUser.email
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}
