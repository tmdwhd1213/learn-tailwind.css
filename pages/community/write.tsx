import Button from "@/components/button";
import Layout from "@/components/layout";
import TextArea from "@/components/textarea";
import type { NextPage } from "next";

const Write: NextPage = () => {
  return (
    <Layout undo title="동네생활 글쓰기">
      <form className="px-4 py-10">
        <TextArea required placeholder="Ask a question!" />
        <Button text="완료" />
      </form>
    </Layout>
  );
};

export default Write;
