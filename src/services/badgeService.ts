import axios from 'axios';
import BadgeAssignment from '../models/BadgeAssignment';
import { sendConfirmationEmail } from './emailService';
import { v4 as uuidv4 } from 'uuid';

// Função para buscar informações da badge a partir de outra instância
const getBadgeInfo = async (id_badge: number) => {
  const response = await axios.get(`http://localhost:7001/consultar?pesquisa=${id_badge}`);
  if (response.data.length === 0) {
    throw new Error('Badge não encontrada');
  }
  return response.data[0];
};

export const assignBadge = async (email_com: string, email_empr: string, id_badge: number, imagem_b: string) => {
  const confirmation_token = uuidv4();
  const dt_emissao = new Date();
  const dt_vencimento = new Date();
  dt_vencimento.setFullYear(dt_emissao.getFullYear() + 1);

  // Buscar informações da badge
  const badgeInfo = await getBadgeInfo(id_badge);

  const badgeAssignment = await BadgeAssignment.create({
    dt_emissao,
    dt_vencimento,
    email_com,
    email_empr,
    id_badge,
    imagem_b,
    confirmation_token,
    descricao: badgeInfo.desc_certificacao // Utilizando a descrição da badge obtida da outra instância
  });

  await sendConfirmationEmail(email_com, confirmation_token);

  return badgeAssignment;
};

export const confirmAssignment = async (token: string) => {
  const badgeAssignment = await BadgeAssignment.findOne({ where: { confirmation_token: token } });

  if (!badgeAssignment) {
    throw new Error('Token de confirmação inválido');
  }

  badgeAssignment.confirmation_token = '';
  await badgeAssignment.save();

  return badgeAssignment;
};

export const getBadgesByUserEmail = async (email_com: string) => {
  return await BadgeAssignment.findAll({ where: { email_com } });
};
