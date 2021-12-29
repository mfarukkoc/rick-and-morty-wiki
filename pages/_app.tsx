import "../styles/globals.css";
import type { AppProps } from "next/app";
import CharacterListProvider from "components/character-list-context/CharacterListContext";
import Layout from "components/layout/Layout";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>Rick and Morty</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CharacterListProvider>
        <Component {...pageProps} />
      </CharacterListProvider>
    </Layout>
  );
}

export default MyApp;
