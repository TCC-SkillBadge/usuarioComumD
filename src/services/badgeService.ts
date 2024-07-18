import BadgeAssignment from '../models/BadgeAssignment';
import { sendConfirmationEmail } from './emailService';
import { v4 as uuidv4 } from 'uuid';

export const assignBadge = async (email_com: string, email_empr: string, id_badge: number, imagem_b: string) => {
  const confirmation_token = uuidv4();
  const dt_emissao = new Date();
  const dt_vencimento = new Date();
  dt_vencimento.setFullYear(dt_emissao.getFullYear() + 1);

  const badgeAssignment = await BadgeAssignment.create({
    dt_emissao,
    dt_vencimento,
    email_com,
    email_empr,
    id_badge,
    imagem_b,
    confirmation_token
  });

  await sendConfirmationEmail(email_com, confirmation_token);

  return badgeAssignment;
};

export const confirmAssignment = async (token: string) => {
  const badgeAssignment = await BadgeAssignment.findOne({ where: { confirmation_token: token } });

  if (!badgeAssignment) {
    throw new Error('Token de confirmação inválido');
  }

  // Confirmar a atribuição (pode adicionar lógica adicional aqui)
  badgeAssignment.confirmation_token = '';
  await badgeAssignment.save();

  return badgeAssignment;
};

export const getBadgesByUserEmail = async (email_com: string) => {
  return await BadgeAssignment.findAll({ where: { email_com } });
};
