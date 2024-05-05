"use client";

import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFetchCategories from "@/hooks/useFetchCategories";
import FormInput from "./components/FormInput";
import useSubmitForm from "@/hooks/useSubmitForm";

export default function CreateProductCategoryPage(): JSX.Element {
  const [mode, setMode] = useState<"category" | "product">("category");
  const [categoryName, setCategoryName] = useState<string>("");
  const [productName, setProductName] = useState<string>("");
  const [productDescription, setProductDescription] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { isLoading: submitting, error: submitError, submitForm } = useSubmitForm(`${mode === "category" ? "/category" : "/product"}`);
  const { data: categories, isLoading: fetching, error: fetchError } = useFetchCategories("/category");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.replace(/[^0-9.]/g, "");
    if (value.includes(".")) {
      const [integer, decimal] = value.split(".");
      value = `${integer}.${decimal.substring(0, 2)}`;
    }
    setPrice(value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (mode === "category") {
      submitForm({ name: categoryName });
      setFormSubmitted(true);
    } else if (mode === "product") {
      submitForm({
        name: productName,
        description: productDescription,
        imageUrl,
        price: Number(price),
        categoryId: Number(selectedCategory),
      });
      setFormSubmitted(true);
    }
  };

  useEffect(() => {
    if (formSubmitted && !submitting) {
      if (submitError) {
        toast.error(`Error: ${submitError}`);
      } else {
        toast.success(`Successfully created a ${mode}!`);
      }
      setFormSubmitted(false);
    }
  }, [submitError, submitting, formSubmitted, mode]);

  return (
    <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
      <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">
        Choose between creating a category or a product
      </h1>

      <div className="flex justify-center mb-4">
        <button
          onClick={() => setMode("category")}
          className={`px-4 py-2 mx-2 font-medium rounded-md ${
            mode === "category" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200"
          }`}
        >
          Category
        </button>
        <button
          onClick={() => setMode("product")}
          className={`px-4 py-2 mx-2 font-medium rounded-md ${
            mode === "product" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200"
          }`}
        >
          Product
        </button>
      </div>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        {mode === "category" && (
          <FormInput
            id="categoryName"
            label="Category Name:"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            type="text"
          />
        )}

      {mode === "product" && (
        <>
          <FormInput
            id="productName"
            label="Product Name:"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            type="text"
          />
          <FormInput
            id="productDescription"
            label="Product Description:"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            type="text"
          />
          <FormInput
            id="imageUrl"
            label="Image URL:"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            type="text"
          />
          <div className="flex flex-col">
            <label htmlFor="productPrice" className="text-sm text-gray-700 dark:text-gray-200 mr-2">
              Product Price (example: 10.00):
            </label>
            <div className="relative w-full">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600">$</span>
              <input
                type="text"
                id="productPrice"
                value={price}
                onChange={handlePriceChange}
                className="w-full pl-8 px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="productCategory" className="text-sm text-gray-700 dark:text-gray-200 mr-2">
              Select Category:
            </label>
            {fetching ? (
              <p>Loading categories...</p>
            ) : fetchError ? (
              <p className="text-red-500">Error: {fetchError}</p>
            ) : (
              <select
                id="productCategory"
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="" disabled>Select a category</option>
                {categories.map((category: { id: string; name: string }) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        </>
      )}
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm" disabled={submitting}>
          {submitting ? "Creating..." : "Create"}
        </button>

        {submitError && <p className="text-red-500">{submitError}</p>}
      </form>
    </div>
  );
}
