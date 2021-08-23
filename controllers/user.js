import asyncHandler from 'express-async-handler';
import User from '../models/user';
import Consultation from '../models/consultation';
import generateToken from '../helpers/generateToken';
import config from '../config';
import emailService from '../services/email';
import email from '../services/email';
import { date } from 'joi';

//@des register new user
//@route POST /api/user/register
//@access public
export const register = asyncHandler(async (req, res) => {
  const { email, password, phone, name, address, birthDate } = req.body;
  //validation
  if (!email || !password || !name || !birthDate) return res.status(400).json({ msg: 'خانات إلزامية.' });
  if (password.length < 5) return res.status(400).json({ msg: 'يجب أن تتكون كلمة المرور من 5 أحرف على الأقل.' });
  const existingUser = await User.findOne({ email: email });
  if (existingUser) return res.status(400).json({ msg: 'الحساب مع هذا البريد الإلكتروني موجود بالفعل.' });
  const newUser = new User({
    email,
    password,
    phone,
    name,
    role: 'USER',
    address,
    birthDate
  });
  const savedUser = await newUser.save();
  savedUser.password = undefined;
  try {
    emailService.sendVerifMail(email, name, generateToken(savedUser._id, config.email.secret));
  } catch (error) {
    console.log({error});
  }
  res.json(savedUser);
});

//@des test if token is valid
//@route GET /api/user/tokenIsValid
//@access private
export const tokenIsValid = asyncHandler(async (req, res) => {
  return res.json(req.user ? true : false);
});

//@des update user
//@route PUT /api/user/update
//@access private
export const update = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user);
  user.email = req.body.email || user.email;
  user.phone = req.body.phone || user.phone;
  user.name = req.body.name || user.name;
  user.address = req.body.address || user.address;
  user.birthDate = req.body.birthDate || user.birthDate;
  const updateduser = await user.save();
  res.json({
    newUser: updateduser
  });
});

//@des verif user
//@route GET /api/user/verifMail
//@access public
export const verifMail = asyncHandler(async (req, res) => {
  const id = req.user;
  const user = await User.findById(id);
  user.status.isVerified = true;
  await user.save();
  if (user.role === 'PRO') {
    emailService.confirmAccEmail(user.email, user.name, generateToken(user._id, config.email.secret));
  }
  // res.json('لقد تم تفعيل حسابكم' );
  res.redirect('http://localhost:3000/sign-in');
});

//@des get user details
//@route GET /api/user/
//@access private
export const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user).select('-password');
  res.json(user);
});

//@des get all user
//@route GET /api/user/all
//@access private
export const getAll = asyncHandler(async (req, res) => {
  const user = await User.find({ role: 'USER' });
  res.json(user);
});

//@des remove user
//@route DELETE /api/user/delete
//@access private
export const deleteUser = asyncHandler(async (req, res) => {
  const deletedUser = await User.findById(req.user);
  deletedUser.deletedAt = Date.now();
  deletedUser.save();
  res.json({ msg: 'success' });
});

//@des newConsultation
//@route POST /api/user/newConsultation
//@access private
export const newConsultation = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user);
  if (!user.wallet || user.wallet < 1) return res.status(400).json({ msg: 'Empty wallet' });
  const newConsultation = {
    ...req.body,
    userId: req.user,
  };
  console.log("newConsultation",newConsultation)
  const consultation = await Consultation.create(newConsultation);
  const avocats = await User.find({ role: 'PRO' });
  user.wallet = user.wallet - 1;
  user.userId = req.user;
  await user.save();
  await emailService.newConsultationEmail(consultation, avocats,req.body.filename);
  res.json({ consultation });
});

//@des get all consultations
//@route GET /api/user/allConsultation
//@access private
export const getConsultations = asyncHandler(async (req, res) => {
  const consultations = await Consultation.find({ userId: req.user });
  res.json(consultations);
});

//@des get one consultation
//@route GET /api/user/consultation
//@access private
export const getConsultation = asyncHandler(async (req, res) => {
  const consultation = await Consultation.find({ _id: req.params.id });
  res.json(consultation);
});

//@des update consultation
//@route PUT /api/user/updateConsultation/id
//@access private
export const updateConsultation = asyncHandler(async (req, res) => {
  const consultation = await Consultation.findById(req.params.id);
  consultation.title = req.body.title || consultation.title;
  consultation.field = req.body.field || consultation.field;
  consultation.type = req.body.type || consultation.type;
  consultation.date = req.body.date || consultation.date;
  const updatedconsultation = await consultation.save();
  res.json({
    newConsultation: updatedconsultation
  });
});

//@des buyPack
//@route POST /api/user/buyPack
//@access private
export const buyPack = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user);
  user.wallet = Number(user.wallet) + Number(req.body.consultationNumber);
  await user.save();
  user.password = undefined;
  await emailService.buyPackEmail(user,req.body.filename);
  res.json({ user });
});
