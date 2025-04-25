import express from "express"
import { PrismaClient } from "@prisma/client"

const router = express.Router()
const prisma = new PrismaClient()

// GET /products?lang=fr
router.get("/", async (req, res) => {
  const { lang } = req.query

  try {
    const products = await prisma.product.findMany({
      where: lang ? { language: String(lang) } : {},
      include: {
        gamme: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    res.json(products)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" })
  }
})

export default router
