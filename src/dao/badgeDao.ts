import BadgeAssignment from '../models/BadgeAssignment';

export const getBadgesByUserEmail = async (email: string) => {
  try {
    console.log(`Procurando badges para o email: ${email}`);
    const badges = await BadgeAssignment.findAll({
      where: { email_com: email },
    });
    console.log(`Badges encontradas: ${JSON.stringify(badges)}`);
    return badges;
  } catch (error) {
    console.error('Erro ao recuperar badges:', error);
    throw new Error('Error retrieving user badges');
  }
};
