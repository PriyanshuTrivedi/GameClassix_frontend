import React, { useContext } from 'react'
import { contextData } from '../../AllStates'
import './Dot.css'

const Dot = ({row,col}) => {
    const {n}=useContext(contextData);
  return (
    <div className='dot'>
      {((Number)(n)+1)*row+(Number)(col)+1}
    </div>
  )
}

export default Dot
