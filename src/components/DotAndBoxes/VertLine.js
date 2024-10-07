import React, { useContext } from 'react'
import { contextData } from '../../AllStates'
import { check_left_right_for_vertLine, copy2dArr, playerColors, updateStatesForVertLine } from './DotAndBoxes_helper_func';
import './VertLine.css'

const VertLine = ({row,col}) => {
    const {n,vertLineMatrix,horiLineMatrix,setVertLineMatrix,linesCalledWithPlayerColor,setLinesCalledWithPlayerColor,socket,players,indexOfPlayerWhoHasChance,setIndexOfPlayerWhoHasChance,boxCol,setBoxCol,playersScore,setPlayersScore,boxesFilled,setBoxesFilled}=useContext(contextData);

    const handleClick=()=>{
      if(vertLineMatrix[row][col]!=-1){
        window.alert("Line already made!");
        return;
      }
      if(players[indexOfPlayerWhoHasChance]!==localStorage.getItem('u-username')){
        window.alert("It is not your chance!");
        return;
      }
      socket.emit("dotAndBoxes_sendLineClicked",`1_${row}_${col}`);
      updateStatesForVertLine(row,col,horiLineMatrix,vertLineMatrix,boxCol,indexOfPlayerWhoHasChance,setVertLineMatrix,setBoxCol,setIndexOfPlayerWhoHasChance,players.length,playersScore,setPlayersScore,boxesFilled,setBoxesFilled);
    }

    return (
      <div className='vertLineContainer'>
        <div className="vertLine" style={vertLineMatrix[row][col]!=-1?{backgroundColor:playerColors[vertLineMatrix[row][col]]}:{}} onClick={handleClick}></div>
      </div>
    )
}

export default VertLine
