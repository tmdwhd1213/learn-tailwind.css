import type { NextPage } from "next";
import Button from "@/components/button";
import Input from "@/components/input";
import Layout from "@/components/layout";
import TextArea from "@/components/textarea";
import { useForm } from "react-hook-form";
import useMutation from "@/libs/client/useMutation";
import { useEffect } from "react";
import { Product } from "@prisma/client";
import { useRouter } from "next/router";

interface UploadProductForm {
  name: string;
  price: number;
  description: string;
}

interface UploadProductMutation {
  ok: boolean;
  product: Product;
}

const Upload: NextPage = () => {
  const router = useRouter();
  const [uploadProduct, { loading, data }] =
    useMutation<UploadProductMutation>("/api/products");
  const { register, handleSubmit } = useForm<UploadProductForm>();
  const onValid = (data: UploadProductForm) => {
    if (loading) return;
    uploadProduct(data);
  };
  useEffect(() => {
    if (data?.ok) {
      router.push(`/products/${data.product.id}`);
    }
  }, [data, router]);
  return (
    <Layout canGoBack title="내 물건 팔기">
      <form className="p-4 space-y-4" onSubmit={handleSubmit(onValid)}>
        <div>
          <label className="w-full cursor-pointer text-gray-600 hover:text-orange-500 hover:border-orange-500 hover:transition-colors flex items-center justify-center border-2 border-dashed border-gray-300 h-48 rounded-md">
            <svg
              className="h-12 w-12"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input className="hidden" type="file" />
          </label>
        </div>
        <Input
          required
          label="제목"
          name="name"
          type="text"
          kind="text"
          placeholder="제목"
          register={register("name", { required: true })}
        />
        <Input
          required
          label="가격"
          placeholder="가격을 입력해주세요."
          name="price"
          type="text"
          kind="price"
          register={register("price", { required: true })}
        />
        <TextArea
          name="description"
          label="자세한 설명"
          placeholder="호계3동에 올릴 게시글 내용을 작성해 주세요. (판매 금지 물품은 게시가 제한될 수 있어요.)"
          register={register("description", { required: true })}
        />
        <Button text={loading ? "잠시만 기다려주세요" : "작성 완료"} />
      </form>
    </Layout>
  );
};

export default Upload;
