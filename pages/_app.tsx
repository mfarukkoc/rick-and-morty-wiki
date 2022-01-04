import "styles/globals.scss";
import type { AppProps } from "next/app";
import CharacterListProvider from "components/character-list-context/CharacterListContext";
import Layout from "components/layout/Layout";
import Head from "next/head";

import Router from "next/router";
import nProgress from "nprogress";
import "styles/nprogress.scss";

nProgress.configure({
  showSpinner: false
});

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

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
