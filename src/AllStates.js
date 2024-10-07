import React, { createContext } from 'react'
import { useState } from 'react'
import io from 'socket.io-client'

const contextData=createContext();

const AllStates = (props) => {

    const backendLink='https://gameclassix-backend.onrender.com';
    
    const socket=io.connect(backendLink);

    const [user, setUser] = useState({username: '', email: '',user_mongo_id:''});
    const [sizeDotAndBoxes, setSizeDotAndBoxes]=useState(5);
    const [diff,setDiff]=useState({
        sudoku:"beginner",
        dotAndBoxes:"easy",
        ticTacToe:"easy",
    });
    const [isMultiplayer,setIsMultiplayer]=useState({
        dotAndBoxes:false,
        ticTacToe:false,
        bingo:false
    });
    const [sizeOfMatrix,setSizeOfMatrix]=useState({
        dotAndBoxes:5,
        minesweeper:10,
    });
    // const [room,setRoom]=useState('');

    return (
        // <contextData.Provider value={{backendLink,user, setUser,sizeDotAndBoxes, setSizeDotAndBoxes,diff,setDiff,socket,isMultiplayer,setIsMultiplayer,sizeOfMatrix,setSizeOfMatrix,room,setRoom}}>
        <contextData.Provider value={{backendLink,user, setUser,sizeDotAndBoxes, setSizeDotAndBoxes,diff,setDiff,socket,isMultiplayer,setIsMultiplayer,sizeOfMatrix,setSizeOfMatrix}}>
            {props.children}
        </contextData.Provider>
    )
}

export default AllStates;
export {contextData};