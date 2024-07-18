import { Request, Response } from 'express';
import { createPortfolio } from '../services/portfolioService';

export const generatePortfolio = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const { portfolio, pdfBuffer } = await createPortfolio(email);

    res.set('Content-Type', 'application/pdf');
    res.send(pdfBuffer);
  } catch (error) {
    res.status(500).send({ message: 'Error generating portfolio', error });
  }
};
