import express from 'express';
import * as uploadController from '../controllers/file';
import auth from '../middlewares/auth';

const router = express.Router()


router.post('/upload',  auth, uploadController.uploadFile);
router.get('/download/:id', uploadController.getFile);

  
export default router