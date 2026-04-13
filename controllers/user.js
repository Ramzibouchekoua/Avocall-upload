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
import { getPackContractByCode } from '../helpers/packContract';
import { extendWalletExpiration, resetExpiredWallet } from '../helpers/walletExpiration';

const buildOrderNumber = () => `${Date.now()}${Math.floor(Math.random() * 1000)}`;

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
  createdAt: transaction.createdAt,
  updatedAt: transaction.updatedAt,
});

const applyPackToUser = async (user, contract) => {
  resetExpiredWallet(user);
  user.wallet = Number(user.wallet) + Number(contract.walletAdd);
  extendWalletExpiration(user, contract.months);
  await user.save();
};

const createBankTransferTransaction = async ({ userId, packCode, fileName }) => {
  const contract = getPackContractByCode(packCode);

  if (!contract) {
    return { error: { status: 400, msg: 'Invalid pack code' } };
  }

  const [user, paymentFile] = await Promise.all([User.findById(userId), File.findOne({ fileName, user: userId })]);

  if (!user) {
    return { error: { status: 404, msg: 'User not found' } };
  }

  if (!paymentFile) {
    return { error: { status: 404, msg: 'Payment proof not found' } };
  }

  if (paymentFile.paymentTransaction) {
    const existingTransaction = await PaymentTransaction.findById(paymentFile.paymentTransaction);

    if (existingTransaction) {
      return { transaction: existingTransaction, user };
    }
  }

  const transaction = await PaymentTransaction.create({
    user: userId,
    paymentMethod: 'BANK_TRANSFER',
    packCode: contract.packCode,
    expectedAmount: contract.amount,
    status: 'PENDING_REVIEW',
    proofFile: paymentFile._id,
  });

  paymentFile.paymentTransaction = transaction._id;
  await paymentFile.save();

  if (!user.files.some((fileId) => String(fileId) === String(paymentFile._id))) {
    user.files.push(paymentFile._id);
    await user.save();
  }

  user.password = undefined;
  await emailService.buyPackEmail(user, fileName);

  return { transaction, user };
};

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
    birthDate,
  });
  const savedUser = await newUser.save();
  savedUser.password = undefined;
  try {
    emailService.sendVerifMail(email, name, await generateToken(savedUser._id, config.email.secret));
  } catch (error) {
    console.log({ error });
  }
  res.json(savedUser);
});

//@des register new admin
//@route POST /api/user/registerAdmin
//@access public
// export const registerAdmin = asyncHandler(async (req, res) => {
//   const { email, password, phone, name, address, birthDate } = req.body;
//   //validation
//   if (!email || !password || !name || !birthDate) return res.status(400).json({ msg: 'خانات إلزامية.' });
//   if (password.length < 5) return res.status(400).json({ msg: 'يجب أن تتكون كلمة المرور من 5 أحرف على الأقل.' });
//   const existingUser = await User.findOne({ email: email });
//   if (existingUser) return res.status(400).json({ msg: 'الحساب مع هذا البريد الإلكتروني موجود بالفعل.' });
//   const newUser = new User({
//     email,
//     password,
//     phone,
//     name,
//     role: 'ADMIN',
//     address,
//     birthDate,
//   });
//   const savedUser = await newUser.save();
//   savedUser.password = undefined;
//   try {
//     emailService.sendVerifMail(email, name, await generateToken(savedUser._id, config.email.secret));
//   } catch (error) {
//     console.log({ error });
//   }
//   res.json(savedUser);
// });

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
    newUser: updateduser,
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
    emailService.confirmAccEmail(user.email, user.name, await generateToken(user._id, config.email.secret));
  }
  res.json('لقد تم تفعيل حسابكم');
  // res.redirect(`${process.env.REACT_APP_CLIENT_URL}/sign-in`);
});

//@des get user details
//@route GET /api/user/
//@access private
export const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user).select('-password');

  if (resetExpiredWallet(user)) {
    await user.save();
  }

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
  const now = new Date();

  if (resetExpiredWallet(user)) {
    await user.save();
  }

  // Check if the pack has expired
  if (user.walletExpirationDate && user.walletExpirationDate < now) {
    return res.status(400).json({ msg: 'لقد انتهت صلاحية باقتك. يرجى تجديد الاشتراك.' });
  }

  if (!user.wallet || user.wallet < 1) return res.status(400).json({ msg: 'Empty wallet' });
  if (user.walletExpirationDate && user.walletExpirationDate < new Date()) {
    return res.status(400).json({ msg: 'Pack expired' });
  }
  const newConsultation = {
    ...req.body,
    userId: req.user,
  };
  const consultation = await Consultation.create(newConsultation);
  const avocats = await User.find({ role: 'PRO' });
  user.wallet = user.wallet - 1;
  user.userId = req.user;
  await user.save();
  await emailService.newConsultationEmail(consultation, avocats, req.body.filename);
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
    newConsultation: updatedconsultation,
  });
});

//@des buyPack
//@route POST /api/user/buyPack
//@access private
export const buyPack = asyncHandler(async (req, res) => {
  const fileName = req.body.filename;

  if (fileName !== 'online-payment') {
    const result = await createBankTransferTransaction({
      userId: req.user,
      packCode: req.body.packCode,
      fileName,
    });

    if (result.error) {
      return res.status(result.error.status).json({ msg: result.error.msg });
    }

    return res.status(201).json({
      transaction: serializeTransaction(result.transaction),
      user: result.user,
    });
  }

  return res.status(410).json({
    msg: 'Direct online payment confirmation is disabled. Use the transaction-based payment flow.',
  });
});

//@des createOrderNumber
//@route GET /api/user/createOrderNumber
//@access private
export const createOrderNumber = asyncHandler(async (req, res) => {
  const orderNumber = buildOrderNumber();
  res.json({ orderNumber });
});

//@des create card payment transaction
//@route POST /api/user/payments/card/initiate
//@access private
export const createCardPaymentTransaction = asyncHandler(async (req, res) => {
  const { packCode } = req.body;
  const contract = getPackContractByCode(packCode);

  if (!contract) {
    return res.status(400).json({ msg: 'Invalid pack code' });
  }

  const transaction = await PaymentTransaction.create({
    user: req.user,
    paymentMethod: 'CARD',
    packCode: contract.packCode,
    expectedAmount: contract.amount,
    status: 'PENDING_PROVIDER',
    provider: {
      orderNumber: buildOrderNumber(),
      lastUpdatedAt: new Date(),
    },
  });

  res.status(201).json({
    transaction: serializeTransaction(transaction),
  });
});

//@des create bank transfer payment transaction
//@route POST /api/user/payments/bank-transfer
//@access private
export const createBankTransferPayment = asyncHandler(async (req, res) => {
  const result = await createBankTransferTransaction({
    userId: req.user,
    packCode: req.body.packCode,
    fileName: req.body.filename,
  });

  if (result.error) {
    return res.status(result.error.status).json({ msg: result.error.msg });
  }

  res.status(201).json({
    transaction: serializeTransaction(result.transaction),
    user: result.user,
  });
});

//@des record card return outcome
//@route POST /api/user/payments/card/return
//@access private
export const recordCardPaymentReturn = asyncHandler(async (req, res) => {
  const { transactionId, outcome, payload } = req.body;

  if (!transactionId || !outcome) {
    return res.status(400).json({ msg: 'transactionId and outcome are required' });
  }

  const transaction = await PaymentTransaction.findOne({
    _id: transactionId,
    user: req.user,
    paymentMethod: 'CARD',
  });

  if (!transaction) {
    return res.status(404).json({ msg: 'Payment transaction not found' });
  }

  if (transaction.status === 'APPROVED') {
    return res.json({ transaction: serializeTransaction(transaction) });
  }

  if (!transaction.provider) {
    transaction.provider = {};
  }

  if (outcome === 'failed') {
    if (transaction.status === 'PENDING_PROVIDER' || transaction.status === 'AWAITING_VERIFICATION') {
      transaction.status = 'FAILED';
      transaction.provider.redirectStatus = 'FAILED';
    }
  }

  if (outcome === 'success') {
    const contract = getPackContractByCode(transaction.packCode);
    const user = await User.findById(req.user);

    if (!contract || !user) {
      return res.status(400).json({ msg: 'Unable to apply payment contract' });
    }

    if (!transaction.appliedAt) {
      await applyPackToUser(user, contract);
      transaction.confirmedAmount = contract.amount;
      transaction.status = 'APPROVED';
      transaction.verifiedAt = new Date();
      transaction.appliedAt = new Date();
      await emailService.buyPackEmail(user, 'online-payment');
    }

    transaction.provider.redirectStatus = 'SUCCESS';
  }

  transaction.provider.rawPayload = payload || transaction.provider.rawPayload;
  transaction.provider.lastUpdatedAt = new Date();
  await transaction.save();

  res.json({ transaction: serializeTransaction(transaction) });
});

//@des get payment transaction
//@route GET /api/user/payments/:transactionId
//@access private
export const getPaymentTransaction = asyncHandler(async (req, res) => {
  const transaction = await PaymentTransaction.findOne({
    _id: req.params.transactionId,
    user: req.user,
  }).populate('proofFile');

  if (!transaction) {
    return res.status(404).json({ msg: 'Payment transaction not found' });
  }

  res.json({ transaction: serializeTransaction(transaction) });
});
