import React, { useContext } from 'react'
import MinesweeperCell from './MinesweeperCell';
import './MinesweeperRow.css'
import { contextData } from '../../AllStates';

const MinesweeperRow = ({rowNo}) => {
    const {board}=useContext(contextData);
    return (
        <div className='minesweeperRow'>
        {
            board[rowNo].map((el,index)=>{
                return <MinesweeperCell rowNo={rowNo} colNo={index}/>
            })
        }
        </div>
    )
}

export default MinesweeperRow
