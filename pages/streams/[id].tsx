import Layout from "@/components/layout";
import Message from "@/components/message";
import { Stream } from "@prisma/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";

interface StreamResponse {
  ok: boolean;
  stream: Stream;
}

const StreamsDetail: NextPage = () => {
  const router = useRouter();
  const { data } = useSWR<StreamResponse>(
    router.query.id ? `/api/streams/${router.query.id}` : null
  );
  const fakeArr = new Array(5).fill(1);
  return (
    <Layout canGoBack title="라이브">
      <div className="py-10 px-4 space-y-4">
        <div className="w-full rounded-md shadow-sm bg-slate-300 aspect-video" />
        <div className="mt-5">
          <h1 className="text-3xl font-bold text-gray-900">
            {data?.stream?.name}
          </h1>
          <span className="text-2xl block mt-3 text-gray-900">
            {data?.stream?.price.toLocaleString()}원
          </span>
          <p className=" my-6 text-gray-700">{data?.stream?.description}</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Live Chat</h2>
          <div className="pb-16 h-[60vh] overflow-y-scroll px-4 py-10 space-y-4">
            {fakeArr.map((_, i) => (
              <div key={i} className="space-y-4">
                <Message message="Hi how much are you selling them for?" />
                <Message message="I want ￦20,000" isReversed />
                <Message message="미쳤어" />
              </div>
            ))}
          </div>
        </div>
        <div className="fixed w-full mx-auto max-w-md bottom-2 inset-x-0">
          <div className="flex relative items-center">
            <input
              type="text"
              className="shadow-sm rounded-full w-full pr-12 border-gray-300 focus:ring-orange-500 focus:outline-none focus:border-orange-500"
            />
            <div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
              <button className="flex items-center focus:ring-2 focus:ring-offset-2 focus: ring-orange-500 bg-orange-500 rounded-full px-3 hover:bg-orange-600 hover:transition-colors text-sm text-white">
                &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StreamsDetail;
