import { useCallback, useState } from "react";
import { authAxios } from "../../lib/utils/authAxios";

interface UseHttpReturn {
  isLoading: boolean;
  error: string | null;
  data: any;
  sendRequest: (
    url: string,
    method?: string,
    requestData?: any
  ) => Promise<{ data: any; status: number | null }>;
  clearError: () => void;
}

export const useHttp = (): UseHttpReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const sendRequest = useCallback(
    async (
      url: string,
      method: string = "GET",
      requestData: any = null
    ): Promise<{ data: any; status: number | null }> => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await authAxios({
          method,
          url,
          data: requestData,
        });
        setData(response.data); // Keep setting state for general use cases
        return { data: response.data, status: response.status }; // Additionally return detailed response for direct handling
      } catch (err) {
        const errorMessage =
          err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          "Something went wrong!";
        setError(errorMessage);
        console.error(errorMessage);
        return { data: null, status: err.response?.status }; // Return error status for direct handling
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { isLoading, error, data, sendRequest, clearError };
};
