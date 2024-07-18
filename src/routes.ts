import { Router } from 'express';
import { registerUser, loginUser, getUserInfo } from './controllers/userController';
import { assignBadgeController, confirmBadgeController, getUserBadgesController } from './controllers/badgeController';
import { generatePortfolio } from './controllers/portfolioController';

const router = Router();

router.post('/user/register', registerUser);
router.post('/user/login', loginUser);
router.get('/user/info', getUserInfo);

router.post('/badge/assign', assignBadgeController);
router.get('/badge/confirm/:token', confirmBadgeController);
router.get('/badge/user/:email_com', getUserBadgesController);

router.post('/portfolio/generate', generatePortfolio);

export default router;
