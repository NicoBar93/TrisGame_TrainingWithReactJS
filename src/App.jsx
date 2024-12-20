import Player from "./components/Player"
import GameBoard from "./components/GameBoard.jsx"
import { useState } from "react";
import Log from "./components/Log.jsx";
import {WINNING_COMBINATIONS} from './winnings.js';
import GameOver from "./components/GameOver.jsx";

const startingBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X';

      if (gameTurns.length > 0 && gameTurns[0].playerSymbol === 'X') {
        currentPlayer = 'O';
      }
  
  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState({
    X: "Nicola",
    O: "Giuseppe"
  });

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...startingBoard.map((array) => [...array])];

  for (const turn of gameTurns) {
      const {square, playerSymbol} = turn;
      const {row, cell} = square;

      gameBoard[row][cell] = playerSymbol;
  }

  let winner;

    for (const combToCheck of WINNING_COMBINATIONS) {
      const firstSquare = gameBoard[combToCheck[0].row][combToCheck[0].cell];
      const secondSquare = gameBoard[combToCheck[1].row][combToCheck[1].cell];
      const thirdSquare = gameBoard[combToCheck[2].row][combToCheck[2].cell];

      if (firstSquare && firstSquare === secondSquare && firstSquare === thirdSquare) {

        winner = players[firstSquare];
      }
    }

    const draw = gameTurns.length === 9 && !winner;

    function handleNameChange( symbol, name){
      setPlayers((prevPlayers) => {
        return {
          ...prevPlayers,
          [symbol]: name}        
      })
    }

    function handleReset(){
      setGameTurns([]);
    }

  function handleSelectSquare(rowIndex, cellIndex){

    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      
      const updatedTurns = [ 
        {square: {row: rowIndex, cell: cellIndex}, 
        playerSymbol: currentPlayer}, 
        ...prevTurns
      ];
      return updatedTurns;
    });
  }
  
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Nicola" symbol="X" isActive={activePlayer === 'X'} onChangeName={handleNameChange} />
          <Player initialName="Giuseppe" symbol="O" isActive={activePlayer === 'O'} onChangeName={handleNameChange}/>
        </ol>
        <div>
          <p>{winner && <>Winner is: {winner}</>}</p>
        </div>
        {(winner || draw) && <GameOver winner={winner} onResetGame={handleReset} />}
        <GameBoard 
          onSelectSquare={handleSelectSquare} 
          board={gameBoard} />
      </div>
      <Log 
      turns={gameTurns}/>
    </main>
  );
}

export default App
