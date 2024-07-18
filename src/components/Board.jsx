import { Square } from "./Square";


export const Board = ({ board, updateBoard }) => {
    return (
        <section className='game'>
            {
                board.map((_, index) => (
                    <Square
                        key={index}
                        index={index}
                        updateBoard={updateBoard}
                    >
                        {board[index]}
                    </Square>
                ))
            }
        </section>
    );
}