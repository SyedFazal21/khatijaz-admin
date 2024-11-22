import connectDB from "@/config/database";
import Order from "@/models/Order";

export const dynamic = "force-dynamic";

export const POST = async (request) => {
  try {
    await connectDB();
    const {
      user_id,
      product_ids,
      product_quantity,
      Order_total,
      status,
      address,
      location
    } = await request.json();

    const newOrder = new Order({
      user_id,
      product_ids,
      product_quantity,
      Order_total,
      status,
      address,
      location
    });

    await newOrder.save();

    return new Response("Order Created successfully", { status: 200 });
  } catch (error) {
    //console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};

export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const page = request.nextUrl.searchParams.get("page") || 1;
    const pageSize = request.nextUrl.searchParams.get("pageSize") || 4;

    const skip = (page - 1) * pageSize;

    const total = await Order.countDocuments({});

    const orders = await Order.find({ }).populate('user_id')
      .skip(skip)
      .sort({ createdAt: -1 })
      .limit(pageSize);

    const result = {
      total,
      orders,
    };

    return new Response(JSON.stringify(result), {
      status: 200,
    });
    
  } catch (error) {
    //console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
