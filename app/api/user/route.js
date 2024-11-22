import connectDB from "@/config/database";
import User from "@/models/User";

export const dynamic = "force-dynamic";

export const POST = async (request) => {
  try {
    await connectDB();
    const { id, address, name, landmark } = await request.json();

    const response = await User.findOneAndUpdate(
        { _id: id }, // Query to find the document by id
        { $set: { address, username:name, landmark } }, // Update the address and name fields
        { new: true } // Option to return the updated document
      );

    return new Response(JSON.stringify(response), { status: 200 });

  } catch (error) {
    //console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
