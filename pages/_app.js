// pages/_app.js
import '../app/globals.css'; // Import global CSS (create this file if it doesn't exist)
import Head from 'next/head'; // For setting metadata

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>My News Website</title>
        <meta name="description" content="Stay updated with the latest news and articles" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
