import React, { useEffect, useState } from 'react'
import BingoChar from './BingoChar'
import BingoRow from './BingoRow'
import BingoHoriLines from './BingoHoriLines'
import BingoVertLines from './BingoVertLines'
import BingoDiagLine from './BingoDiagLine'
import { contextData } from '../../AllStates'
import { useContext } from 'react'
import {findCompleteDiagLines,findCompleteHoriLines,findCompleteVertLines,totalVisibleLines} from './Bingo_helper_funcs'

const BingoBoard = ({board}) => {

    const str='BINGO';
    const {numbersCalled, gameFinished, setGameFinished}=useContext(contextData);

    const [visibleHoriLines,setVisibleHoriLines]=useState([]);
    const [visibleVertLines,setVisibleVertLines]=useState([]);
    const [visibleDiagLines,setVisibleDiagLines]=useState([]);
    const [totalCompleteLines,setTotalCompleteLines]=useState(0);

    useEffect(()=>{
        setVisibleHoriLines(findCompleteHoriLines(board,numbersCalled));
        setVisibleVertLines(findCompleteVertLines(board,numbersCalled));
        setVisibleDiagLines(findCompleteDiagLines(board,numbersCalled));
        let total=totalVisibleLines(board,numbersCalled);
        setTotalCompleteLines(total);
        if(total>=5){
            setGameFinished(true);
        }
    },[numbersCalled,findCompleteDiagLines,findCompleteHoriLines,findCompleteVertLines,setTotalCompleteLines,setGameFinished]);

    return (
        <div className="bingo_mainArea">
            <div className="bingoInitials">
                {
                    [0,1,2,3,4].map((i)=>{
                        return <BingoChar char={str[i]} slashVisible={totalCompleteLines>i}/>
                    })
                }
            </div>
            <div className="bingoBoardContainer">
                <div className='bingoBoard'>
                    {board.map((row, index) => (
                        <BingoRow key={index} rowNums={row} rowNo={index} board={board}/>
                    ))}
                </div>
                <BingoHoriLines visibleHoriLines={visibleHoriLines}/>
                <BingoVertLines visibleVertLines={visibleVertLines}/>
                <BingoDiagLine visibleDiagLines={visibleDiagLines}/>
            </div>
        </div>
  )
}

export default BingoBoard
