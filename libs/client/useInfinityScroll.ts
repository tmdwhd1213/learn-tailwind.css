import { useEffect, useState } from "react";

export function useInfiniteScroll() {
  const [page, setPage] = useState(1);

  const scrollHandler = () => {
    if (
      document.documentElement.scrollTop + window.innerHeight ===
      document.documentElement.scrollHeight
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return page;
}
