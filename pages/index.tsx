import type { NextPage } from "next";

import { withUrqlClient } from "next-urql";
import CharacterCards from "containers/character-cards/CharacterCards";

const Home: NextPage = () => {
  return (
    <>
      <CharacterCards />
    </>
  );
};

export default withUrqlClient(
  (_ssrExchange) => ({
    url: "https://rickandmortyapi.com/graphql"
  }),
  { ssr: true }
)(Home);
