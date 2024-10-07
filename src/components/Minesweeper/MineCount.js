import React, { useContext } from 'react'
import { contextData } from '../../AllStates'
import './MineCount.css'

const MineCount = () => {
    const {minesLeft}=useContext(contextData);
    return (
        <div className='mineCountDiv'>
            <img src={require('../../images/minesweeper_mine.png')} alt="" className='mineImg'/>
            {minesLeft}
        </div>
    )
}

export default MineCount
