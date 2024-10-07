import React from 'react'
import './BingoRow.css'
import BingoCell from './BingoCell'

const BingoRow = ({rowNums,rowNo,board}) => {
  return (
    <div className='bingoRow'>
      {
        rowNums.map((num,index)=>{
            return <BingoCell num={num} rowNo={rowNo} colNo={index} board={board}/>
        })
      }
    </div>
  )
}

export default BingoRow
