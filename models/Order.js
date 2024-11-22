import { Schema, model, models } from "mongoose";
import {User} from './User';

const OrderSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product_ids: [
      {
        type: Number,
        required: true,
      },
    ],
    product_quantity: [
      {
        type: Number,
        required: true,
      },
    ],
    Order_total: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const Order = models.Order || model("Order", OrderSchema);

export default Order;