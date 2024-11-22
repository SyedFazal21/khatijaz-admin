import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import {
  addToCart,
  removeFromCart,
  getCurrentItemCount,
} from "@/service/cartService";

export default function CategoryCard({ category }) {
  const router = useRouter();
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    setItemCount(getCurrentItemCount(category._id));
  }, [itemCount]);

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg cursor-pointer shadow dark:fff dark:border-gray-700"
         onClick={() => router.push(`/carddetails?id=${category._id}`)}>
      <Image
        src={category.images[0]}
        alt=""
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        className="w-auto h-30 rounded-t-xl"
      />
      <div className="p-5">
        <a href="#">
          <h5
            className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-black-400"
          >
            {category.name}
          </h5>
        </a>
        <p
          className="mb-3 font-normal text-gray-700 dark:text-black-400"
        >
          {category.weight} | {category.pieces} | Serves {category.serves}
        </p>
        <div className="flex justify-between">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-black-400">
            ₹{category.price}
          </h5>
        </div>
      </div>
    </div>
  );
}
