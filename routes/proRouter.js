const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
//REGISTER

router.post("/register", async (req, res) => {
  try {
    const {
      email,
      password,
      phone,
      name,
      address,
      specialization,
      bankId,
      classing,
    } = req.body;

    //validation

    if (!email || !password || !name)
      return res.status(400).json({ msg: "خانات إلزامية." });
    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "يجب أن تتكون كلمة المرور من 5 أحرف على الأقل." });

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "الحساب مع هذا البريد الإلكتروني موجود بالفعل." });

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      password: passwordHash,
      phone,
      name,
      role: "PRO",
      address,
      specialization,
      bankId,
      classing,
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Private
//DELETE

router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
});

//Token Valid

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
});

//Get User

router.get("/", auth, async (req, res) => {
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

//Get All Users

router.get("/all", auth, async (req, res) => {
  const user = await User.find().pretify;
  res.json(user);
});

module.exports = router;
