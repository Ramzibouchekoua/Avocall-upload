import express from 'express';
import auth from '../middlewares/auth';
import * as UserController from '../controllers/proUsers';
const router = express.Router();

router.post('/register', UserController.register);
router.get('/tokenIsValid', auth, UserController.tokenIsValid);
router.put('/update', auth, UserController.update);
router.delete('/delete', auth, UserController.deleteUser);
router.get('/', auth, UserController.getUser);
router.get('/all', auth, UserController.getAll);
export default router;
