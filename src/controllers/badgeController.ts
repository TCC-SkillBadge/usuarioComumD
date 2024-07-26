import { Request, Response } from 'express';
import { verifyToken } from '../services/authService';
import { assignBadge, confirmAssignment, getBadgesByUserEmail } from '../services/badgeService';
import { JwtPayload } from 'jsonwebtoken';
import axios from 'axios';

export const assignBadgeController = async (req: Request, res: Response) => {
  const { email_com, id_badge } = req.body;
  const token = req.headers.authorization?.split(' ')[1];

  try {
    if (!token) {
      return res.status(401).send('Token não fornecido');
    }

    const decoded = verifyToken(token) as JwtPayload;
    const userResponse = await axios.get(`http://localhost:7003/api/users/${decoded.email}`);

    if (!userResponse.data.token || userResponse.data.token !== token) {
      return res.status(403).send('Usuário não autorizado');
    }

    // Resgatar informações da badge
    const badgeResponse = await axios.get(`http://localhost:7001/consultar?pesquisa=${id_badge}`);
    if (badgeResponse.data.length === 0) {
      return res.status(404).send('Badge não encontrada');
    }

    const badge = badgeResponse.data[0];
    const { imagem_mb, desc_certificacao } = badge;

    // Resgatar informações do usuário empresarial
    const empresaResponse = await axios.get(`http://localhost:7002/api/empresas/${decoded.email}`);
    if (!empresaResponse.data) {
      return res.status(404).send('Usuário empresarial não encontrado');
    }

    const email_empr = empresaResponse.data.email;

    const badgeAssignment = await assignBadge(email_com, email_empr, id_badge, imagem_mb, desc_certificacao);
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
