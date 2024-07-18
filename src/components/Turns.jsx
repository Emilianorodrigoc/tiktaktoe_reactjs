import { turns } from "../constants"
import { Square } from "./Square"

export const Turns = ({ turn }) => {
    return (
        <section className='turn'>
            <Square isSelected={turn === turns.X}>
                {turns.X}
            </Square>
            <Square isSelected={turn === turns.O}>
                {turns.O}
            </Square>
        </section>
    )
}
