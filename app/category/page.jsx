"use client";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";

export default function CardDetails() {
  let [data, setData] = useState([]);
  const router = useSearchParams();
  const routerRedirect = useRouter();
  
  const id = router.get("id") != null ? router.get("id") : "";
  const [itemCount, setItemCount] = useState(0);

  const [fields, setFields] = useState({
    _id: "",
    category_id: "",
    name: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmitPut = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);
      const res = await fetch(
        `/api/categories?id=${id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (res.status === 200) {
        toast.success("Updated Successfully");
        routerRedirect.push(`/admin`);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      //console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleFormSubmitPost = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);
      const res = await fetch(
        `/api/categories`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (res.status === 200) {
        toast.success("Updated Successfully");
        routerRedirect.push(`/admin`);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      //console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (e) => {
    try {
      const res = await fetch(
        `/api/categories?id=${id}`,
        {
          method: "DELETE",
        }
      );

      if (res.status === 200) {
        toast.success("Deleted Successfully");
        routerRedirect.push(`/admin`);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      //console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleFormSubmit = (e) => {
    if(id === "new") handleFormSubmitPost(e)
    else handleFormSubmitPut(e)
  }

  useEffect(() => {    
    const fetchItems = async () => {
      const res = await fetch(
        `/api/categories`
      );

      if (res.status === 200) {
        const result = await res.json();
        setData(result);
        const card = result.filter((card) => card.category_id === id)[0];
        
        setFields({
          _id: card._id,
          category_id: card.category_id,
          name: card.name,
          image: card.image,
        });
      }
    };

    if(id !== "new") fetchItems();
  }, [itemCount]);

  return (
    <div className="flex items-center justify-center">
      <form onSubmit={handleFormSubmit}>
          <h2 className="text-3xl mt-3 text-center font-semibold mb-6">
            {
              id !== "new" ? "Update Category" : "Add Category"
            }
          </h2>
          <div className="mb-4">
            <label
              htmlFor="category_id"
              className="block text-gray-700 font-bold mb-2"
            >
              Category ID
            </label>
            <input
              type="text"
              id="category_id"
              name="category_id"
              className="border rounded w-full py-2 px-3"
              placeholder="Category ID"
              required
              value={fields.category_id}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="border rounded w-full py-2 px-3 mb-2"
              placeholder="Name"
              required
              value={fields.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-gray-700 font-bold mb-2"
            >
              Image
            </label>
            <textarea
              id="image"
              name="image"
              className="border rounded w-full py-2 px-3"
              rows="4"
              placeholder="Image"
              value={fields.image}
              onChange={handleChange}
            ></textarea>
          </div>
          <div>
            {
              id !== "new" && (
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Update Category
                </button>
              )
            }
            {
              id === "new" && (
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Create Category
                </button>
              )
            }
            {
              id !== "new" && (
                <button
                  className="bg-red-500 hover:bg-red-600 mt-3 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={() => handleDelete()}
                >
                  Delete Category
                </button>
              )
            }
          </div>
      </form>
    </div>
  );
}
