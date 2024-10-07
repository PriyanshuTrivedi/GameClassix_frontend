import React from 'react'
import './BingoVertLines.css'

const BingoVertLines = ({visibleVertLines}) => {
  return (
    <div className='bingo_vertLines'>
      {
        [0,1,2,3,4].map((i)=>{
          return <div key={i} className="bingo_vertLine" style={visibleVertLines.includes(i)?{visibility:'visible'}:{visibility:'hidden'}} ></div>
        })
      }
    </div>
  )
}

export default BingoVertLines
