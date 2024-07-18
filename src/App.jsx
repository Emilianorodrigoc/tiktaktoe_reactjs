import confetti from "canvas-confetti"
import { useState } from 'react'
import { Board } from "./components/Board.jsx"
import { Turns } from "./components/Turns.jsx"
import { WinnerModal } from "./components/WinnerModal.jsx"
import { turns } from "./constants.js"
import { checkEndGame, checkWinner } from "./logic/board.js"
import { resetGameToStorage, saveGameToStorage } from "./logic/storage.js"


function App() {
  // Creación de estados
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? turns.X
  })

  const [winner, setWinner] = useState(null)

  //Reseteo de juego
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(turns.X)
    setWinner(null)
    resetGameToStorage()
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
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })
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
      <Turns turn={turn} />
      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}

export default App
