import { Request, Response } from 'express';
import { assignBadge } from '../services/badgeService';
import axios from 'axios';

export const assignBadgeController = async (req: Request, res: Response) => {
  const { email_com, id_badge } = req.body;
  const apiKey = req.headers['x-api-key'] as string;

  try {
    if (!apiKey) {
      return res.status(401).send('API Key não fornecida');
    }

    // Verificar a API Key no serviço de usuário empresarial
    const userEnterpriseResponse = await axios.get(`http://localhost:7003/api/acessar-info-usuario-by-api-key`, {
      params: {
        api_key: apiKey
      }
    });

    if (!userEnterpriseResponse.data) {
      return res.status(403).send('API Key inválida');
    }

    const email_empr = userEnterpriseResponse.data.email_comercial;

    // Resgatar informações da badge
    const badgeResponse = await axios.get(`http://localhost:7001/consultar?pesquisa=${id_badge}`);
    if (!badgeResponse.data.length) {
      return res.status(404).send('Badge não encontrada');
    }

    const badge = badgeResponse.data[0];
    const { imagem_mb, desc_certificacao } = badge;

    const badgeAssignment = await assignBadge(email_com, email_empr, id_badge, imagem_mb, desc_certificacao);
    res.status(201).json(badgeAssignment);
  } catch (error: unknown) {
    console.error('Erro no assignBadgeController:', error);
    if (axios.isAxiosError(error)) {
      res.status(500).send(error.response?.data || 'Erro ao comunicar com outro serviço');
    } else if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send('Erro desconhecido');
    }
  }
};
