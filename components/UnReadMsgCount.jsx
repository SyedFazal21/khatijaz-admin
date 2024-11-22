import { useGlobalContext } from "@/context/GlobalContext";
import React, { useEffect } from "react";
import { getTotalCartItems } from "@/service/cartService";
import { IoInformationCircleOutline } from "react-icons/io5";


export default function UnreadMessageCount() {
  const { count, setCount } = useGlobalContext();

  useEffect(() => {
    const getCount = () => {
      setCount(getTotalCartItems());
    };

    getCount();
  }, [count]);
  return (
    count > 0 && (
      <span
        className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 
                text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2
                bg-red-600 rounded-full"
      >
        <IoInformationCircleOutline />
      </span>
    )
  );
}
