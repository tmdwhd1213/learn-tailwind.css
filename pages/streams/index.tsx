import FloatingButton from "@/components/float-button";
import Layout from "@/components/layout";
import { useInfiniteScroll } from "@/libs/client/useInfinityScroll";
import { Stream } from "@prisma/client";
import { NextPage } from "next";
import Link from "next/link";
import { useEffect } from "react";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";

interface StreamsResponse {
  ok: boolean;
  streams: Stream[];
  pages: number;
}

const getKey = (pageIndex: number, previousPageData: StreamsResponse) => {
  if (pageIndex === 0) return `/api/streams?page=1`;
  if (pageIndex + 1 > previousPageData.pages) return null;
  return `/api/streams?page=${pageIndex + 1}`;
};
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Streams: NextPage = () => {
  /**pagination
   * backendPage = 0
   * pageSize = 25
   * take: 25
   * skip: backendPage * 25
   */

  const { data, setSize } = useSWRInfinite<StreamsResponse>(getKey, fetcher);
  const streams = data ? data.map((item) => item.streams).flat() : [];
  const page = useInfiniteScroll();

  useEffect(() => {
    setSize(page);
  }, [setSize, page]);

  return (
    <Layout seoTitle="STREAMING" hasTabBar title="라이브 커머스">
      <div className=" divide-y-[1px] space-y-4">
        {streams?.map((stream) => (
          <div key={stream.id}>
            <Link href={`/streams/${stream.id}`} className="pt-4 block px-4">
              <div className="w-full rounded-md shadow-sm bg-slate-300 aspect-video" />
              <h1 className="text-2xl mt-2 font-bold text-gray-900">
                {stream.name}
              </h1>
            </Link>
          </div>
        ))}
        <FloatingButton href="/streams/create">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
            />
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
};

export default Streams;
