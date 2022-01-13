import asyncHandler from 'express-async-handler';
import User from '../models/user';
import File from '../models/file';
import Consultation from '../models/consultation';
import generateToken from '../helpers/generateToken';
import config from '../config';
import emailService from '../services/email';
import email from '../services/email';
import { date } from 'joi';

//@des getUserPayments
//@route GET /api/admin/getUserPayments
//@access private
export const getUserPayments = asyncHandler(async (req, res) => {
  
  const email = req.body.userEmail;
 
  const { files } = await User.findOne({ email }).populate('files');
  res.json({ files });
});

//@des getUserConsultations
//@route GET /api/admin/getUserConsultations
//@access private
export const getUserConsultations = asyncHandler(async (req, res) => {
  const email = req.body.userEmail;
  const { _id } = await User.findOne({ email });
  const consultations = await Consultation.findOne({ userId: _id });
  res.json({ consultations });
});

//@des getPaymentInfo
//@route GET /api/admin/getPaymentInfo/payment_id
//@access private
export const getPaymentInfo = asyncHandler(async (req, res) => {
 
  const _id = req.params.payment_id;
  const payment = await File.findById(_id).populate('user');
  
  res.json({ payment });
});

//@des getAllPayments
//@route GET /api/admin/getAllPayments?page=1&limit=2
// change user from id to email
//@access private
export const getAllPayments = asyncHandler(async (req, res) => {
  const { page = 1, limit = 5 } = req.query;

  const payments = await File.find()
    .populate('user')
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  const count = await File.countDocuments();

  res.json({
    payments,
    totalPages: Math.ceil(count / limit),
    currentPage: page
  });
});

//@des getAllConsultations
//@route GET /api/admin/getAllConsultations?page=1&limit=2
// change user from id to email
//@access private
export const getAllConsultations = asyncHandler(async (req, res) => {
  const { page = 1, limit = 5 } = req.query;

  const consultations = await Consultation.find()
    .populate('userId')
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();
  const count = await Consultation.countDocuments();

  res.json({
    consultations,
    totalPages: Math.ceil(count / limit),
    currentPage: page
  });
});

//@des updateUserConsultationsTotal
//@route POST /api/admin/updateUserConsultationsTotal
// change user from id to email
// add not change exisiting
//@access private
export const updateUserConsultationsTotal = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const consultationNumber = req.body.consultationNumber;
  const user = await User.findOne({ email:email });
  user.wallet = Number(user.wallet) + Number(consultationNumber);
  await user.save();
  user.password = undefined;
  res.json({ user });
});
