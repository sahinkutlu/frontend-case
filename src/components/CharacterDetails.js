import React from 'react';
import PropTypes from 'prop-types';

const CharacterDetails = ({
  character,
  inputValue,
  handleSelectCharacter,
  selectedCharacters,
}) => (
  <li key={character.id} className="character">
    <div className="character-details">
      <button
        type="button"
        onClick={() => handleSelectCharacter(character.name)}
        className="select-button"
      >
        {selectedCharacters.includes(character.name) ? '✔️' : ''}
      </button>
      <div className="character-info">
        <img
          src={character.image}
          alt={character.name}
          className="character-image"
        />

        <div className="character-info-last">
          <p className="character-name">
            {inputValue
              ? character.name
                .split(new RegExp(`(${inputValue})`, 'i'))
                .map((part) => (part.toLowerCase() === inputValue.toLowerCase() ? (
                  <strong key={`${character.id}`}>{part}</strong>
                ) : (
                  part
                )))
              : character.name}
          </p>
          <p className="episode-count">
            {character.episodeCount}
            {' '}
            Episodes
          </p>
        </div>
      </div>
    </div>
  </li>
);

CharacterDetails.propTypes = {
  character: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    episodeCount: PropTypes.number.isRequired,
  }).isRequired,
  inputValue: PropTypes.string.isRequired,
  handleSelectCharacter: PropTypes.func.isRequired,
  selectedCharacters: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CharacterDetails;
