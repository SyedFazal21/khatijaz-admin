"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getNameById } from "@/service/productService";
import Pagination from "@/components/Pagination";

export default function page() {
  const router = useRouter();
  let [data, setData] = useState([]);
  let [orders, setOrders] = useState([]);
  let user_id = "";

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [totalItems, setTotalItems] = useState(0);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  function formatDate(currentDate) {
    const date = new Date(currentDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch(
        `/api/orders/${123}?page=${page}&pageSize=${pageSize}`
      );

      if (res.status === 200) {
        const data = await res.json();
        setOrders(data.orders);
        setTotalItems(data.total);
      }
    };

    const fetchItems = async () => {
      const res = await fetch(
        `/api/items`
      );

      if (res.status === 200) {
        const result = await res.json();
        setData(result);
      }
    };

    if(data.length <= 0) fetchItems();

    fetchOrders();
  }, [page, pageSize]);

  return (
    <div className="bg-white p-8 rounded-md w-full">
      <div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4">
          {orders.length > 0 && (
            <div className="inline-block shadow rounded-lg">
              <table className="leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Item Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Address
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Landmark
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Phone Number
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      User Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  { orders.length > 0 && orders.map((item) => (
                    <tr>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="ml-3">
                            <ol>
                              {
                                item.product_ids.map((item, i) => (
                                  getNameById(item, data) && (
                                    <span> <li key={i}>{getNameById(item, data)}</li> <br /> </span>
                                  )
                                ))
                              }
                            </ol>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="ml-3">
                            <ol>
                              {
                                item.product_quantity.map((item, i) => (
                                    <span> <li key={i}>{item}</li> <br /> </span>
                                  )
                                )
                              }
                            </ol>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p>{item.user_id?.address}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p>{item.user_id?.landmark}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p>{item.user_id?.phonenumber}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p>{item.user_id?.username}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <a target="_blank" className="text-blue-500" href={item.location?.slice(1, -1)}>Location</a>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {formatDate(item.createdAt)} <br />
                          {new Date(item.createdAt).toLocaleTimeString()}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {item.Order_total}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                          <span
                            aria-hidden
                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                          ></span>
                          <span className="relative">{item.status}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                page={page}
                pageSize={pageSize}
                totalItems={totalItems}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
