"use client";

import useFetchData from "@/hooks/useFetchData";
import ProductCard from "./components/ProductCard";

export default function CreateProductCategoryPage(): JSX.Element {
  const { data: categories, isLoading: fetching, error: fetchError } = useFetchData("/category/");

  return (
    <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
      <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">Product List</h1>
      {fetching ? (
        <p>Loading products...</p>
      ) : fetchError ? (
        <p className="text-red-500">Error: {fetchError.message}</p>
      ) : (
        Array.isArray(categories) && categories.length > 0 ? (
          <ul className="space-y-4">
            {categories.map((category: {
              id: string;
              name: string;
              description: string;
              products: { id: string; name: string; description?: string; image_url?: string; price: number }[];
            }) => (
              <li key={category.id} className="p-4 bg-gray-200 dark:bg-gray-700 rounded-md">
                <h2 className="text-lg font-bold mb-2">{category.name}</h2>
                <p className="text-gray-500 mb-4">{category.description}</p>

                {category.products.length > 0 ? (
                  <ul className="space-y-2">
                    {category.products.map((product) => (
                      <li key={product.id}>
                        <ProductCard
                          description={product.description || "No description"}
                          imageUrl={product.image_url || "default-image-url.png"} // Handle empty image URLs
                          name={product.name}
                          price={product.price.toString()}
                        />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No products available in this category</p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No categories available</p>
        )
      )}
    </div>
  );
}
