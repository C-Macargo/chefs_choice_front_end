"use client";

import useFetchData from "@/hooks/useFetchData";
import ProductCard from "../product-list/components/ProductCard";
import { error } from "console";

export default function DayMenuPage(): JSX.Element {
  const { data: dayMenu, isLoading: fetching, error: fetchError } = useFetchData("/menu/now");
  const isConflictError = "Failed to fetch data: Conflict"

  return (
    <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
      <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">Current Menu</h1>
      {fetching ? (
        <p>Loading days menu...</p>
      ) : isConflictError ? (
        <p>No menus available right now</p>
      ) : fetchError ? (
        <p className="text-red-500">Error: {fetchError.message || "An error occurred"}</p>
      ) : (
        Array.isArray(dayMenu) && dayMenu.length > 0 ? (
          <ul className="space-y-4">
            {dayMenu.map((menuItem: {
              id: string;
              name: string;
              description: string;
              image_url?: string;
              price: number;
            }) => (
              <li key={menuItem.id} className="p-4 bg-gray-200 dark:bg-gray-700 rounded-md">
                <ProductCard
                  description={menuItem.description || "No description available"}
                  imageUrl={menuItem.image_url || "default-image-url.png"}
                  name={menuItem.name}
                  price={menuItem.price.toString()}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p>No items available in the days menu</p>
        )
      )}
    </div>
  );
}
