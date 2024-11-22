import { Schema, model, models } from "mongoose";

const ItemSchema = new Schema(
  {
    _id: {
      type: String,
    },
    category_id: {
      type: String,
    },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    weight: {
      type: String,
    },
    pieces: {
      type: String,
    },
    serves: {
      type: String,
    },
    images: [
      {
        type: String
      },
    ],
    createdAt: {
      type: String,
    },
    updatedAt: {
      type: String,
    }
  }
);

const Items = models.Items || model("Items", ItemSchema);

export default Items;
