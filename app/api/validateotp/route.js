import connectDB from "@/config/database";
import Otp from "@/models/Otp";
import User from "@/models/User";

export const dynamic = "force-dynamic";

export const POST = async (request) => {
  try {
    await connectDB();
    const { phoneNumber, otp } = await request.json();

    const response = await Otp.find({ phoneNumber })
      .sort({ createdAt: -1 })
      .limit(1);

    const userExists = await User.find({ phonenumber: phoneNumber });

    if (response[0]) {
      if (!(userExists.length > 0)) {
        const newUser = new User({
          phonenumber: phoneNumber,
        });

        await newUser.save();

        return new Response(JSON.stringify({ _id: newUser._id, phonenumber: phoneNumber }), {
          status: 200,
        });
      } else {
        return new Response(JSON.stringify(userExists[0]), {
          status: 200,
        });
      }
    } else {
      return new Response("Something went wrong", { status: 500 });
    }
  } catch (error) {
    //console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
