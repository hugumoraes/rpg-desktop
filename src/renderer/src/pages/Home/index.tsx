import React, { useEffect, useState } from 'react';
import axios from 'axios';

import styles from './styles.module.scss';

import { useAuth } from '../../contexts/auth';

import { Character } from '../../types/characters.types';
import { Class } from '../../types/classes.types';

import { characters_service } from '../../services/characters';
import { classes_service } from '../../services/classes';

export const Home: React.FC = () => {
  const {
    user: { first_name, last_name, user_id },
  } = useAuth();

  const [characters, setCharacters] = useState<Character[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);

  const [characterName, setCharacterName] = useState('');
  const [selectedClass, setSelectedClass] = useState<Class>({
    class_id: 0,
    name: '',
    class_attributes: [],
  });

  useEffect(() => {
    const characters_controller = new AbortController();
    const classes_controller = new AbortController();

    const fetch_data = async (): Promise<void> => {
      try {
        const characters = await characters_service.get_characters({
          signal: characters_controller.signal,
        });

        const classes = await classes_service.get_classes({
          signal: classes_controller.signal,
        });

        setCharacters(characters);
        setClasses(classes);
        setSelectedClass(classes[0]);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else {
          console.error('Other error:', error);
        }
      }
    };

    fetch_data();

    return (): void => {
      characters_controller.abort();
      classes_controller.abort();
    };
  }, []);

  const handleSelectClass = (c: Class) => (): void => {
    setSelectedClass(c);
  };

  const handleCreateCharacter = async (): Promise<void> => {
    try {
      const character = await characters_service.create_character({
        character: {
          class_id: selectedClass.class_id,
          name: characterName,
          user_id,
        },
      });

      setCharacters([...characters, character]);
    } catch (error) {
      console.error('Error creating character:', error);
    }
  };

  return (
    <div>
      <h1>
        Hello, {first_name} {last_name}!
      </h1>

      <h2>Create a new character: </h2>

      <input
        type="text"
        value={characterName}
        onChange={(e) => setCharacterName(e.target.value)}
        placeholder="Character name"
      />
      <button type="button" onClick={handleCreateCharacter}>
        Create
      </button>

      <h2>List of classes: </h2>
      <ul className={styles.class_container}>
        {classes.map((c) => (
          <li
            key={c.class_id}
            className={
              selectedClass.class_id === c.class_id ? styles.selected : ''
            }
            onClick={handleSelectClass(c)}
          >
            {c.name}
            <ul>
              {c.class_attributes?.map((ca) => (
                <li key={ca.class_attribute_id}>
                  {ca.attribute?.name}: {ca.value}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <h2>List of characters: </h2>
      <ul>
        {characters.map((character) => (
          <li key={character.character_id}>
            {character.name}
            <ul>
              <li>Level: {character.level}</li>
              <li>Class: {character.class?.name}</li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};
