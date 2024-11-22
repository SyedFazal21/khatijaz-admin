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
    description: "",
    price: "",
    weight: "",
    pieces: "",
    serves: "",
    image1: "",
    image2: "",
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
        `/api/items?id=${id}`,
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
        `/api/items`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (res.status === 200) {
        toast.success("Created Successfully");
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
        `/api/items?id=${id}`,
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
        `/api/items`
      );

      if (res.status === 200) {
        const result = await res.json();
        setData(result);
        const card = result.filter((card) => card._id === id)[0];
        
        setFields({
          _id: card._id,
          category_id: card.category_id,
          name: card.name,
          description: card.description,
          price: card.price,
          weight: card.weight,
          pieces: card.pieces,
          serves: card.serves,
          image1: card.images[0],
          image2: card.images[1] ? card.images[1] : "",
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
              id !== "new" ? "Update Card" : "Add Card"
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
              htmlFor="description"
              className="block text-gray-700 font-bold mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="border rounded w-full py-2 px-3"
              rows="4"
              placeholder="Description"
              value={fields.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-gray-700 font-bold mb-2"
            >
              Price
            </label>
            <input
              type="text"
              id="price"
              name="price"
              className="border rounded w-full py-2 px-3"
              placeholder="Price"
              value={fields.price}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="weight"
              className="block text-gray-700 font-bold mb-2"
            >
              Weight
            </label>
            <input
              type="text"
              id="weight"
              name="weight"
              className="border rounded w-full py-2 px-3"
              placeholder="Weight"
              value={fields.weight}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="pieces"
              className="block text-gray-700 font-bold mb-2"
            >
              Pieces
            </label>
            <input
              type="text"
              id="pieces"
              name="pieces"
              className="border rounded w-full py-2 px-3"
              placeholder="Pieces"
              value={fields.pieces}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="serves"
              className="block text-gray-700 font-bold mb-2"
            >
              Serves
            </label>
            <input
              type="text"
              id="serves"
              name="serves"
              className="border rounded w-full py-2 px-3"
              placeholder="Serves"
              value={fields.serves}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 bg-blue-50 p-4">
            <label className="block text-gray-700 font-bold mb-2">Images</label>
            <input
              type="text"
              id="image1"
              name="image1"
              className="border rounded w-full py-2 px-3 mb-2"
              placeholder="Image 1"
              value={fields.image1}
              onChange={handleChange}
            />
            <input
              type="text"
              id="image2"
              name="image2"
              className="border rounded w-full py-2 px-3 mb-2"
              placeholder="Image 2"
              value={fields.image2}
              onChange={handleChange}
            />
          </div>
          <div>
            {
              id !== "new" && (
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Update Card
                </button>
              )
            }
            {
              id === "new" && (
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Create Card
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
                  Delete Card
                </button>
              )
            }
          </div>
      </form>
    </div>
  );
}
