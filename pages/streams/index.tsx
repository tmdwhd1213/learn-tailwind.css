import FloatingButton from "@/components/float-button";
import Layout from "@/components/layout";
import { NextPage } from "next";
import Link from "next/link";

const Streams: NextPage = () => {
  const fakeArr = new Array(5).fill(1);
  return (
    <Layout hasTabBar title="라이브">
      <div className=" divide-y-[1px] space-y-4">
        {fakeArr.map((_, i) => (
          <Link key={i} href={`/streams/${i}`} className="pt-4 block  px-4">
            <div className="w-full rounded-md shadow-sm bg-slate-300 aspect-video" />
            <h1 className="text-2xl mt-2 font-bold text-gray-900">
              Galaxy S50
            </h1>
          </Link>
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
