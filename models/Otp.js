import { Schema, model, models } from "mongoose";

const OtpSchema = new Schema(
  {
    phoneNumber: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
    },
  },
  { timestamps: true }
);

const Otp = models.Otp || model('Otp', OtpSchema);

export default Otp;
