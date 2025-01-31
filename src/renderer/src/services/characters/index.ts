import { api } from '..';

import { Character } from '../../types/characters.types';

interface GetCharacters {
  signal?: AbortSignal;
}

interface CreateCharacterDTO {
  name: string;
  user_id: number;
  class_id: number;
}

interface CreateCharacter {
  signal?: AbortSignal;
  character: CreateCharacterDTO;
}

class CharactersService {
  get_characters = async ({ signal }: GetCharacters): Promise<Character[]> => {
    try {
      const { data } = await api.get<Character[]>('/characters', { signal });

      return data;
    } catch (error) {
      console.log(error);

      throw error;
    }
  };

  create_character = async ({
    signal,
    character,
  }: CreateCharacter): Promise<Character> => {
    try {
      const { data } = await api.post<Character>('/characters', character, {
        signal,
      });

      return data;
    } catch (error) {
      console.log(error);

      throw error;
    }
  };
}

export const characters_service = new CharactersService();
