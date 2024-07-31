// src/routes.ts
import { Router } from 'express';
import { registerUser, loginUser, getUserInfo, getUserBadgesController } from './controllers/userController';
import { assignBadgeController } from './controllers/badgeController';
import { generatePortfolio } from './controllers/portfolioController';
import { authenticateJWT } from './middleware/authMiddleware';

const router = Router();

router.post('/user/register', registerUser);
router.post('/user/login', loginUser);
router.get('/user/info', authenticateJWT, getUserInfo);
router.post('/badge/assign', assignBadgeController);
router.post('/portfolio/generate', generatePortfolio);
router.get('/badges', getUserBadgesController);

export default router;
