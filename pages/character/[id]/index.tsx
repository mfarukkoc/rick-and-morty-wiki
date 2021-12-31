import CharacterDetail from "components/character-detail/CharacterDetail";
import ErrorIndicator from "components/error-indicator/ErrorIndicator";
import LoadingSpinner from "components/loading-spinner/LoadingSpinner";
import { rickAndMortyURL } from "graphql/constants";
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
      {data?.character ? (
        <CharacterDetail character={data.character} id={id as string} />
      ) : (
        <ErrorIndicator />
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const ssrCache = ssrExchange({ isClient: false });
  const client = initUrqlClient(
    {
      url: rickAndMortyURL,
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
    url: rickAndMortyURL
  }),
  { ssr: false }
)(Character);
