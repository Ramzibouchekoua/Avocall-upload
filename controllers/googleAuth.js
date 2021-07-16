import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import generateToken from '../helpers/generateToken';
import User from '../models/user';

//@des login Route
//@route POST /api/auth/googleLogin
//@access Public
export const login = asyncHandler(async (req, res) => {
  const { email, name } = req.body;
  //validation
  const user = await User.findOne({ email: email });
  if (!user) {
    const newUser = new User({
      email,
      name,
      role: 'USER',
    });
    const savedUser = await newUser.save();
    res.json({
      token: generateToken(savedUser.googleId),
      user: savedUser,
    });

  }

  if (user.deletedAt) return res.status(400).json({ msg: 'تم حذف هذا الحساب الرجاء التواصل مع ادارة الموقع ' });
  if (user.role === 'USER') {
    res.json({
      token: generateToken(user._id),
      user: {
        status: { isVerified: user.status.isVerified },
        id: user._id,
        email: user.email,
        phone: user.phone,
        name: user.name,
        address: user.address,
        role: user.role,
        wallet: user.wallet,
        files: user.files,
      },
    });
  } else {
    res.json({
      token: generateToken(user._id),
      user: {
        id: user._id,
        email: user.email,
        phone: user.phone,
        name: user.name,
        address: user.address,
        role: user.role,
        specialization: user.specialization,
        bankId: user.bankId,
        classing: user.classing,
      },
    });
  }
});
