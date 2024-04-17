import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className="bg-black min-h-[100vh]" lang="en" suppressHydrationWarning>
      <Head>

      </Head>

      <body suppressHydrationWarning>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
