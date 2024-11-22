import connectDB from "@/config/database";
import Items from "@/models/Items";
const mongoose = require('mongoose');

export const dynamic = "force-dynamic";

export const GET = async (request) => {
  try {
    await connectDB();

    const items = await Items.find({});

    return new Response(JSON.stringify(items), { status: 200 });
  } catch (error) {
    //console.log(error.message);
    return new Response("Something went wrong", { status: 500 });
  }
};

export const POST = async (request) => {
  try {
    await connectDB();

    const formData = await request.formData();

    const newItem = new Items({
      _id: new mongoose.Types.ObjectId().toString(),
      category_id: formData.get("category_id"),
      name: formData.get("name"),
      description: formData.get("description"),
      price: formData.get("price"),
      weight: formData.get("weight"),
      pieces: formData.get("pieces"),
      serves: formData.get("serves"),
      images: [formData.get("image1"), formData.get("image2")],
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

    const existingItem = await Items.findById({ _id: id });    

    if (!existingItem) {
      return new Response("Invalid Item ID", { status: 400 });
    }

    const formData = await request.formData();

    const itemFormData = {
      _id: id,
      category_id: formData.get("category_id"),
      name: formData.get("name"),
      description: formData.get("description"),
      price: formData.get("price"),
      weight: formData.get("weight"),
      pieces: formData.get("pieces"),
      serves: formData.get("serves"),
      images: [formData.get("image1"), formData.get("image2")],
    };

    const updatedItem = await Items.findByIdAndUpdate(
      id,
      itemFormData
    );

    return new Response(JSON.stringify(updatedItem), { status: 200 });
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

    const item = await Items.findById(id);

    await item.deleteOne();

    return new Response("Item Deleted Successfully", { status: 200 });
  } catch (error) {
    //console.log(error.message);
    return new Response("Something went wrong", { status: 500 });
  }
};
