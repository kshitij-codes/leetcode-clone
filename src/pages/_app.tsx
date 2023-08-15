import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Head>
        <title>Leetcode Clone</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href="favicon.png" type="image/x-icon" />
        <meta
          name="description"
          content="Web application that contains leetcode problems and their solutions"
        />
      </Head>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
