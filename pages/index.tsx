import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="bg-slate-400 dark xl:place-items-center py-20 px-20 grid gap-10 lg:grid-cols-2 xl:grid-cols-3 min-h-screen">
      <div className="bg-white dark:bg-black flex flex-col justify-between p-6 rounded-3xl shadow-xl">
        <span className="font-semibold dark:text-white text-3xl">
          Select Item
        </span>
        <ul>
          {[1, 2, 3, 4, 5].map((v, i) => (
            <div
              key={i}
              // only: 원소 하나만 있을 때 적용
              className="flex justify-between my-2 first:bg-blue-50 last:bg-blue-300
               only:bg-red-500 odd:bg-blue-200 even:bg-yellow-500
               "
            >
              <span className="text-gray-500">Grey Chair</span>
              <span className="font-semibold">$19</span>
            </div>
          ))}
        </ul>
        <ul>
          {["a", "b", "c", ""].map((c, i) => (
            // empty: CSS 속성
            <li className="bg-red-500 py-2 empty:hidden" key={i}>
              {c}
            </li>
          ))}
        </ul>
        <div className="flex justify-between mt-2 pt-2 border-t-2 border-dashed">
          <span className="text-[tomato]">Total</span>
          <span className="font-semibold text-[tomato]">$99</span>
        </div>
        <button
          className="mt-5 bg-blue-500 text-white p-3 text-center rounded-xl w-3/4 mx-auto 
        dark:hover:bg-teal-500 hover:text-black active:bg-yellow-500
          focus:bg-red-500 dark:bg-black dark:border
        "
        >
          Checkout
        </button>
      </div>
      <div className="bg-white overflow-hidden rounded-3xl shadow-xl group">
        {/* 핸드폰 가로:landscape 세로: portrait */}
        <div className="portrait:bg-indigo-600 landscape:bg-teal-300 p-6 pb-14 xl:pb-40">
          <span className="text-white text-2xl">Profile</span>
        </div>
        <div className="rounded-3xl p-6 bg-white relative -top-5">
          <div className="flex relative -top-16 items-end justify-between">
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500">Orders</span>
              <span className="text-xl font-medium">340</span>
            </div>
            <div className="h-24 w-24 bg-gray-400 rounded-full group-hover:bg-red-300 transition-colors" />
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500">Spent</span>
              <span className="text-xl font-medium">$340</span>
            </div>
          </div>
          <div className="relative flex flex-col items-center -mt-10 -mb-5">
            <span className="text-xl font-medium">Tony Molloy</span>
            <span className="text-sm text-gray-500">미국</span>
          </div>
        </div>
      </div>
      <div className="bg-white p-10 rounded-3xl shadow-xl lg:col-span-2 xl:col-span-1">
        <div className="flex mb-5 justify-between items-center">
          <span>⬅</span>
          <div className="space-x-3">
            <span>⭐ 4.9</span>
            <span className="shadow-xl p-2 rounded-md">❤</span>
          </div>
        </div>
        <div className="bg-zinc-400 h-72 mb-5" />
        <div className="flex flex-col">
          <span className="font-medium text-xl">Swoon Lounge</span>
          <span className="text-xs text-gray-500">Chair</span>
          <div className="mt-3 mb-5 flex justify-between items-center">
            <div className="space-x-2">
              <button className="w-5 h-5 rounded-full bg-yellow-500 focus:ring-2 ring-offset-2 ring-yellow-500 transition" />
              <button className="w-5 h-5 rounded-full bg-indigo-500 focus:ring-2 ring-offset-2 ring-indigo-500 transition" />
              <button className="w-5 h-5 rounded-full bg-teal-500 focus:ring-2 ring-offset-2 ring-teal-500 transition" />
            </div>
            <div className="flex items-center space-x-4 ">
              {/* aspect-square -> 정사각형 만들어줌. */}
              <button className="rounded-lg bg-blue-200 flex justify-center items-center aspect-square w-8 font-medium text-xl text-gray-500">
                -
              </button>
              <span>1</span>
              <button className="rounded-lg bg-blue-200 flex justify-center items-center aspect-square w-8 font-medium text-xl text-gray-500">
                +
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-2xl">$450</span>
            <button className="bg-blue-500 py-2 px-8 text-center text-sm text-white rounded-lg">
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white p-10 rounded-3xl shadow-xl">
        <form className="flex flex-col space-y-2 p-5">
          <input
            type="text"
            required
            placeholder="Username"
            // className="required:border-2 border-yellow-500"
            className="border p-1 peer border-gray-400 rounded-lg"
          />
          <span className="hidden peer-invalid:block peer-invalid:text-red-500">
            This Input is invalid
          </span>
          <span className="hidden peer-hover:block peer-valid:text-teal-500">
            Hello
          </span>
          <input type="submit" value="Login" className="bg-white" />
        </form>
      </div>
      <div className="bg-white p-10 rounded-3xl shadow-xl">
        <div className="flex flex-col space-y-2 p-5">
          <details className="select-none open:text-white open:bg-indigo-400">
            <summary className="cursor-pointer">What is my fav. food</summary>
            {/* 드래그할 때 배경 색 바꾸기. selection */}
            <span className="selection:bg-indigo-600 selection:text-white">
              김치
            </span>
          </details>
        </div>
      </div>
      <div className="bg-white p-10 rounded-3xl shadow-xl">
        <div className="flex flex-col space-y-2 p-5">
          <ul className="list-decimal marker:text-teal-500">
            <li>hi</li>
            <li>hi</li>
            <li>hi</li>
          </ul>
        </div>
      </div>
      <div className="bg-white p-10 rounded-3xl shadow-xl">
        <div className="flex flex-col space-y-2 p-5">
          <input
            type="file"
            className="transition-colors file:cursor-pointer file:hover:text-purple-400 file:hover:bg-white file:hover:border-purple-400 
              file:hover:border file:border-0 file:rounded-md file:px-5 file:text-white file:bg-purple-400
            "
          />
          <p className="first-letter:text-7xl first-letter:hover:text-purple-400 first-line:text-4xl">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
      </div>
      <div className="bg-white p-10 rounded-3xl shadow-xl">
        <div className="bg-[url('../public/vercel.svg')]"></div>
      </div>
    </div>
  );
};

export default Home;
