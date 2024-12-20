import React from 'react';

const CharacterList = ({ characters }) => (
    <div className="CharacterList">
        {characters.map((character, index) => (
            <div key={index} className="CharacterItem">
                <h3>{character.name}</h3>
                <p>{character.biology}</p>
                <p>{character.information}</p>
            </div>
        ))}
    </div>
);

export default CharacterList;