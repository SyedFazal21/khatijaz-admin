"use client";
import React, { useEffect, useState } from "react";
import { deleteFromCart, getCartItems } from "../../service/cartService";
import { getPriceById, getNameById } from "@/service/productService";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();

  let [cartItems, setCartItems] = useState([]);
  let price = 0;

  const onCheckout = () => {
    // Check if user is loggedin
    const user = localStorage.getItem("LoggedInUserDetails");

    if (user) {
      router.push(`/address`);
    } else {
      router.push(`/login`);
    }
  };

  useEffect(() => {
    setCartItems(getCartItems());
  }, []);

  return (
    <section
      className="h-screen bg-gray-100 px-4 text-gray-600 antialiased"
      x-data="app"
    >
      <div className="mt-4">
        <div className="mx-auto w-full max-w-2xl rounded-sm border border-gray-200 bg-white shadow-lg">
          <header className="border-b border-gray-100 px-5 py-4">
            <div className="font-semibold text-gray-800">Manage Carts</div>
          </header>

          <div className="overflow-x-auto p-3">
            <table className="w-full table-auto">
              <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-400">
                <tr>
                  <th></th>
                  <th className="p-2">
                    <div className="text-left font-semibold">Product Name</div>
                  </th>
                  <th className="p-2">
                    <div className="text-left font-semibold">Quantity</div>
                  </th>
                  <th className="p-2">
                    <div className="text-left font-semibold">Total</div>
                  </th>
                  <th className="p-2">
                    <div className="text-center font-semibold">Action</div>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 text-sm">
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td className="p-2"></td>
                    <td className="p-2">
                      <div className="font-medium text-gray-800">
                        {getNameById(item.id)}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-left">{item.quantity}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-left font-medium text-green-500">
                        {getPriceById(item.id) * item.quantity}
                        {/* {getPriceById(item.id) * item.quantity} */}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="flex justify-center">
                        <button onClick={() => deleteFromCart(item.id)}>
                          <svg
                            className="h-8 w-8 rounded-full p-1 hover:bg-gray-100 hover:text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end space-x-4 border-t border-gray-100 px-5 py-4 text-2xl font-bold">
            <div>Total</div>
            {cartItems.map((item) => {
              price += getPriceById(item.id) * item.quantity;
            })}
            <div className="text-blue-600">
              ₹{price} <span x-text="total.toFixed(2)"></span>
            </div>
          </div>

          <div className="flex justify-end m-4">
            <button
              href="#"
              onClick={onCheckout}
              className="inline-flex items-center px-3 py-2 text-xl font-bold text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:outline-none dark:bg-red-600 dark:hover:bg-red-700"
            >
              Checkout
            </button>
          </div>

          <div className="flex justify-end">
            <input
              type="hidden"
              className="border border-black bg-gray-50"
              x-model="selected"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
