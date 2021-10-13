import express from 'express';
import auth from '../middlewares/auth';
import verifTokenEmail from '../middlewares/verifTokenEmail';
import * as UserController from '../controllers/user';
const router = express.Router();

router.post('/register', UserController.register);
router.post('/registerAdmin', UserController.registerAdmin);
router.get('/verifMail/:token', verifTokenEmail, UserController.verifMail);
router.get('/tokenIsValid', auth, UserController.tokenIsValid);
router.put('/update', auth, UserController.update);
router.get('/all', auth, UserController.getAll);
router.get('/', auth, UserController.getUser);
router.delete('/delete', auth, UserController.deleteUser);
router.post('/newConsultation', auth, UserController.newConsultation);
router.get('/allConsultation', auth, UserController.getConsultations);
router.get('/consultation/:id', auth, UserController.getConsultation);
router.put('/updateConsultation/:id', auth, UserController.updateConsultation);
router.post('/buyPack', auth, UserController.buyPack);

export default router;
