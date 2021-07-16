import express from 'express';
import * as MailController from '../controllers/email';
import auth from '../middlewares/auth';

const router = express.Router();

router.post('/sendMail', auth, MailController.sendMail);

export default router;
