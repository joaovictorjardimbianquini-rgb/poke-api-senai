import { useState, useEffect } from 'react';

import './App.css';
import Login from './templates/Login';

function App() {
  const [pokemonList, setPokemonList] = useState([]);



  return (
    <>
      <Login/>
    </>
  );
}

export default App;
