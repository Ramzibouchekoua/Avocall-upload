import express from 'express';
const messageController = require('../controllers/messageController');
import auth from '../middlewares/auth';

const router = express.Router();

router.get('/:chatroom', auth, messageController.getAllMessages);

export default router;
