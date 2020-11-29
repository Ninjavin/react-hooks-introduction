import React, { useEffect, useState } from 'react';

import './CharPicker.css';

const CharPicker = props => {
  const [characters, setCharacters] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true);
    fetch('https://cors-anywhere.herokuapp.com/https://swapi.dev/api/people').then(res => {
      if(!res.ok)
        throw new Error('Failed to fetch!');
      return res.json();
    }).then(charData => {
      const selectedCharacters = charData.results.slice(0,5);
      setCharacters(selectedCharacters.map((char, index) => ({
        name: char.name,
        id: index + 1
      })))
      setIsLoading(false)
    }).catch(err => {
      console.log(err);
      setIsLoading(false);
    });
  }, []);

  let content = <p>Loading characters...</p>;

  if(!isLoading && characters && characters.length > 0){
    content = (
      <select
        onChange={props.onCharSelect}
        value={props.selectedChar}
        className={props.side}
      >
        {characters.map(char => (
          <option key={char.id} value={char.id}>
            {char.name}
          </option>
        ))}
      </select>
    );
  } else if(isLoading && (!characters || characters.length === 0)){
    content = <p>Could not fetch any data.</p>;
  }
  return content;
};

export default CharPicker;