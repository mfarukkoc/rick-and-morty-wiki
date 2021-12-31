import type { NextPage } from "next";

import { withUrqlClient } from "next-urql";
import CharacterCards from "containers/character-cards/CharacterCards";
import { rickAndMortyURL } from "graphql/constants";

const Home: NextPage = () => {
  return (
    <>
      <CharacterCards />
    </>
  );
};

export default withUrqlClient(
  (_ssrExchange) => ({
    url: rickAndMortyURL
  }),
  { ssr: true }
)(Home);
