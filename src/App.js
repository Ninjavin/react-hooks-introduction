import React, { useState } from 'react';

import CharPicker from './components/CharPicker';
import Character from './components/Character';

const App = props => {
  const [side, setSide] = useState('light')
  const [char, setChar] = useState(1)
  const [destruction, setDestruction] = useState(false)

  const sideHandler = side => {
    setSide(side);
  };

  const charSelectHandler = event => {
    const charId = event.target.value;
    setChar(charId);
  };

  const destructionHandler = () => {
    setDestruction(true)
  };
  
  let content = (
    <React.Fragment>
      <CharPicker
        side={side}
        selectedChar={char}
        onCharSelect={charSelectHandler}
      />
      <Character selectedChar={char} />
      <button onClick={sideHandler.bind(this, 'light')}>Light Side</button>
      <button onClick={sideHandler.bind(this, 'dark')}>Dark Side</button>
      {side === 'dark' && (
        <button onClick={destructionHandler}>DESTROY!</button>
      )}
    </React.Fragment>
  );

  if (destruction) {
    content = <h1>Total destruction!</h1>;
  }
  return content;
};

export default App;