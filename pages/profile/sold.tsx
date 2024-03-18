import type { NextPage } from "next";
import Item from "../../components/item";
import Layout from "../../components/layout";

const Sold: NextPage = () => {
  return (
    <Layout title="판매내역" canGoBack>
      <div className="flex flex-col space-y-5 pb-10 divide-y">
        {Array.from({ length: 6 })
          .fill(1)
          .map((_, i) => (
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
export default Sold;
