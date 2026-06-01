import express from 'express';
import emailForm from './email';

const router = express.Router();

router.post('/sendEmailForm', async (req, res) => {
  const parsedData = JSON.stringify(req.body);
  console.log('Received data:', parsedData);
  const email = req.body.email;
  const name = req.body.name;
  const phone = req.body.phone;
  const description = req.body.description;
  const type = req.body.type;
  await emailForm.formEmailApp(email, name, phone, description, type);
  res.status(200).send('Data received successfully');
});

export default router;
