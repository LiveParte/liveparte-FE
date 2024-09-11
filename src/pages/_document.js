import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning>
      <Head>

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-HEFV796PMR"
        ></script> 
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-HEFV796PMR');
            `,
          }}
        />
        {/* Adding inline styles */}
        <style>{`
          body {
            background-color: #f0f0f0;
            font-family: Arial, sans-serif;
          }
          h1 {
            color: #333;
          }
          .html5-video-player a{
          border:1px solid red;
          }
        `}</style>
      </Head>

      <body suppressHydrationWarning>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
