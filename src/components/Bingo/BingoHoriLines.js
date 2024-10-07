import React from 'react'
import './BingoHoriLines.css'

const BingoHoriLines = ({visibleHoriLines}) => {
  return (
    <div className='bingo_horiLines'>
      {
        [0,1,2,3,4].map((i)=>{
          return <div key={i} className="bingo_horiLine" style={visibleHoriLines.includes(i)?{visibility:'visible'}:{visibility:'hidden'}} ></div>
        })
      }

    </div>
  )
}

export default BingoHoriLines
