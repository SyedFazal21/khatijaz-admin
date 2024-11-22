"use client";
import React, { useState, useEffect } from "react";
import Modal from "@/components/Modal";
import { MdLocationPin, MdDone, MdWrongLocation } from "react-icons/md";
import { getDistance } from "geolib";
import LocationUnavailable from "@/components/LocationUnavailable";

export default function page() {
  const shopLocation = [
    {
      lat: "17.3998771",
      lng: "78.3921039",
    },
  ];
  const [location, setLocation] = useState({ lat: null, lng: null });
  let [showModal, setShowModal] = useState(false);
  let [locationUnavailable, setLocationUnavailable] = useState(false);
  const [error, setError] = useState("");

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const [nameError, setNameError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [landMarkError, setLandMarkError] = useState("");

  const isLocationAvailable = (location) => {
    shopLocation.map((item) => {
      const distance = getDistance(
        { latitude: item.lat, longitude: item.lng },
        { latitude: location.lat, longitude: location.lng }
      );

      const distanceInKm = distance / 1000;

      console.log(distanceInKm);

      return distanceInKm > 5;
    });
  };

  useEffect(() => {
    const user = localStorage.getItem("LoggedInUserDetails");
    if (user) {
      const userDetails = JSON.parse(user);
      console.log(userDetails);
      setMobileNumber(userDetails.mobile);
      setId(userDetails._id);

      if (userDetails.username) {
        setName(userDetails.username);
      }

      if (userDetails.address) {
        setAddress(userDetails.address);
      }

      if (userDetails.landmark) {
        setLandmark(userDetails.landmark);
      }
    }
  }, []);

  const handleBuyNow = async () => {
    if (name.length === 0) {
      setNameError("Name is required");
      return;
    }

    if (address.length === 0) {
      setAddressError("Address is required");
      return;
    }

    if (landmark.length === 0) {
      setLandMarkError("Landmark is required");
      return;
    }

    if (!location.lat || !location.lng) {
      return;
    }

    if (isLocationAvailable(location)) {
      setLocationUnavailable(true);
      console.log("Location is not available");
      return;
    }

    const userPayload = {
      id,
      address,
      landmark,
      name,
    };

    const res = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userPayload),
    });

    if (res.status === 200) {
      const data = await res.json();
      localStorage.setItem("LoggedInUserDetails", JSON.stringify(data));
      setShowModal(true);
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          localStorage.setItem(
            "location",
            JSON.stringify(
              `https://www.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`
            )
          );
          setError("");
        },
        (error) => {
          setError(
            "Unable to retrieve location. Please check your permissions."
          );
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  //   useEffect(() => {
  //     getLocation();
  //   }, [])

  return (
    <section className="bg-white h-screen dark:bg-gray-800">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl pb-4 font-bold text-gray-900 dark:text-white">
          Add a new product
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div className="sm:col-span-2">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
            />
            {nameError && <p className="text-red-500 mt-1">{nameError}</p>}
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Address
            </label>
            <input
              type="text"
              name="name"
              value={address}
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Enter your address"
              onChange={(e) => setAddress(e.target.value)}
            />
            {addressError && (
              <p className="text-red-500 mt-1">{addressError}</p>
            )}
          </div>
          <div className="w-full">
            <label
              htmlFor="brand"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Landmark
            </label>
            <input
              type="text"
              name="brand"
              value={landmark}
              id="brand"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Enter your landmark"
              onChange={(e) => setLandmark(e.target.value)}
            />
            {landMarkError && (
              <p className="text-red-500 mt-1">{landMarkError}</p>
            )}
          </div>
          <div className="w-full mb-5">
            <label
              htmlFor="price"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Phone Number
            </label>
            <input
              type="number"
              name="price"
              id="price"
              value={mobileNumber}
              className="bg-gray-50 border cursor-not-allowed border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="price"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-yellow-300"
            >
              For seamless delivery experience click below to share your exact
              location
            </label>
            <button
              onClick={getLocation}
              className="group relative overflow-hidden bg-blue-600 focus:ring-4 focus:ring-blue-300 inline-flex items-center px-7 py-2.5 rounded-lg text-white justify-center"
            >
              <span className="z-40 mr-1">Share Location</span>
              <MdLocationPin />
              <div className="absolute inset-0 h-[200%] w-[200%] rotate-45 translate-x-[-70%] transition-all group-hover:scale-100 bg-white/30 group-hover:translate-x-[50%] z-20 duration-1000"></div>
            </button>
            {location.lat && location.lng && (
              <button className="focus:outline-none ml-5 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                <MdDone />
              </button>
            )}
            {!location.lat ||
              (!location.lng && (
                <button className="focus:outline-none ml-5 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                  <MdWrongLocation />
                </button>
              ))}
            {(!location.lat || !location.lng) && (
              <p className="text-red-500 mt-1">Location is required</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex p-[20px] justify-end">
        <button
          type="button"
          onClick={handleBuyNow}
          className={`${
            name && address && landmark && location.lat && location.lng
              ? ""
              : "opacity-25"
          } text-white flex items-center bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-lg px-8 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800`}
        >
          <svg
            className="w-4 h-4 me-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 21"
          >
            <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
          </svg>
          Buy now
        </button>
      </div>
      {showModal && <Modal setModal={setShowModal} />}
      {locationUnavailable && <LocationUnavailable setModal={setLocationUnavailable} />}
    </section>
  );
}
