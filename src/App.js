import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const Snippets = [
    "Bears, beets, battlestar galactica",
    "What's Forrest Gump's password? 1Forrest1",
    "Where do programmers like to hangout? The Foo Bar"
  ];
  const INITIAL_GAME_STATE = {
    victory: false,
    startTime: null,
    endTime: null
  };

  const [gameState, setGameState] = useState(INITIAL_GAME_STATE);
  const [userText, setUserText] = useState('');
  const [snippet, setSnippet] = useState('');

  const chooseSnippet = snippetIndex => () => {
    console.log(snippetIndex);
    setSnippet(Snippets[snippetIndex]);
  };
  
  const updateUserText = (event) => {
    setUserText(event.target.value);
    setGameState({
      ...gameState,
      startTime: new Date().getTime()
    });

    if(event.target.value === snippet) {
      setGameState({
        ...gameState,
        victory: true,
        endTime: new Date().getTime() - gameState.startTime
      });
    }
  };
  useEffect(() => {
    if (gameState.victory) document.title = 'Victory!';
  });
  return (
    <div className = "container">
      <div className = "curve-top"></div>
      <h2>Type Race</h2>
      <h3>Snippet</h3>
      <p>{snippet}</p>
      <h4>{gameState.victory ? `Done!! Time: ${gameState.endTime}ms`: null}</h4>
      <input className = "form-control" onChange = {updateUserText} value = {userText}/>
      <hr/>
      <p><strong>Select a snippet</strong></p>
      {
        Snippets.map((Snippet, index) => (
          <button className = "btn btn-outline-danger" onClick = {chooseSnippet(index)} 
            key = {index}>{Snippet.substring(0, 10)}..</button>
        ))
      }
      <svg className = "curve-bottom" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ff5500" fill-opacity="1" d="M0,256L24,229.3C48,203,96,149,144,122.7C192,96,240,96,288,117.3C336,139,384,181,432,208C480,235,528,245,576,213.3C624,181,672,107,720,106.7C768,107,816,181,864,192C912,203,960,149,1008,106.7C1056,64,1104,32,1152,53.3C1200,75,1248,149,1296,181.3C1344,213,1392,203,1416,197.3L1440,192L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"></path></svg>
    </div>
  );
}

export default App;
