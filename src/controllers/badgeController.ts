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

    console.log('Verificando API Key...');
    const userEnterpriseResponse = await axios.get(`http://localhost:7003/api/acessar-info-usuario-by-api-key`, {
      params: {
        api_key: apiKey
      }
    });

    if (!userEnterpriseResponse.data) {
      return res.status(403).send('API Key inválida');
    }

    const email_empr = userEnterpriseResponse.data.email_comercial;
    console.log(`Email empresarial: ${email_empr}`);

    console.log(`Resgatando informações da badge com id: ${id_badge}...`);
    const badgeResponse = await axios.get(`http://localhost:7001/badge/consultar?pesquisa=${id_badge}`);
    
    console.log('Resposta da API de badge:', badgeResponse.data);

    if (!badgeResponse.data.length) {
      console.error('Badge não encontrada');
      return res.status(404).send('Badge não encontrada');
    }

    const badge = badgeResponse.data[0];
    const { imagem_mb, desc_certificacao } = badge;

    console.log('Atribuindo badge...');
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
