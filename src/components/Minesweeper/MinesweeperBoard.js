import React, { useContext } from 'react'
import { contextData } from '../../AllStates'
import MinesweeperRow from './MinesweeperRow';
import './MinesweeperBoard.css'

const MinesweeperBoard = () => {
    const {n,board}=useContext(contextData);
    return (
        <div className='minesweeperBoard'>
        {
            board?
            board.map((el,index)=>{
                return <MinesweeperRow rowNo={index}/>
            })
            :
            <></>
        }
        </div>
    )
}

export default MinesweeperBoard
