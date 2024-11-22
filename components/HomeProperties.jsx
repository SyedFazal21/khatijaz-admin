"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CategoryCard from "./CategoryCard";

let cards = [];
let id = 1;

export default async function HomeProperties() {
  let [data, setData] = useState([]);
  let [categories, setCategories] = useState([]);
  const routerRedirect = useRouter();

  function filterCards() {
    const router = useSearchParams();
    id = router.get("id") != null ? router.get("id") : 1;
  
    if (id == 1) {
      return data;
    } else {
      return data.filter((card) => card.category_id === id);
    }
  }

  function redirectToCategoryPage(category_id) {
    if(category_id != 1) {
      routerRedirect.push(`/category?id=${category_id}`)
    }
  }

  function getCategoryName(category_id) {
    const category = categories.filter((category) => category.category_id == category_id )[0];
    return category.name;
  }

  useEffect(() => {
    const fetchItems = async () => {
      const res = await fetch(
        `/api/items`
      );

      if (res.status === 200) {
        const result = await res.json();
        setData(result);
      }
    };

    const fetchCategories = async () => {
      const res = await fetch(
        `/api/categories`
      );

      if (res.status === 200) {
        const result = await res.json();
        setCategories(result);
      }
    };

    fetchItems();
    fetchCategories();
  }, []);

  cards = filterCards();

  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto">
          {
            id != 1 && categories.length > 0 && (
              <div className="flex items-center justify-center">
                <button onClick={() => redirectToCategoryPage(id)} className="text-3xl font-bold text-blue-800 mb-6 text-center">
                  {getCategoryName(id)}
                </button>
              </div>
            )
          }
          {
            id == 1 && (
              <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">
                All
              </h2>
            )
          }
          {
            categories.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cards.map((card) => (
                  <CategoryCard key={card._id} category={card} />
                ))}
              </div>
            )
          }
        </div>
      </section>
    </>
  );
}
