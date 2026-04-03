import asyncHandler from 'express-async-handler';
import User from '../models/user';
import File from '../models/file';
import Consultation from '../models/consultation';
import PaymentTransaction from '../models/paymentTransaction';
import generateToken from '../helpers/generateToken';
import config from '../config';
import emailService from '../services/email';
import email from '../services/email';
import { date } from 'joi';
import { extendWalletExpiration, resetExpiredWallet } from '../helpers/walletExpiration';
import { getPackContractByCode } from '../helpers/packContract';

const serializeTransaction = (transaction) => ({
  _id: transaction._id,
  paymentMethod: transaction.paymentMethod,
  packCode: transaction.packCode,
  expectedAmount: transaction.expectedAmount,
  confirmedAmount: transaction.confirmedAmount,
  status: transaction.status,
  provider: transaction.provider,
  proofFile: transaction.proofFile,
  reviewedBy: transaction.reviewedBy,
  reviewedAt: transaction.reviewedAt,
  verifiedAt: transaction.verifiedAt,
  appliedAt: transaction.appliedAt,
  rejectionReason: transaction.rejectionReason,
  user: transaction.user,
  createdAt: transaction.createdAt,
  updatedAt: transaction.updatedAt,
});

const applyPackToUser = async (user, contract) => {
  resetExpiredWallet(user);
  user.wallet = Number(user.wallet) + Number(contract.walletAdd);
  extendWalletExpiration(user, Number(contract.months));
  await user.save();
};

//@des getUserPayments
//@route GET /api/admin/getUserPayments
//@access private
export const getUserPayments = asyncHandler(async (req, res) => {
  const email = req.body.userEmail || req.query.userEmail;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ msg: 'User not found' });
  }

  const payments = await PaymentTransaction.find({ user: user._id }).populate('proofFile').populate('reviewedBy');
  res.json({ payments });
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
  const payment = await PaymentTransaction.findById(_id).populate('user').populate('proofFile').populate('reviewedBy');

  if (!payment) {
    return res.status(404).json({ msg: 'Payment not found' });
  }

  res.json({ payment: serializeTransaction(payment) });
});

//@des getAllPayments
//@route GET /api/admin/getAllPayments?page=1&limit=2
// change user from id to email
//@access private
export const getAllPayments = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const status = req.query.status;
  const query = status ? { status } : {};

  const payments = await PaymentTransaction.find(query)
    .populate('user')
    .populate('proofFile')
    .populate('reviewedBy')
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  const count = await PaymentTransaction.countDocuments(query);

  res.json({
    payments: payments.map(serializeTransaction),
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  });
});

//@des getAllConsultations
//@route GET /api/admin/getAllConsultations?page=1&limit=10
// change user from id to email
//@access private
export const getAllConsultations = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const consultations = await Consultation.find()
    .populate('userId')
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();
  const count = await Consultation.countDocuments();

  res.json({
    consultations,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
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
  const durationMonths = req.body.durationMonths;
  const expirationDate = req.body.expirationDate;
  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(404).json({ msg: 'User not found' });
  }

  resetExpiredWallet(user);
  user.wallet = Number(user.wallet) + Number(consultationNumber);

  if (expirationDate) {
    const explicitExpiration = new Date(expirationDate);
    if (Number.isNaN(explicitExpiration.getTime())) {
      return res.status(400).json({ msg: 'Invalid expiration date' });
    }
    user.walletExpirationDate = explicitExpiration;
  }

  if (durationMonths) {
    extendWalletExpiration(user, Number(durationMonths));
  }
  await user.save();
  user.password = undefined;
  res.json({ user });
});

//@des approve payment
//@route POST /api/admin/approvePayment/payment_id
//@access private
export const approvePayment = asyncHandler(async (req, res) => {
  const payment = await PaymentTransaction.findById(req.params.payment_id).populate('user').populate('proofFile');

  if (!payment) {
    return res.status(404).json({ msg: 'Payment not found' });
  }

  if (payment.paymentMethod !== 'BANK_TRANSFER') {
    return res.status(400).json({ msg: 'Only bank transfer payments can be approved manually' });
  }

  if (payment.status !== 'PENDING_REVIEW') {
    return res.status(400).json({ msg: 'Payment is not pending review' });
  }

  const contract = getPackContractByCode(payment.packCode);
  const user = await User.findById(payment.user._id);

  if (!contract || !user) {
    return res.status(400).json({ msg: 'Unable to approve payment' });
  }

  await applyPackToUser(user, contract);

  payment.status = 'APPROVED';
  payment.confirmedAmount = contract.amount;
  payment.reviewedBy = req.user;
  payment.reviewedAt = new Date();
  payment.appliedAt = new Date();
  await payment.save();

  res.json({
    payment: serializeTransaction(payment),
    user,
  });
});

//@des reject payment
//@route POST /api/admin/rejectPayment/payment_id
//@access private
export const rejectPayment = asyncHandler(async (req, res) => {
  const payment = await PaymentTransaction.findById(req.params.payment_id).populate('user').populate('proofFile');

  if (!payment) {
    return res.status(404).json({ msg: 'Payment not found' });
  }

  if (payment.paymentMethod !== 'BANK_TRANSFER') {
    return res.status(400).json({ msg: 'Only bank transfer payments can be rejected manually' });
  }

  if (payment.status !== 'PENDING_REVIEW') {
    return res.status(400).json({ msg: 'Payment is not pending review' });
  }

  payment.status = 'REJECTED';
  payment.reviewedBy = req.user;
  payment.reviewedAt = new Date();
  payment.rejectionReason = req.body.rejectionReason || '';
  await payment.save();

  res.json({
    payment: serializeTransaction(payment),
  });
});
