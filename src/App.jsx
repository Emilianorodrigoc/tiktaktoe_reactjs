import confetti from "canvas-confetti"
import { useState } from 'react'
import { Board } from "./components/Board.jsx"
import { Square } from "./components/Square.jsx"
import { WinnerModal } from "./components/WinnerModal.jsx"
import { turns } from "./constants.js"
import { checkEndGame, checkWinner } from "./logic/board.js"


function App() {
  // Creación de estados
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(turns.X)
  const [winner, setWinner] = useState(null)

  //Reseteo de juego
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(turns.X)
    setWinner(null)
  }


  const updateBoard = (index) => {

    // Verificamos que no se sobreescriba la información
    if (board[index] || winner) return

    // Creamos un nuevo tablero
    const newBoard = [...board]

    // Asignamos y seteamos el turno
    newBoard[index] = turn
    setBoard(newBoard)

    // Verificamos que se asigne el turno nuevo correctamente
    const newTurn = turn == turns.X ? turns.O : turns.X
    setTurn(newTurn)

    const newWinner = checkWinner(newBoard)

    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }

  }

  return (
    <main className='board'>
      <h1>Tik tak toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <Board board={board} updateBoard={updateBoard} />
      <section className='turn'>
        <Square isSelected={turn == turns.X}>
          {turns.X}
        </Square>
        <Square isSelected={turn == turns.O}>
          {turns.O}
        </Square>
      </section>
      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}

export default App
