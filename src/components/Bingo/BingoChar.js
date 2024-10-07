import React from 'react'
import './BingoChar.css'

const BingoChar = ({char,slashVisible}) => {
    return (
        <div className='BingoCharContainer'>
            <div className="bingoChar charBox" style={slashVisible?{boxShadow:'2px 2px 4px rgba(77, 5, 5, 0.8) , 2px 2px 4px rgba(77, 5, 5, 0.8)'}:{}}>{char}</div>
            <div className="charBox">
                <div className="bingoCharSlash" style={slashVisible?{visibility:'visible'}:{visibility:'hidden'}}></div>
            </div>
        </div>
    )
}

export default BingoChar
