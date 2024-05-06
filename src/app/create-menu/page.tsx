"use client";

import { useState } from "react";

export default function CreateMenuPage(): JSX.Element {
  const [mode, setMode] = useState<"day" | "night" | null>(null);

  return (
    <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
      <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">
        Would you like to create a day or night menu?
      </h1>

      <div className="flex justify-center mb-4">
        <button
          onClick={() => setMode("day")}
          className={`px-4 py-2 mx-2 font-medium rounded-md ${
            mode === "day" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200"
          }`}
        >
          Day
        </button>
        <button
          onClick={() => setMode("night")}
          className={`px-4 py-2 mx-2 font-medium rounded-md ${
            mode === "night" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200"
          }`}
        >
          Night
        </button>
      </div>
    </div>
  );
}
