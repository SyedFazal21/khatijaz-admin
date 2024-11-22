import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    phonenumber: {
      type: String,
      unique: [true, "Phonenumber already registered"],
      required: [true, "Phonenumber is required"],
    },
    username: {
      type: String,
    },
    address: {
      type: String,
    },
    landmark: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

const User = models.User || model("User", UserSchema);

export default User;
