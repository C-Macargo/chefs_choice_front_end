import { useState, useEffect } from "react";

function useFetchCategories(relativeUrl: string) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const fullUrl = `${apiBaseUrl}${relativeUrl}`;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(fullUrl);

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (error: any) {
        setError(error.message || "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [fullUrl]);

  return { data, isLoading, error };
}

export default useFetchCategories;
