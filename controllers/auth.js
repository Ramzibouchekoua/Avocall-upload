import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import generateToken from '../helpers/generateToken';
import User from '../models/user';

//@des login Route
//@route POST /api/auth/login
//@access Public
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //validation
  if (!email || !password) return res.status(400).json({ msg: 'خانات إلزامية.' });
  const user = await User.findOne({ email: email });
  if (!user) return res.status(400).json({ msg: 'لا يوجد حساب موجود مع هذا البريد الإلكتروني.' });

  if (!(await user.matchPassword(password))) return res.status(400).json({ msg: 'بيانات الاعتماد غير صالحة.' });
  if (user.deletedAt) return res.status(400).json({ msg: 'تم حذف هذا الحساب الرجاء التواصل مع ادارة الموقع ' });
  if (!user.status.isVerified) {
    return res.status(400).json({ msg: user.role === 'user' || 'admin' ? 'هذا الحساب غير مفعل' : 'هذا الحساب غير مفعل' });
  }
  if (user.role === 'USER' || user.role === 'ADMIN') {
    res.json({
      token: await generateToken(user._id),
      user: {
        status: { isVerified: user.status.isVerified },
        id: user._id,
        email: user.email,
        phone: user.phone,
        name: user.name,
        address: user.address,
        role: user.role,
        wallet: user.wallet,
        files: user.files
      }
    });
  } else {
    res.json({
      token: await generateToken(user._id),
      user: {
        id: user._id,
        email: user.email,
        phone: user.phone,
        name: user.name,
        address: user.address,
        role: user.role,
        specialization: user.specialization,
        bankId: user.bankId,
        classing: user.classing
      }
    });
  }
});
