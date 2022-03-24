import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
let ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema(
  {
    status: {
      isVerified: { type: Boolean, default: true } ,
    },
    email: {
      type: String,
      require: true,
      uniqueCaseInsensitive: true,
      trim: true,
      unique: true,
      set: (v) => v.toLowerCase(),
    },
    password: { type: String },
    phone: { type: String },
    name: { type: String, required: true },
    birthDate: { type: Date },
    role: { type: String, default: 'USER' },
    address: { type: String },
    class: { type: String },
    wallet: { type: Number, default: 0 },
    specialization: { type: String },
    type: { type: String },
    files: [
      {
        type: ObjectId,
        ref: 'file',
      },
    ],
    bankId: { type: String },
    deletedAt: { type: Date },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

userSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};

const User = mongoose.model('user', userSchema);
export default User;
