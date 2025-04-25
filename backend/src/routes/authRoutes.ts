import express, { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const router = express.Router()
const prisma = new PrismaClient()

// ✅ Admin registration route
router.post("/register", async (req: Request, res: Response) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required" })
    return
  }

  // Check if admin already exists
  const existing = await prisma.adminUser.findUnique({ where: { email } })
  if (existing) {
    res.status(409).json({ error: "Admin with this email already exists" })
    return
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10)

  // Save to DB
  const newAdmin = await prisma.adminUser.create({
    data: {
      email,
      password: hashedPassword,
    },
  })

  res.status(201).json({
    message: "Admin created",
    admin: {
      id: newAdmin.id,
      email: newAdmin.email,
    },
  })
})

// ✅ Admin login route
router.post("/login", async function (
  req: Request,
  res: Response
): Promise<void> {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required" })
    return
  }

  try {
    const user = await prisma.adminUser.findUnique({ where: { email } })

    if (!user) {
      res.status(401).json({ error: "Invalid email or password" })
      return
    }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      res.status(401).json({ error: "Invalid email or password" })
      return
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    )

    res.status(200).json({ token })
  } catch (err) {
    console.error("[LOGIN ERROR]", err)
    res.status(500).json({ error: "Something went wrong" })
  }
})

export default router
