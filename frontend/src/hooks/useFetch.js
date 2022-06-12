import axios from "axios";
import { useEffect, useState } from "react";

function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then((data) => {
        setLoading(false);
        setData(data.data);
      })
      .catch((error) => {
        setLoading(false);
        setError("something went wrong");
      });
  }, [url]);

  return [data, loading, error];
}

export default useFetch;
