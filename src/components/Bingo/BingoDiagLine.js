import React from 'react'

const BingoDiagLine = ({visibleDiagLines}) => {
  return (
    <div className="diagBox">
      {
          [0,1].map((i)=>{
          return <div key={i} className="diag" id={i===0?`primaryDiag`:`secondaryDiag`} style={visibleDiagLines.includes(i)?{visibility:'visible'}:{visibility:'hidden'}} ></div>
          })
      }
    </div>
  )
}

export default BingoDiagLine
