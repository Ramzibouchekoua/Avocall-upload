import express from 'express';
import emailForm from './email';

const router = express.Router();

router.post('/sendEmailForm', (req, res) => {
  const parsedData = JSON.stringify(req.body);
  console.log('Received data:', parsedData);
  res.status(200).send('Data received successfully');
  const email = req.body.email;
  const name = req.body.name;
  const phone = req.body.phone;
  const description = req.body.description;
  const type = req.body.type;
  emailForm.formEmailApp(email, name, phone, description, type, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

export default router;
