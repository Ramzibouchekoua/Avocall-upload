import nodemailer from 'nodemailer';
import config from '../config';
import verifEmailTemplate from '../helpers/email/verifEmailTemplate';
import VerifAvocatMail from '../helpers/email/sendVerifAvocatMail';
import newConsultation from '../helpers/email/newConsultation';
import confirmAccMail from '../helpers/email/confirmAccMail';
import buyPackEmailTemplate from '../helpers/email/buyPackEmail';
import formEmail from '../helpers/email/formEmail';

const path = require('path');

// Basic RFC-5321 email address sanity check (catches spaces and invalid localpart chars)
const EMAIL_RE = /^[^\s@,;]+@[^\s@,;]+\.[^\s@,;]+$/;
const isValidEmail = (address) => typeof address === 'string' && EMAIL_RE.test(address.trim());

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
  if (!isValidEmail(to)) {
    console.warn('sendEmail: skipping invalid recipient address:', to);
    return;
  }
  const msg = { from: config.email.from, to, subject, text, html };
  try {
    await transport.sendMail(msg);
  } catch (error) {
    console.error('sendEmail failed:', { to, subject, error });
    throw error;
  }
};

/**
 * Send an email with image attached
 */
const sendEmailWithImageAttached = async (to, subject, text, html, imageFileName) => {
  if (!isValidEmail(to)) {
    console.warn('sendEmailWithImageAttached: skipping invalid recipient address:', to);
    return;
  }
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
        path: path.join(process.cwd(), 'uploads', imageFileName),
      },
    ],
  };
  try {
    await transport.sendMail(msg);
  } catch (error) {
    console.error('sendEmailWithImageAttached failed:', { to, subject, imageFileName, error });
    throw error;
  }
};

const sendVerifMail = async (to, name, token) => {
  try {
    const subject = 'verif mail';
    const html = verifEmailTemplate(to, name, token);
    await sendEmail(to, subject, '', html);
  } catch (error) {
    console.log('sendVerifMail:', { error });
  }
};

const sendVerifAvocatMail = async (user, token) => {
  try {
    const subject = 'verif mail';
    const html = VerifAvocatMail(user, token);
    await sendEmail(config.email.to, subject, '', html);
  } catch (error) {
    console.error('sendVerifAvocatMail failed:', { error });
  }
};

const newConsultationEmail = async (consultation, avocats, imageFileName) => {
  try {
    const subject = 'Valid Consultation';
    const html = newConsultation(consultation, avocats);
    if (imageFileName === '') {
      await sendEmail(config.email.to, subject, '', html);
    } else {
      await sendEmailWithImageAttached(config.email.to, subject, '', html, imageFileName);
    }
  } catch (error) {
    console.error('newConsultationEmail failed:', { error });
  }
};

const buyPackEmail = async (user, imageFileName) => {
  try {
    const subject = 'Payment';
    const html = buyPackEmailTemplate(user);
    if (imageFileName === 'online-payment') {
      await sendEmail(config.email.to, subject, '', html);
    } else {
      await sendEmailWithImageAttached(config.email.to, subject, '', html, imageFileName);
    }
  } catch (error) {
    console.error('buyPackEmail failed:', { error });
  }
};

const confirmAccEmail = async (to, name, token) => {
  try {
    const subject = 'تم تفعيل حسابك';
    const html = confirmAccMail(to, name, token);
    await sendEmail(to, subject, '', html);
  } catch (error) {
    console.error('confirmAccEmail failed:', { to, error });
  }
};

const formEmailApp = async (email, name, phone, description, type) => {
  try {
    const subject = 'Form Avocall App';
    const html = formEmail(email, name, phone, description, type);
    await sendEmail(config.email.to, subject, '', html);
  } catch (error) {
    console.error('formEmailApp failed:', { error });
  }
};

export default {
  transport,
  sendEmail,
  sendVerifMail,
  sendVerifAvocatMail,
  newConsultationEmail,
  confirmAccEmail,
  buyPackEmail,
  formEmailApp,
};
