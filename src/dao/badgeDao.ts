import BadgeAssignment from '../models/BadgeAssignment';

export const getBadgesByUserEmail = async (email_com: string) => {
  return await BadgeAssignment.findAll({ where: { email_com } });
};
