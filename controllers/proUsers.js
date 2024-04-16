import asyncHandler from 'express-async-handler';
import User from '../models/user';
import generateToken from '../helpers/generateToken';
import emailService from '../services/email';
import config from '../config';

//@des register new pro user
//@route POST /api/userpro/register
//@access public
export const register = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;
  //validation
  if (!email || !password || !name) return res.status(400).json({ msg: 'خانات إلزامية.' });
  if (password.length < 8) return res.status(400).json({ msg: 'يجب أن تتكون كلمة المرور من 8 أحرف على الأقل.' });
  const existingUser = await User.findOne({ email: email });
  if (existingUser) return res.status(400).json({ msg: 'الحساب مع هذا البريد الإلكتروني موجود بالفعل.' });

  const newUser = new User({
    ...req.body,
    role: 'PRO',
  });
  const savedUser = await newUser.save();
  savedUser.password = undefined;
  const token = await generateToken(savedUser._id, config.email.secret);
  await emailService.sendVerifAvocatMail(savedUser, token);
  res.json({ msg: 'email sent to an admin', savedUser });
});

//@des remove user
//@route DELETE /api/userpro/delete
//@access private
export const deleteUser = asyncHandler(async (req, res) => {
  const deletedUser = await User.findById(req.user);
  deletedUser.deletedAt = Date.now();
  deletedUser.save();
  res.json({ msg: 'success' });
});

//@des test if token is valid
//@route GET /api/userpro/tokenIsValid
//@access private
export const tokenIsValid = asyncHandler(async (req, res) => {
  return res.json(req.user ? true : false);
});

//@des get user details
//@route GET /api/userpro/
//@access private

export const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    id: user._id,
    email: user.email,
    phone: user.phone,
    name: user.name,
    address: user.address,
    role: user.role,
    specialization: user.specialization,
    bankId: user.bankId,
    classing: user.classing,
  });
});

//@des get all user
//@route GET /api/userpro/all
//@access private
export const getAll = asyncHandler(async (req, res) => {
  const user = await User.find({ role: 'PRO' });
  res.json(user);
});

//@des update user
//@route PUT /api/userpro/update
//@access private
export const update = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user);
  user.email = req.body.email || user.email;
  user.phone = req.body.phone || user.phone;
  user.name = req.body.name || user.name;
  user.address = req.body.address || user.address;
  const updateduser = await user.save();
  res.json({
    newUser: updateduser,
  });
});
