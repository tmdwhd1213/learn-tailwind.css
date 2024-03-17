import type { NextPage } from "next";

const Chats: NextPage = () => {
  const fakeArr = Array.from({ length: 5 }, (_, k) => k + 1);
  return (
    <div className="py-10 divide-y-[1px]">
      {fakeArr.map((_, i) => (
        <div
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
        </div>
      ))}
    </div>
  );
};

export default Chats;
