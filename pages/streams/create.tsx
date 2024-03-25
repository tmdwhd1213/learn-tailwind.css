import type { NextPage } from "next";
import Button from "../../components/button";
import Input from "../../components/input";
import Layout from "../../components/layout";
import TextArea from "../../components/textarea";
import { useForm } from "react-hook-form";
import useMutation from "@/libs/client/useMutation";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Stream } from "@prisma/client";

interface CreateStreamForm {
  name: string;
  price: number;
  description: string;
}

interface CreateStreamResponse {
  ok: boolean;
  stream: Stream;
}

const Create: NextPage = () => {
  const router = useRouter();
  const [createLive, { loading, data }] =
    useMutation<CreateStreamResponse>(`/api/streams`);
  const { register, handleSubmit } = useForm<CreateStreamForm>();
  const onValid = (form: CreateStreamForm) => {
    if (loading) return;
    createLive(form);
  };

  useEffect(() => {
    if (data && data.ok) {
      router.push(`/streams/${data.stream?.id}`);
    }
  }, [data, router]);

  return (
    <Layout canGoBack title="라이브 커머스 만들기">
      <form onSubmit={handleSubmit(onValid)} className=" space-y-4 py-10 px-4">
        <Input
          register={register("name", { required: true })}
          required
          label="제목"
          name="name"
          type="text"
          placeholder="제목"
        />
        <Input
          register={register("price", { required: true, valueAsNumber: true })}
          required
          label="가격"
          placeholder="가격을 입력해주세요."
          name="price"
          type="number"
          kind="price"
        />
        <TextArea
          register={register("description", { required: true })}
          name="description"
          label="자세한 설명"
          placeholder="호계3동에 올릴 게시글 내용을 작성해 주세요. (판매 금지 물품은 게시가 제한될 수 있어요.)"
        />
        <Button text={loading ? "Loading..." : "Go Live"} />
      </form>
    </Layout>
  );
};

export default Create;
