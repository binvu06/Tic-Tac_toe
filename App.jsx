import { useState } from "react";

import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";

import { WINNING_COMBINATIONS } from "./winning-combinations.js";

const PLAYERS = {
   X: "Player 1",
   O: "Player 2",
};

const INITIAL_GAME_BOARD = [
   [null, null, null],
   [null, null, null],
   [null, null, null],
];

function deriveActivePlayer(gameTurns) {
   let currentPlayer = "X";

   if (gameTurns.length > 0 && gameTurns[0].player === "X") {
      currentPlayer = "O";
   }

   return currentPlayer;
}

function deriveGameBoard(gameTurns) {
   let gameBoard = [...INITIAL_GAME_BOARD.map(innerArray => [...innerArray])];
   // console.log(gameBoard);

   for (const turn of gameTurns) {
      const { square, player } = turn;
      const { row, col } = square;

      gameBoard[row][col] = player;
      // console.log(gameBoard);
   }

   return gameBoard;
}

function deriveWinner(gameBoard, players) {
   let winner;

   for (const combination of WINNING_COMBINATIONS) {
      const firstSquareSymbol =
         gameBoard[combination[0].row][combination[0].column]; // obj1 -> 'X' or 'O' -> gán vào firstSquareSymbol
      const secondSquareSymbol =
         gameBoard[combination[1].row][combination[1].column]; // obj2
      const thirdSquareSymbol =
         gameBoard[combination[2].row][combination[2].column]; // obj3

      if (
         firstSquareSymbol &&
         firstSquareSymbol === secondSquareSymbol &&
         firstSquareSymbol === thirdSquareSymbol
      ) {
         winner = players[firstSquareSymbol]; // players.x = player 1;
      }
   }

   return winner;
}

function App() {
   const [players, setPlayers] = useState(PLAYERS);
   // console.log(players);
   const [gameTurns, setGameTurns] = useState([]);

   const activePlayer = deriveActivePlayer(gameTurns);
   const gameBoard = deriveGameBoard(gameTurns);
   const winner = deriveWinner(gameBoard, players);

   const hasDraw = gameTurns.length === 9 && !winner; // !undefined

   function handleSelectSquare(rowIndex, colIndex) {
      // setActivePLayer(curActivePlayer => (curActivePlayer === "X" ? "O" : "X"));
      setGameTurns(prevTurns => {
         const currentPlayer = deriveActivePlayer(prevTurns);

         const updateTurns = [
            { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
            ...prevTurns,
         ];

         return updateTurns;
      });
   }

   function handleRestart() {
      setGameTurns([]);
   }

   function handlePlayerNameChange(symbol, newName) {
      setPlayers(prevPlayers => {
         return {
            ...prevPlayers,
            [symbol]: newName,
            // {x: 20, y: 21, x: 23} => {x: 23, y: 21}
         };
      });
   }

   return (
      <main>
         <div id="game-container">
            <ol id="players" className="highlight-player">
               <Player
                  initialPlayerName={PLAYERS.X}
                  symbol="X"
                  isActive={activePlayer === "X"}
                  onChangeName={handlePlayerNameChange}
               />
               <Player
                  initialPlayerName={PLAYERS.O}
                  symbol="O"
                  isActive={activePlayer === "O"}
                  onChangeName={handlePlayerNameChange}
               />
            </ol>
            {(winner || hasDraw) && (
               <GameOver winner={winner} onRestart={handleRestart} />
            )}
            <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
         </div>
         <Log turns={gameTurns} />
      </main>
   );
}

export default App;
