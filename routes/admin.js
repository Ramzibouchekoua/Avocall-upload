import express from 'express';
import auth from '../middlewares/auth';
import role from '../middlewares/permissions';
import * as AdminController from '../controllers/admin';
const router = express.Router();

router.get('/getUserPayments', auth, role(['ADMIN']), AdminController.getUserPayments);
router.get('/getUserConsultations', auth, role(['ADMIN']), AdminController.getUserConsultations);
router.get('/getPaymentInfo/:payment_id', auth, role(['ADMIN']), AdminController.getPaymentInfo);
router.get('/getAllPayments', auth, role(['ADMIN']), AdminController.getAllPayments);
router.get('/getAllConsultations', auth, role(['ADMIN']), AdminController.getAllConsultations);
router.post('/updateUserConsultationsTotal', auth, role(['ADMIN']), AdminController.updateUserConsultationsTotal);

export default router;
