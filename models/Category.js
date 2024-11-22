import { Schema, model, models } from "mongoose";

const CategorySchema = new Schema(
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
    image: {
      type: String,
    }
  }
);

const Category = models.Category || model("Category", CategorySchema);

export default Category;
