import React from 'react'
import { Link } from 'react-router-dom'
import './QuitBtn.css'

const QuitBtn = ({navigateTo}) => {
  return (
    <Link to={navigateTo} style={{textDecoration:"none"}}>
        <div className='quitBtn'>
            Quit
        </div>
    </Link>
  )
}

export default QuitBtn
