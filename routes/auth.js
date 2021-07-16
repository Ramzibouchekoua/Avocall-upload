import express from 'express';
import * as authController from '../controllers/auth';
import * as googleAuthController from '../controllers/googleAuth';

const router = express.Router();

router.post('/login', authController.login);
router.post('/googleLogin', googleAuthController.login);

export default router;
