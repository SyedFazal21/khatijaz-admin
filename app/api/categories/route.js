import connectDB from "@/config/database";
import Category from "@/models/Category";
const mongoose = require('mongoose');

export const dynamic = "force-dynamic";

export const GET = async (request) => {
  try {
    await connectDB();

    const categories = await Category.find({});

    return new Response(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    //console.log(error.message);
    return new Response("Something went wrong", { status: 500 });
  }
};

export const POST = async (request) => {
  try {
    await connectDB();

    const totalItems = await Category.countDocuments({});

    const formData = await request.formData();

    const newItem = new Category({
      _id: new mongoose.Types.ObjectId().toString(),
      category_id: totalItems + 1,
      name: formData.get("name"),
      image: formData.get("image")
    });

    await newItem.save();

    return new Response(JSON.stringify(newItem), { status: 200 });
  } catch (error) {
    //console.log(error.message);
    return new Response("Something went wrong", { status: 500 });
  }
};

export const PUT = async (request) => {
  try {
    await connectDB();
    
    const id = request.nextUrl.searchParams.get('id');

    let existingItem = await Category.findOne({ category_id: id }); 

    //console.log(existingItem);
    
    if (!existingItem) {
      return new Response("Invalid Item ID", { status: 400 });
    }

    const formData = await request.formData();

    const itemFormData = {
      category_id: formData.get("category_id"),
      name: formData.get("name"),
      image: formData.get("image")
    };

    existingItem.category_id = itemFormData.category_id;
    existingItem.name = itemFormData.name;
    existingItem.image = itemFormData.image;
    
    await existingItem.save();

    return new Response(JSON.stringify(existingItem), { status: 200 });
  } catch (error) {
    //console.log(error.message);
    return new Response("Something went wrong", { status: 500 });
  }
};

// DELETE by id
export const DELETE = async (request) => {
  try {
    await connectDB();

    const id = request.nextUrl.searchParams.get('id');    

    if (!id)
      return new Response("Item ID is required", { status: 400 });

    const item = await Category.findOne({ category_id: id });        

    await item.deleteOne();

    return new Response("Item Deleted Successfully", { status: 200 });
  } catch (error) {
    //console.log(error.message);
    return new Response("Something went wrong", { status: 500 });
  }
};
