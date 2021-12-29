import {
  fetchCharacterListQuery,
  IFetchCharacterListResponse
} from "graphql/queries/CharacterQuery";
import React, {
  useState,
  useContext,
  useCallback,
  useReducer,
  useEffect
} from "react";
import { useQuery } from "urql";
import { characterListReducer } from "./CharacterListReducer";

interface ICharacterListContext {
  characterList: any[];
  addCharacters: (characters: any[], page: number) => void;
  lastFetchedPage: number;
}

const CharacterListContext = React.createContext<ICharacterListContext | null>(
  null
);

interface CharacterListProviderProps {
  children?: React.ReactNode;
}

const CharacterListProvider = ({ children }: CharacterListProviderProps) => {
  const [state, dispatch] = useReducer(characterListReducer, {
    list: [],
    lastFetchedPage: 0
  });

  const addCharacters = useCallback((characters: any[], page: number) => {
    dispatch({ type: "ADD_CHARACTERS", characters, page });
  }, []);

  return (
    <CharacterListContext.Provider
      value={{
        characterList: state.list,
        lastFetchedPage: state.lastFetchedPage,
        addCharacters
      }}
    >
      {children}
    </CharacterListContext.Provider>
  );
};

const useCharacter = () => {
  const characterListHelpers = useContext(CharacterListContext);
  if (characterListHelpers === null)
    throw new Error("useCharacter must be used inside CharacterProvider");

  const [page, setPage] = useState(characterListHelpers.lastFetchedPage || 1);

  const [result] = useQuery<IFetchCharacterListResponse>({
    query: fetchCharacterListQuery,
    variables: { page: page }
  });

  useEffect(() => {
    if (!result.stale && !result.fetching) {
      if (!result.error && result.data) {
        characterListHelpers.addCharacters(
          result.data.characters.results,
          page
        );
      }
    }
  }, [characterListHelpers, page, result]);

  const loadNext = useCallback(() => {
    setPage((page) => page + 1);
  }, []);

  return { ...characterListHelpers, loading: result.fetching, loadNext };
};

export { useCharacter };
export default CharacterListProvider;
