import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

type Public = "enter" | "test" | undefined;

export default function useUser(pathname: Public) {
  // mutate -> 불러온 데이터 수정
  const { data, error } = useSWR("/api/users/me");

  const router = useRouter();
  useEffect(() => {
    if (router.pathname === `/${pathname}`) {
    } else if (data && !data.ok && pathname === undefined) {
      router.replace("/enter");
    }
  }, [data, router, pathname]);

  return { user: data?.profile, isLoading: !data && !error };
}
