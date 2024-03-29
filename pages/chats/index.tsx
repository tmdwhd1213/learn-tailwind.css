import Layout from "@/components/layout";
import type { NextPage } from "next";
import Link from "next/link";

const Chats: NextPage = () => {
  const fakeArr = Array.from({ length: 5 }, (_, k) => k + 1);
  return (
    <Layout title="채팅" seoTitle="Chat" hasTabBar>
      <div className="py-10 divide-y-[1px]">
        {fakeArr.map((_, i) => (
          <Link
            href={`/chats/${i}`}
            key={i}
            className="flex px-4 py-3 cursor-pointer items-center space-x-3"
          >
            <div className="w-10 h-10 rounded-full bg-slate-300" />
            <div>
              <p className="text-gray-700">Steve Jebs</p>
              <p className="text-sm text-gray-500">
                See you tomorrow in the corner at 2pm!
              </p>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Chats;
