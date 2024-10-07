import React, { useContext } from 'react'
import {contextData} from '../../AllStates'
import DotAndBoxesRow from './DotAndBoxesRow';
import './MainGrid.css'

const MainGrid = () => {
    const {n,horiLineMatrix,setHoriLineMatrix}=useContext(contextData);
  return (
    <div className='mainGrid'>
      {
        horiLineMatrix.map((el,index)=>{
            return <DotAndBoxesRow row={index}/>
        })
      }
    </div>
  )
}

export default MainGrid


