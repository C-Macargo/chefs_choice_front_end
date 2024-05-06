"use client";

import useFetchData from "@/hooks/useFetchData";
import ProductCard from "../product-list/components/ProductCard";

interface Menu {
  id: string;
  name: string;
  description: string;
  isDay: boolean;
  products: {
    id: string;
    name: string;
    description?: string;
    image_url?: string;
    price: number;
  }[];
}

export default function DayMenuPage(): JSX.Element {
  const { data: dayMenu, isLoading: fetching, error: fetchError } = useFetchData("/menu/now");

  const hasMenuProducts = dayMenu && Array.isArray(dayMenu.products) && dayMenu.products.length > 0;

  return (
    <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
      <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">Current Menu</h1>
      {fetching ? (
        <p>Loading days menu...</p>
      ) : fetchError ? (
        <p className="text-red-500">Error: {fetchError.message || "An error occurred"}</p>
      ) : hasMenuProducts ? (
        <ul className="space-y-4">
          {dayMenu.products.map((product: {
            id: string;
            name: string;
            description?: string;
            image_url?: string;
            price: number;
          }) => (
            <li key={product.id} className="p-4 bg-gray-200 dark:bg-gray-700 rounded-md">
              <ProductCard
                description={product.description || "No description available"}
                imageUrl={product.image_url || "default-image-url.png"}
                name={product.name}
                price={product.price.toString()}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No items available in the days menu</p>
      )}
    </div>
  );
}
