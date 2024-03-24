import FloatingButton from "@/components/float-button";
import Layout from "@/components/layout";
import useCoords from "@/libs/client/useCoords";
import { getTimeDifferenceString } from "@/libs/client/utils";
import { Post, User } from "@prisma/client";
import type { NextPage } from "next";
import Link from "next/link";
import useSWR from "swr";

interface PostsWithUser extends Post {
  user: User;
  _count: {
    answers: number;
    wondering: number;
  };
}

interface PostsResponse {
  ok: boolean;
  posts: PostsWithUser[];
}

const Community: NextPage = () => {
  // 나중에 error 처리할 컴포넌트도 필요
  // 내가 누른 궁금해요는 여기서도 녹색으로 보이게 바꾸기. isWondering ? 녹색 : ''
  // 위도 경도값으로 위치 api 불러서 ??시 ??동 인지 확인
  const { latitude, longitude } = useCoords();
  // Next.js가 SSR이기 때문에 useEffect가 브라우저에는 적용이되는데 서버에는 영향을 못 미침. 따라서 초기 상태값이 나옴.
  const { data } = useSWR<PostsResponse>(
    latitude && longitude
      ? `/api/posts?latitude=${latitude}&longitude=${longitude}`
      : null
  );
  return (
    <Layout title="동네생활" hasTabBar>
      <div className="py-16 px-4 space-y-8">
        {data?.posts?.map((post) => (
          <Link
            href={`/community/${post.id}`}
            key={post.id}
            className="flex flex-col cursor-pointer items-start"
          >
            <span className="flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-900">
              동네질문
            </span>
            <span className="mt-2 text-gray-700">
              <span className="text-orange-500 font-medium">Q.</span>{" "}
              {post.question}
            </span>
            <div className="mt-5 flex items-center justify-between w-full text-gray-500 font-medium text-xs">
              <span>{post.user.name}</span>
              <span>{getTimeDifferenceString(post.createdAt)}</span>
            </div>
            <div className="flex space-x-5 mt-3 text-gray-700 py-2.5 border-t border-b-[2px] w-full">
              <span className="flex space-x-2 items-center text-sm">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>궁금해요 {post._count.wondering}</span>
              </span>
              <span className="flex space-x-2 items-center text-sm">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  ></path>
                </svg>
                <span>답변 {post._count.answers}</span>
              </span>
            </div>
          </Link>
        ))}
        <FloatingButton href="/community/write">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            ></path>
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
};

export default Community;
