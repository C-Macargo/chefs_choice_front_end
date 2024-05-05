import { useState } from "react";

const useSubmitForm = (relativeUrl: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const fullUrl = `${apiBaseUrl}${relativeUrl}`;

  const submitForm = async (data: Record<string, any>, method: string = "POST") => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(fullUrl, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit form: ${response.statusText}`);
      }
    } catch (error: any) {
      setError(error.message || "Unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, submitForm };
};

export default useSubmitForm;
