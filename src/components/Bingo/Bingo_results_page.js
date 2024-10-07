import React from 'react'
import BingoBoard from './BingoBoard'
import './Bingo_results_page.css'
import QuitBtn from '../QuitBtn/QuitBtn'

const Bingo_results_page = ({playersWithBoard}) => {
    return (
    <div className="bingoAfterGameEnds">
        <div className="gameEndedHeading">
            Game Ended
        </div>
        <QuitBtn navigateTo={"/"}/>
        <div className="resBingoBoards">
            {
                playersWithBoard.map((el,index)=>{
                    return (
                        <div className='playerBoardAfterBingoGameEnds'>
                            <div className='playerNameBingoAfterEnd'>{el[0]}</div>
                            <BingoBoard board={el[1]}/>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Bingo_results_page
