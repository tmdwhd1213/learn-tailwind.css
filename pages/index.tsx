import FloatingButton from "@/components/float-button";
import Item from "@/components/item";
import Layout from "@/components/layout";
import { useInfiniteScroll } from "@/libs/client/useInfinityScroll";
import { Product } from "@prisma/client";
import type { NextPage } from "next";
import Image from "next/image";
import { useEffect } from "react";
import useSWRInfinite from "swr/infinite";
import client from "@/libs/server/client";
import { SWRConfig } from "swr";
import useUser from "@/libs/client/useUser";
import { useRouter } from "next/router";

export interface ProductwithLikes extends Product {
  _count: {
    favs: number;
  };
}

interface ProductsResponse {
  ok: boolean;
  products: ProductwithLikes[];
  pages: number;
}

const getKey = (pageIndex: number, previousPageData: ProductsResponse) => {
  if (pageIndex === 0) return `/api/products?page=1`;
  if (pageIndex + 1 > previousPageData.pages) return null;
  return `/api/products?page=${pageIndex + 1}`;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Home: NextPage = () => {
  // SWR이 좋은 이유. 한번 불러올 때 데이터 변화가 없으면 캐싱된 데이터를 불러와
  // 또 api호출을 하지 않음.
  const { data, setSize } = useSWRInfinite<ProductsResponse>(getKey, fetcher);
  const products = data ? data.map((item) => item.products).flat() : [];
  const page = useInfiniteScroll();

  useEffect(() => {
    setSize(page);
  }, [setSize, page]);

  return (
    <Layout title="HOME" hasTabBar seoTitle="HOME">
      <div className="flex flex-col space-y-5 divide-y">
        {products?.map((product) => (
          <Item
            id={product.id}
            key={product.id}
            title={product.name}
            price={product.price}
            comments={1}
            likes={product._count?.favs || 0}
          />
        ))}
        <FloatingButton href="/products/upload">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
};

// export default Home;

const Page: NextPage<{ products: ProductwithLikes[] }> = ({ products }) => {
  const { query } = useRouter();
  return (
    <SWRConfig
      value={{
        // fallback: 캐시 초기값을 설정할 수 있다.
        fallback: {
          [`/api/products/${query.id}`]: {
            ok: true,
            products,
          },
        },
      }}
    >
      <Home />
    </SWRConfig>
  );
};
export default Page;

export async function getServerSideProps() {
  console.log("SSR");
  const products = await client.product.findMany({});
  // console.log(products);
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
