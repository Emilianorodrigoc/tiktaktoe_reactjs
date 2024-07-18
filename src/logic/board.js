import { winnerCombos } from "../constants"

// Revisamos las combinaciones ganadoras
export const checkWinner = (boardToCheck) => {
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


export const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square != null)
  }