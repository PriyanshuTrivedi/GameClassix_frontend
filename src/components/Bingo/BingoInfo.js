import React, { useContext } from 'react'
import { contextData } from '../../AllStates'
import './BingoInfo.css'

const BingoInfo = () => {
    const context=useContext(contextData);
    const {numbersCalled,playersWithBoard}=context;
    return (
        <div className='bingo_info'>
            <h2>Moves history</h2>
            <div className="bingo_infoBoxContainer">
                {
                    numbersCalled.map((num,index)=>{
                        return (
                            <div className='bingo_infoBox'>
                                {playersWithBoard[index%playersWithBoard.length][0]} clicked number {num}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default BingoInfo
