import CheckedLogin from "@/components/CheckedLogin";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";
import { SWRConfig } from "swr";

export default function App({ Component, pageProps }: AppProps) {
  console.log("APP is RUNNING!");
  return (
    <SWRConfig
      value={{ fetcher: (url: string) => fetch(url).then((res) => res.json()) }}
    >
      <div className="w-full max-w-xl mx-auto">
        <CheckedLogin />
        <Component {...pageProps} />
      </div>
      <Script
        src="https://developers.kakao.com/sdk/js/kakao.js"
        strategy="lazyOnload"
      />
      {/* 외부 자바스크립트 파일 불러다 쓸 때 좋음 */}
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        onLoad={() => {
          window.fbAsyncInit = function () {
            FB.init({
              appId: "your-app-id",
              autoLogAppEvents: true,
              xfbml: true,
              version: "v13.0",
            });
          };
        }}
      />
    </SWRConfig>
  );
}
