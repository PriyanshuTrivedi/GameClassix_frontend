import React, { useContext } from 'react'
import { contextData } from '../../AllStates'
import './Timer.css'

const Timer = () => {
    const {timer}=useContext(contextData);
    const cnvrt_in_mmss_format=(seconds)=>{
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const paddedMinutes = String(minutes).padStart(2, '0');
        const paddedSeconds = String(remainingSeconds).padStart(2, '0');
        return `${paddedMinutes}:${paddedSeconds}`;
    }
    return (
        <div className='minesweeperTimer'>
        {cnvrt_in_mmss_format(timer)}
        </div>
    )
}

export default Timer
