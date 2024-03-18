import Item from "@/components/item";
import Layout from "@/components/layout";
import type { NextPage } from "next";

const Bought: NextPage = () => {
  const fakeData = Array.from({ length: 12 }, () => 1);
  return (
    <Layout title="나의 구매 내역" canGoBack>
      <div className="flex flex-col space-y-5 py-10 divide-y">
        {fakeData.map((_, i) => (
          <Item
            key={i}
            id={i}
            title="iPhone 14"
            price={99}
            comments={1}
            likes={1}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Bought;
