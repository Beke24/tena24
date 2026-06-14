import { useState } from "react";

export function useLoading() {
  const [loading, setLoading] = useState(false);
  const run = async <T,>(task: () => Promise<T>) => {
    setLoading(true);
    try {
      return await task();
    } finally {
      setLoading(false);
    }
  };
  return { loading, run };
}
