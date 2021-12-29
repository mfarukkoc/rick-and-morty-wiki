import { gql } from "urql";

export const fetchCharacterListQuery = gql`
  query ($page: Int = 1) {
    characters(page: $page) {
      results {
        id
        name
        image
      }
      info {
        next
      }
    }
  }
`;

export interface CharacterListItem {
  id: string;
  name: string;
  image: string;
}

export interface IFetchCharacterListResponse {
  characters: {
    results: CharacterListItem[];
    info: {
      next?: number;
    };
  };
}

export const fetchCharacterQuery = gql`
  query ($id: ID!) {
    character(id: $id) {
      image
      name
      species
      origin {
        name
      }
      episode {
        name
        episode
      }
      location {
        name
      }
      status
    }
  }
`;

export interface IFetchCharacterResponse {
  character: {
    episode: {
      episode: string;
      name: string;
    }[];
    image: string;
    name: string;
    species: string;
    origin: {
      name: string;
    };
    location: {
      name: string;
    };
    status: string;
  };
}
