import React, { useContext } from 'react'
import { contextData } from '../../AllStates'
import { playerColors } from './DotAndBoxes_helper_func';
import './Box.css'

const Box = ({row,col}) => {
    const {n,boxCol,setBoxCol}=useContext(contextData);
  return (
    <div id={`${row},${col}`} className='box' style={boxCol[row][col]!==-1?{backgroundColor:playerColors[boxCol[row][col]]}:{}}>
    </div>
  )
}

export default Box
