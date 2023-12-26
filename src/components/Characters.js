import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CharacterDetails from './CharacterDetails';
import './styles.css';

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const fetchCharacterData = async (character) => {
    const episodesData = await Promise.all(
      character.episode.map((episodeUrl) => axios.get(episodeUrl)),
    );

    const episodes = episodesData.map((episode) => episode.data);
    return episodes;
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);

    if (value.length >= 3) {
      setLoading(true);
      axios
        .get(`https://rickandmortyapi.com/api/character/?name=${value}`)
        .then((response) => {
          const charactersData = response.data.results || [];
          setCharacters(charactersData);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching characters:', error);
          setLoading(false);
        });
    } else {
      setCharacters([]);
    }
  };

  useEffect(() => {
    const fetchEpisodeDetails = async () => {
      const charactersWithEpisodes = await Promise.all(
        characters.map(async (character) => {
          const episodes = await fetchCharacterData(character);
          return { ...character, episodes, episodeCount: episodes.length };
        }),
      );
      setCharacters(charactersWithEpisodes);
    };

    if (characters.length > 0) {
      fetchEpisodeDetails();
    }
  }, [characters]);

  const handleSelectCharacter = (characterName) => {
    setSelectedCharacters((prevCharacters) => (prevCharacters.includes(characterName)
      ? prevCharacters.filter((c) => c !== characterName)
      : [...prevCharacters, characterName]));
  };

  const handleRemoveCharacter = (characterName) => {
    setSelectedCharacters((prevCharacters) => prevCharacters.filter((c) => c !== characterName));
  };

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Search characters..."
        value={inputValue}
        onChange={handleInputChange}
      />

      {loading && <p>Loading...</p>}

      <div className="selected-characters">
        {selectedCharacters.map((characterName) => (
          <span key={characterName} className="selected-character">
            {characterName}
            <button
              type="button"
              onClick={() => handleRemoveCharacter(characterName)}
              className="remove-button"
            >
              X
            </button>
          </span>
        ))}
      </div>

      <ul className="character-list">
        {characters.map((character) => (
          <CharacterDetails
            key={character.id}
            character={character}
            inputValue={inputValue}
            handleSelectCharacter={handleSelectCharacter}
            selectedCharacters={selectedCharacters}
          />
        ))}
      </ul>
    </div>
  );
};

export default Characters;
