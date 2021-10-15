import express from 'express';
import authRoute from './auth';
import UserRoute from './users';
import UserProRoute from './proUsers';
import MailRoute from './mail';
import uploadFileRoute from './uploadFile';
import messageRoute from './message';
import adminRoute from './admin';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/user', UserRoute);
router.use('/userpro', UserProRoute);
router.use('/email', MailRoute);
router.use('/file', uploadFileRoute);
router.use('/message', messageRoute);
router.use('/admin', adminRoute);

export default router;
