import { Router } from 'express';
import { registerUser, loginUser, getUserInfo, getUserBadgesController, updateUser } from './controllers/userController';
import { requestPasswordReset, resetPassword } from './controllers/passwordController';
import { assignBadgeController } from './controllers/badgeController';
import { generatePortfolio } from './controllers/portfolioController';
import { authenticateJWT } from './middleware/authMiddleware';

const router = Router();

router.post('/user/register', registerUser);
router.post('/user/login', loginUser);
router.get('/user/info', authenticateJWT, getUserInfo);
router.put('/user/update', authenticateJWT, updateUser);
router.post('/user/request-password-reset', requestPasswordReset);
router.post('/user/reset-password', resetPassword);
router.post('/badge/assign', assignBadgeController);
router.post('/portfolio/generate', generatePortfolio);
router.get('/badges', getUserBadgesController);

export default router;
