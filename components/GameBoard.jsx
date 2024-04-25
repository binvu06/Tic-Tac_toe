// initialGameBoard.map(items => items.map(item => console.log(item)));

export default function GameBoard({ onSelectSquare, board }) {
   // const [gameBoard, setGameBoard] = useState(initialGameBoard);

   // function handleSelectSquare(rowIndex, colIndex) {
   //    setGameBoard(prevGameBoard => {
   //       const updatedBoard = [
   //          ...prevGameBoard.map(innerArray => [...innerArray]),
   //       ];

   //       updatedBoard[rowIndex][colIndex] = activePlayerSymbol;

   //       return updatedBoard;
   //    });

   //    onSelectSquare(); // Fn thực hiện chuyển đổi symbol người chơi
   // }

   return (
      <ol id="game-board">
         {board.map((row, rowIndex) => (
            <li key={rowIndex}>
               <ol>
                  {row.map((playerSymbol, colIndex) => (
                     <li key={colIndex}>
                        <button
                           onClick={() => onSelectSquare(rowIndex, colIndex)}
                           disabled={playerSymbol !== null}>
                           {playerSymbol}
                        </button>
                     </li>
                  ))}
               </ol>
            </li>
         ))}
      </ol>
   );
}
