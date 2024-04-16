import mongoose from 'mongoose';
let ObjectId = mongoose.Schema.Types.ObjectId;

const consultationSchema = new mongoose.Schema(
  {
    isClosed: { type: Boolean, default: false },
    type: { type: String, required: true },
    title: { type: String, required: true },
    date: { type: Date },
    description: { type: String },
    field: { type: String },
    name: { type: String },
    files: [
      {
        type: ObjectId,
        ref: 'file',
      },
    ],
    userId: {
      type: ObjectId,
      ref: 'user',
    },
    clientId: {
      type: ObjectId,
      ref: 'user',
    },
    deletedAt: { type: Date },
  },
  { timestamps: true }
);

consultationSchema.methods.toJSON = function () {
  let obj = this.toObject();
  return obj;
};

const Consultation = mongoose.model('consultation', consultationSchema);
export default Consultation;
