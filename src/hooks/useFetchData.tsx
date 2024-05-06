import { useState, useEffect } from "react";

interface FetchError {
  message: string;
  status?: number;
}

function useFetchData(relativeUrl: string) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<FetchError | null>(null);

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const fullUrl = `${apiBaseUrl}${relativeUrl}`;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(fullUrl);

        if (!response.ok) {
          throw {
            message: `Failed to fetch data: ${response.statusText}`,
            status: response.status,
          };
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (error: any) {
        setError({
          message: error.message || "Unknown error",
          status: error.status || undefined,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [fullUrl]);

  return { data, isLoading, error };
}

export default useFetchData;
