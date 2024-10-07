import React from 'react'
import Timer from './Timer'
import MineCount from './MineCount'
import QuitBtn from '../QuitBtn/QuitBtn'
import {Link} from 'react-router-dom'
import './MinesweeperInfoBar.css'

const MinesweeperInfoBar = () => {
    return (
        <div className='minesweeperInfoBar'>
            <div className="minesweeperleftInfo">
                <Timer/>
                <MineCount/>
            </div>
            <Link to={'/'} style={{textDecoration:"none"}}>
                <div className="minesweeperQuitBtn">
                    Quit
                </div>
            </Link>
        </div>
    )
}

export default MinesweeperInfoBar
