import express, { Request, Response } from 'express';
import prisma from '../../prisma/client';

const router = express.Router();

// GET all products
router.get('/products', async (_req: Request, res: Response): Promise<void> => {
  try {
    const products = await prisma.product.findMany({
      include: { gamme: true },
      orderBy: { createdAt: 'desc' },
    });
    res.status(200).json(products);
  } catch (error) {
    console.error('Erreur liste produits:', error);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

// GET single product
router.get('/products/:id', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      res.status(404).json({ error: 'Produit introuvable.' });
      return;
    }
    res.status(200).json(product);
  } catch (error) {
    console.error('Erreur récupération produit:', error);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

// CREATE product
router.post('/products', async (req: Request, res: Response): Promise<void> => {
  const {
    name,
    description,
    imageUrl,
    language,
    isFeatured,
    gammeId,
  } = req.body;

  if (!name || !description || !imageUrl || !language || !gammeId) {
    res.status(400).json({ error: 'Tous les champs sont requis.' });
    return;
  }

  try {
    const gamme = await prisma.gamme.findUnique({ where: { id: gammeId } });
    if (!gamme) {
      res.status(400).json({ error: 'Gamme non trouvée.' });
      return;
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        imageUrl,
        language,
        isFeatured: Boolean(isFeatured),
        gammeId,
      },
    });
    res.status(201).json({ success: true, product });
  } catch (error) {
    console.error('Erreur création produit:', error);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

// UPDATE product
router.put('/products/:id', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const {
    name,
    description,
    imageUrl,
    language,
    isFeatured,
    gammeId,
  } = req.body;

  if (!name || !description || !imageUrl || !language || !gammeId) {
    res.status(400).json({ error: 'Tous les champs sont requis.' });
    return;
  }

  try {
    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        imageUrl,
        language,
        isFeatured: Boolean(isFeatured),
        gammeId,
      },
    });
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error('Erreur mise à jour produit:', error);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

// DELETE product
router.delete('/products/:id', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    await prisma.product.delete({ where: { id } });
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Erreur suppression produit:', error);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

export default router;
