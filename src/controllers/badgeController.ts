import { Request, Response } from 'express';
import { verifyToken } from '../services/authService';
import { assignBadge, confirmAssignment, getBadgesByUserEmail } from '../services/badgeService';
import { JwtPayload } from 'jsonwebtoken';

export const assignBadgeController = async (req: Request, res: Response) => {
  const { email_com, email_empr, id_badge, imagem_b } = req.body;

  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).send('Token não fornecido');
    }

    const decoded = verifyToken(token) as JwtPayload;
    if (decoded.email !== email_empr) {
      return res.status(403).send('Usuário não autorizado');
    }

    const badgeAssignment = await assignBadge(email_com, email_empr, id_badge, imagem_b);
    res.status(201).json(badgeAssignment);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send('Erro desconhecido');
    }
  }
};

export const confirmBadgeController = async (req: Request, res: Response) => {
  const { token } = req.params;

  try {
    const badgeAssignment = await confirmAssignment(token);
    res.status(200).json(badgeAssignment);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send('Erro desconhecido');
    }
  }
};

export const getUserBadgesController = async (req: Request, res: Response) => {
  const { email_com } = req.params;

  try {
    const badges = await getBadgesByUserEmail(email_com);
    res.status(200).json(badges);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send('Erro desconhecido');
    }
  }
};
