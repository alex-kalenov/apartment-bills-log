import { useCallback, useState } from "react";

function useHttp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (url, requestConfig, responseLogic) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(url, requestConfig);

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();

      responseLogic(data);
    } catch (err) {
      setError(err.message || "Произошла ошибка");
    }
    setIsLoading(false);
  }, []);

  return { isLoading, error, sendRequest };
}

export default useHttp;
