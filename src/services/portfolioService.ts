import Portfolio from '../models/Portfolio';
import { getUserBadges, getUserSkills, getInfo } from './userService';
import { generateDescription } from './chatGPTService';
import { generatePDF } from '../utils/pdfGenerator';

export const createPortfolio = async (email: string) => {
  const userInfo = await getInfo(email);
  const userBadges = await getUserBadges(email);
  const userSkills = await getUserSkills(email);

  // Assumindo que as badges possuem uma propriedade 'descricao' ou similar.
  const badgeDescriptions = userBadges.map(badge => badge.descricao).join(' '); // Ajuste conforme a propriedade correta
  const skillsText = await generateDescription(userSkills);

  const pdfBuffer = generatePDF(userInfo, badgeDescriptions, skillsText);

  const portfolio = await Portfolio.create({
    userId: email,
    title: 'Meu Portfólio',
    description: 'Portfólio com badges e habilidades'
  });

  return { portfolio, pdfBuffer };
};
