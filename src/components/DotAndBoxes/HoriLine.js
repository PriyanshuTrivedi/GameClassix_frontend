import React, { useContext } from 'react'
import { contextData } from '../../AllStates'
import { playerColors,copy2dArr, check_up_down_for_horiLine, updateStatesForHoriLine } from './DotAndBoxes_helper_func';
import './HoriLine.css';

const HoriLine = ({row,col}) => {
    const {n,horiLineMatrix,vertLineMatrix,setHoriLineMatrix,linesCalledWithPlayerColor,setLinesCalledWithPlayerColor,socket,players,indexOfPlayerWhoHasChance,setIndexOfPlayerWhoHasChance,boxCol,setBoxCol,playersScore,setPlayersScore,boxesFilled,setBoxesFilled}=useContext(contextData);

    const handleClick=()=>{
      if(horiLineMatrix[row][col]!=-1){
        window.alert("Line already made!");
        return;
      }
      if(players[indexOfPlayerWhoHasChance]!==localStorage.getItem('u-username')){
        window.alert("It is not your chance!");
        return;
      }
      socket.emit("dotAndBoxes_sendLineClicked",`0_${row}_${col}`);
      updateStatesForHoriLine(row,col,horiLineMatrix,vertLineMatrix,boxCol,indexOfPlayerWhoHasChance,setHoriLineMatrix,setBoxCol,setIndexOfPlayerWhoHasChance,players.length,playersScore,setPlayersScore,boxesFilled,setBoxesFilled);
    }
  return (
    <div className='horiLineContainer'>
      <div className="horiLine" style={horiLineMatrix[row][col]!=-1?{backgroundColor:playerColors[horiLineMatrix[row][col]]}:{}} onClick={handleClick}></div>
    </div>
  )
}

export default HoriLine
