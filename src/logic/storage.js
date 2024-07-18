// Guardamos el tablero y el turno
export const saveGameToStorage = ({ board, turn }) => {
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', turn)
}

export const resetGameToStorage = () => {
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
}