import { useState, useEffect } from "react";

function useFetch<T>(url: string, queryParamString: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    setData(null);
    setError(null);

    fetch(url+queryParamString)
      .then((res) => res.json())
      .then((data) => {setData(data)})
      .catch((err) => setError('Network call has failed!'))
      .finally(() => setLoading(false));
  }, [url, queryParamString]);

  return { data, loading, error };
}

export default useFetch;
