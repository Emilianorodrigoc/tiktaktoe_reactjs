import { useState } from 'react'

/* Definimos los turnos */
const turns = {
  X: 'X',
  O: 'O'
}


/* Creamos el componente square */
const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`


  const handleClick = () => {
    updateBoard(index)
  }


  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}



const winnerCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 5, 6]
]

function App() {
  // Contrucción de board
  const [board, setBoard] = useState(Array(9).fill(null))

  const [turn, setTurn] = useState(turns.X)

  const [winner, setWinner] = useState(null)

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
      setWinner(newWinner)
    }

  }

  // Revisamos las combinaciones ganadoras
  const checkWinner = (boardToCheck) => {
    for (const combo of winnerCombos) {
      const [a, b, c] = combo
      if (
        boardToCheck[a] &&
        boardToCheck[a] == boardToCheck[b] &&
        boardToCheck[a] == boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }
    //Si no hay ganador
    return null
  }

  return (
    <main className='board'>
      <h1>Tik tak toe</h1>
      <section className='game'>
        {
          board.map((_, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn == turns.X}>
          {turns.X}
        </Square>
        <Square isSelected={turn == turns.O}>
          {turns.O}
        </Square>
      </section>
    </main>
  )
}

export default App