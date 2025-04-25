import express, { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

const publicRouter = express.Router()
const prisma = new PrismaClient()

publicRouter.get("/products", async (req: Request, res: Response): Promise<void> => {
  const language = req.query.lang?.toString()

  try {
    const products = await prisma.product.findMany({
      where: language ? { language } : {},
      orderBy: { createdAt: "desc" },
    })
    res.json(products)
  } catch (err) {
    console.error("[GET /products]", err)
    res.status(500).json({ error: "Failed to fetch products" })
  }
})

publicRouter.get("/products/:id", async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params

  try {
    const product = await prisma.product.findUnique({ where: { id } })

    if (!product) {
      res.status(404).json({ error: "Product not found" })
      return
    }

    res.json(product)
  } catch (err) {
    console.error("[GET /products/:id]", err)
    res.status(500).json({ error: "Failed to fetch product" })
  }
})

publicRouter.get("/gammes", async (_req: Request, res: Response): Promise<void> => {
  try {
    const gammes = await prisma.gamme.findMany({
      orderBy: { title: "asc" },
    })
    res.json(gammes)
  } catch (err) {
    console.error("[GET /gammes]", err)
    res.status(500).json({ error: "Failed to fetch gammes" })
  }
})

export default publicRouter
 