"use client"
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function Hero() {
  const router = useSearchParams();
  const id = router.get("id");
  let [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(
        `/api/categories`
      );

      if (res.status === 200) {
        const result = await res.json();
        setCategories(result);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="text-sm font-medium text-center flex justify-center text-gray-500 border-b bg-red-50 border-gray-200 dark:text-gray-400 dark:border-gray-700">
      <ul className="flex flex-wrap -mb-px">
        {categories.length > 0 && categories.map((cat) => (
          <li key={cat.category_id} className="">
            <Link
              href={`/admin?id=${cat.category_id}`}
              className={`inline-block p-4 text-black border-b-2 border-blue-600 ${id == cat.category_id ? 'border-b-2 border-b-red-500' : ''} rounded-t-lg dark:text-black-500`}
            >
              <Image
                width={125}
                height={125}
                src={cat.image}
                alt="PropertyPulse"
              />
              <span className="text-lg">{cat.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
