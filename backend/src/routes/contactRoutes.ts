import express, { Request, Response } from 'express';
import prisma from '../../prisma/client';


const router = express.Router();

router.post('/', async (req: Request, res: Response): Promise<void> => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    res.status(400).json({ error: 'Champs requis manquants.' });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ error: 'Email invalide.' });
    return;
  }

  try {
    await prisma.contactMessage.create({
      data: { name, email, subject, message },
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Erreur contact:', error);
    res.status(500).json({ error: 'Erreur interne.' });
  }
});

export default router;
