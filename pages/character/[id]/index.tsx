import CharacterDetail from "components/character-detail/CharacterDetail";
import LoadingSpinner from "components/loading-spinner/LoadingSpinner";
import {
  fetchCharacterQuery,
  IFetchCharacterResponse
} from "graphql/queries/CharacterQuery";
import { GetServerSideProps, NextPage } from "next";
import { withUrqlClient, initUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import {
  ssrExchange,
  dedupExchange,
  cacheExchange,
  fetchExchange,
  useQuery
} from "urql";

const Character: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [{ fetching, data }] = useQuery<IFetchCharacterResponse>({
    query: fetchCharacterQuery,
    variables: {
      id: id
    }
  });

  return (
    <div>
      {fetching && <LoadingSpinner />}
      {data && <CharacterDetail character={data.character} />}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const ssrCache = ssrExchange({ isClient: false });
  const client = initUrqlClient(
    {
      url: "https://rickandmortyapi.com/graphql",
      exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange]
    },
    false
  );

  await client
    ?.query(fetchCharacterQuery, { id: context.query.id })
    .toPromise();

  return {
    props: {
      urqlState: ssrCache.extractData()
    }
  };
};

export default withUrqlClient(
  (_ssrExchange) => ({
    url: "https://rickandmortyapi.com/graphql"
  }),
  { ssr: false }
)(Character);
