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
      <div className = "bottom-text">
      <p ><strong>@akashdandriyal 2020</strong></p>
      </div>
      <svg className = "curve-bottom" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ff5500" fillOpacity="1" d="M0,96L60,101.3C120,107,240,117,360,138.7C480,160,600,192,720,208C840,224,960,224,1080,208C1200,192,1320,160,1380,144L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
    </div>
  );
}

export default App;
