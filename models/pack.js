import mongoose from 'mongoose';

const packSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    consultationNumber: {
      type: Number,
    },
    price: {
      type: String,
    },
    deletedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

packSchema.methods.toJSON = function () {
  let obj = this.toObject();
  return obj;
};

const Pack = mongoose.model('pack', packSchema);
export default Pack;
