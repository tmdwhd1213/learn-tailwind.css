import type { NextPage } from "next";
import Button from "../../components/button";
import Input from "../../components/input";
import Layout from "../../components/layout";
import TextArea from "../../components/textarea";

const Create: NextPage = () => {
  return (
    <Layout canGoBack title="Go Live">
      <form className=" space-y-4 py-10 px-4">
        <Input
          required
          label="제목"
          name="name"
          type="text"
          placeholder="제목"
        />
        <Input
          required
          label="가격"
          placeholder="가격을 입력해주세요."
          name="price"
          type="text"
          kind="price"
        />
        <TextArea
          name="description"
          label="자세한 설명"
          placeholder="호계3동에 올릴 게시글 내용을 작성해 주세요. (판매 금지 물품은 게시가 제한될 수 있어요.)"
        />
        <Button text="Go live" />
      </form>
    </Layout>
  );
};

export default Create;
