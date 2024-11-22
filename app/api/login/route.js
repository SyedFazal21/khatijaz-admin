import connectDB from "@/config/database";
import Otp from "@/models/Otp";

export const dynamic = "force-dynamic";

export const POST = async (request) => {
  try {
    await connectDB();
    const { email, password } = await request.json();
    console.log(phoneNumber, otp)

    if(email == "superadmin@khatijaz.com" && password == "khatijaz@123")
      return new Response("Otp Sent successfully", { status: 200 });
    else
      return new Response("Invalid credentials", {status: 400});

  } catch (error) {
    //console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};

// async function sendOtp(mobileNumber, otp) {
//   // Replace with your Fast2SMS API key
//   const apiKey = process.env.SMS_API_KEY;
//   console.log(apiKey);

//   // Fast2SMS API endpoint
//   const url = 'https://www.fast2sms.com/dev/bulkV2';

//   // Data to be sent to the Fast2SMS API
//   const data = {
//     route: 'v3', // Or 'otp' if using the OTP route
//     sender_id: 'TXTIND', // Use your sender ID
//     message: `Your OTP for login is ${otp}`, // Replace with your message template
//     language: 'english',
//     numbers: mobileNumber // Comma-separated string of mobile numbers if sending to multiple numbers
//   };

//   // Configuration for the request
//   const config = {
//     headers: {
//       'authorization': apiKey,
//       'Content-Type': 'application/json'
//     }
//   };

//   try {
//     const response = await axios.post(url, data, config);
//     console.log('OTP sent successfully:', response.data);
//   } catch (error) {
//     console.error('Error sending OTP:', error.response ? error.response.data : error.message);
//   }
// }