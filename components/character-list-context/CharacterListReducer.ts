import { CharacterListItem } from "graphql/queries/CharacterQuery";

export type CharacterListAction = {
  type: "ADD_CHARACTERS";
  characters: CharacterListItem[];
  page: number;
};

export interface CharacterState {
  list: CharacterListItem[];
  lastFetchedPage: number;
}

export function characterListReducer(
  state: CharacterState,
  action: CharacterListAction
) {
  switch (action.type) {
    case "ADD_CHARACTERS": {
      const { characters, page } = action;
      if (state.lastFetchedPage !== page) {
        return {
          list: [...state.list, ...characters],
          lastFetchedPage: page
        };
      }
    }

    default:
      return state;
  }
}
