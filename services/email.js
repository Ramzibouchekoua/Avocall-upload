import nodemailer from 'nodemailer';
import config from '../config';
import verifEmailTemplate from '../helpers/email/verifEmailTemplate';
import VerifAvocatMail from '../helpers/email/sendVerifAvocatMail';
import newConsultation from '../helpers/email/newConsultation';
import confirmAccMail from '../helpers/email/confirmAccMail';
const path = require('path');

// const transport = nodemailer.createTransport(config.email.smtp);
const transport = nodemailer.createTransport(config.email.smtp);

transport
  .verify()
  .then(() => console.log('Connected to email server'.magenta))
  .catch(() => console.log('Unable to connect to email server. Make sure you have configured the SMTP options in .env'));

/**
 * Send an email
 */
const sendEmail = async (to, subject, text, html) => {
  const msg = { from: config.email.from, to, subject, text, html };
  await transport.sendMail(msg);
};

/**
 * Send an email with image attachemet
 */
const sendEmailWithImageAttachements = async (to, subject, text, html, imageFileName) => {
  const msg = {
    from: config.email.from,
    to,
    subject,
    text,
    html,
    attachments: [
      {
        filename: imageFileName,
        contentType: 'image/jpeg' || 'image/png',
        path: path.join(process.cwd(), 'uploads', imageFileName)
      }
    ]
  };
  await transport.sendMail(msg);
};

const sendVerifMail = async (to, name, token) => {
  const subject = 'verif mail';
  const html = verifEmailTemplate(to, name, token);
  await sendEmail(to, subject, '', html);
};

const sendVerifAvocatMail = async (user, token) => {
  const subject = 'verif mail';
  const html = VerifAvocatMail(user, token);
  await sendEmail(config.email.smtp.auth.user, subject, '', html);
};

const newConsultationEmail = async (consultation, avocats, imageFileName) => {
  const subject = 'Valid Consultation';
  const html = newConsultation(consultation, avocats);
  await sendEmailWithImageAttachements(config.email.smtp.auth.user, subject, '', html, imageFileName);
};

const confirmAccEmail = async (to, name, token) => {
  const subject = 'تم تفعيل حسابك';
  const html = confirmAccMail(to, name, token);
  await sendEmail(to, subject, '', html);
};

export default {
  transport,
  sendEmail,
  sendVerifMail,
  sendVerifAvocatMail,
  newConsultationEmail,
  confirmAccEmail
};
