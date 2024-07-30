import { Router } from 'express';
import { registerUser, loginUser, getUserInfo } from './controllers/userController';
import { assignBadgeController } from './controllers/badgeController'; // Remover controladores não utilizados
import { generatePortfolio } from './controllers/portfolioController';

const router = Router();

router.post('/user/register', registerUser);
router.post('/user/login', loginUser);
router.get('/user/info', getUserInfo);

router.post('/badge/assign', assignBadgeController); // Ajuste aqui

router.post('/portfolio/generate', generatePortfolio);

export default router;
