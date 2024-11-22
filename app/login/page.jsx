"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

export default function page() {
  const router = useRouter();

  const [mobileNumber, setMobileNumber] = useState("");
  const [showOtp, setShowOtp] = useState(false);

  const [error, setError] = useState("");
  const [otpError, setOtpError] = useState("");

  const [otp, setOtp] = useState("");

  function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  const handleOTPchange = (e) => {
    const value = e.target.value;

    // Only allow digits and limit input to 6 characters
    if (/^\d*$/.test(value) && value.length <= 6) {
      setOtp(value);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;

    // Only allow digits and limit input to 10 characters
    if (/^\d*$/.test(value) && value.length <= 10) {
      setMobileNumber(value);
    }
  };

  const handleBlur = () => {
    if (!mobileNumber) {
      setError("Mobile number is required.");
    } else if (mobileNumber.length < 10) {
      setError("Mobile number must be at least 10 digits long.");
    } else {
      setError("");
    }
  };

  const handleOTPblur = () => {
    if (!otp) {
      setError("OTP is required.");
    } else {
      setError("");
    }
  };

  const handleSubmit = async () => {
    // Validate mobile number
    const length = mobileNumber.length;
    if (length === 0) {
      setError("Mobile number is required.");
    }

    if (length !== 10) {
      return;
    }

    // Show OTP screen
    if (!showOtp) {
      // Send OTP
      const generatedOTP = generateOTP();
      const otpPayload = { phoneNumber: mobileNumber, otp: generatedOTP };
      console.log(otpPayload);
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: mobileNumber,
          otp: generatedOTP,
        }),
      });

      if (res.status !== 200) {
        toast.error("Failed to send OTP");
      }
      
      setShowOtp(true);
      toast.success('OTP sent successfully');
      return;
    }
  };

  const validateOtp = async () => {
    const otpLength = otp.length;

    if (otpLength === 0) {
      setOtpError("OTP is required.");
      return;
    }

    if (otpLength !== 6) {
      setOtpError("Invalid OTP.");
      return;
    }

    setError("");
    setOtpError("");

    const res = await fetch("/api/validateotp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber: mobileNumber,
        otp,
      }),
    });

    if(res.status === 200) {
      const data = await res.json();
      const user = {
        _id: data.id != null ? data.id : data._id,
        mobile: data.phonenumber,
      }

      if(data.address) {
        user['address'] = data.address;
      }

      if(data.landmark) {
        user['landmark'] = data.landmark;
      }

      if(data.username) {
        user['username'] = data.username;
      }

      localStorage.setItem('LoggedInUserDetails', JSON.stringify(user));
      router.push('/address');
    } else {
      setOtpError("Invalid Error");
    }
  };

  const changeMobileNumber = () => {
    setMobileNumber("");
    setOtp("");
    setError("");
    setOtpError("");
    setShowOtp(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full pl-2 pr-2 dark:bg-white">
      <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 ml-2 mr-2 w-full">
        {!showOtp && (
          <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">
            Welcome Back!
          </h1>
        )}
        {showOtp && (
          <h2 className="text-xl font-bold text-center mb-4 dark:text-gray-200">
            Enter OTP sent to +91-{mobileNumber}
          </h2>
        )}
        {!showOtp && (
          <div className="mb-4">
            <label
              htmlFor="mobile"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Mobile Number
            </label>
            <input
              type="text"
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={mobileNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              maxLength="10" // To ensure no more than 10 characters are input
            />
            {error && <p className="text-red-500 mt-1">{error}</p>}
          </div>
        )}
        {showOtp && (
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              OTP
            </label>
            <input
              type="text"
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your OTP"
              onChange={handleOTPchange}
              onBlur={handleOTPblur}
              maxLength="6" // To ensure no more than 10 characters are input
              disabled={!showOtp}
            />
            {otpError && <p className="text-red-500 mt-1">{otpError}</p>}
          </div>
        )}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center"></div>
          {showOtp && (
            <a
              href="#"
              onClick={changeMobileNumber}
              className="text-md text-white"
            >
              Change Mobile Number
            </a>
          )}
        </div>
        {!showOtp && (
          <button
            onClick={handleSubmit}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Next
          </button>
        )}
        {showOtp && (
          <button
            onClick={validateOtp}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
