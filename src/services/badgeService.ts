// src/services/badgeService.ts
import BadgeAssignment from '../models/BadgeAssignment';

// Função para atribuir badge
export const assignBadge = async (email_com: string, email_empr: string, id_badge: number, imagem_b: string, descricao: string) => {
  const badgeAssignment = await BadgeAssignment.create({
    email_com,
    email_empr,
    id_badge,
    imagem_b,
    descricao,
    dt_emissao: new Date(),
  });

  return badgeAssignment;
};

// Função para confirmar atribuição de badge
export const confirmAssignment = async (token: string) => {
  const badgeAssignment = await BadgeAssignment.findOne({ where: { confirmation_token: token } });

  if (!badgeAssignment) {
    throw new Error('Assignment not found');
  }

  badgeAssignment.confirmation_token = ''; // Limpa o token de confirmação após a confirmação
  await badgeAssignment.save();

  return badgeAssignment;
};

// Função para obter badges por email do usuário
export const getBadgesByUserEmail = async (email_com: string) => {
  return await BadgeAssignment.findAll({ where: { email_com } });
};
