import CheckedLogin from "@/components/CheckedLogin";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{ fetcher: (url: string) => fetch(url).then((res) => res.json()) }}
    >
      <div className="w-full max-w-xl mx-auto">
        <CheckedLogin />
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}
