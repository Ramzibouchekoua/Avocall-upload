import asyncHandler from 'express-async-handler';
import emailService from '../services/email';

//@des send email
//@route POST /api/email/sendMail
//@access private
export const sendMail = asyncHandler(async (req, res) => {
  const { to, subject, text, html } = req.body;
  emailService.sendEmail(to, subject, text, html);
  res.json({ success: true });
});
