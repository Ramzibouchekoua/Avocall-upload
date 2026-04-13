import mongoose from 'mongoose';

let ObjectId = mongoose.Schema.Types.ObjectId;

const paymentTransactionSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: 'user',
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ['CARD', 'BANK_TRANSFER'],
      required: true,
    },
    packCode: {
      type: String,
      required: true,
    },
    expectedAmount: {
      type: Number,
      required: true,
    },
    confirmedAmount: {
      type: Number,
    },
    status: {
      type: String,
      enum: ['PENDING_PROVIDER', 'AWAITING_VERIFICATION', 'PENDING_REVIEW', 'APPROVED', 'REJECTED', 'FAILED'],
      required: true,
    },
    provider: {
      orderNumber: {
        type: String,
        index: true,
      },
      redirectStatus: {
        type: String,
      },
      rawPayload: {
        type: mongoose.Schema.Types.Mixed,
      },
      lastUpdatedAt: {
        type: Date,
      },
    },
    proofFile: {
      type: ObjectId,
      ref: 'file',
    },
    reviewedBy: {
      type: ObjectId,
      ref: 'user',
    },
    reviewedAt: {
      type: Date,
    },
    verifiedAt: {
      type: Date,
    },
    appliedAt: {
      type: Date,
    },
    rejectionReason: {
      type: String,
    },
  },
  { timestamps: true },
);

paymentTransactionSchema.methods.toJSON = function () {
  return this.toObject();
};

const PaymentTransaction = mongoose.model('paymentTransaction', paymentTransactionSchema);

export default PaymentTransaction;
