import React, { useContext, useEffect, useState } from 'react'
import './Minesweeper.css'
import { contextData } from '../../AllStates'
import {createMatrix, fetchInitialInfo, updateStats} from './Minesweeper_helperFunc'
import MinesweeperBoard from './MinesweeperBoard'
import MinesweeperInfoBar from './MinesweeperInfoBar'
import { useNavigate } from 'react-router-dom'

const Minesweeper = () => {
    const context=useContext(contextData);
    const {backendLink,sizeOfMatrix}=context;
    const n=sizeOfMatrix.minesweeper;
    const navigate=useNavigate();

    const minesAccToSize={
        "7":7,
        "10":15,
        "15":25
    };

    const [board,setBoard]=useState(null);
    const [vis,setVis]=useState(null);
    const [flagVisible,setFlagVisible]=useState(null);
    const [groupOfZeroInfo,setGroupOfZeroInfo]=useState(null);
    const [minesPos,setMinesPos]=useState(null);
    const [boxesLeft,setBoxesLeft]=useState(n*n-minesAccToSize[n]);
    const [timer,setTimer]=useState(0);
    const [minesLeft,setMinesLeft]=useState(minesAccToSize[n]);
    const [gameEnded,setGameEnded]=useState(false);
    const [stopTimer,setStopTimer]=useState(false);
    
    useEffect(()=>{
        if(localStorage.getItem('u-token')===null){
            navigate('/signup_login');
        }
    },[]);

    useEffect(()=>{
        if(gameEnded===true){
            updateStats(backendLink,localStorage.getItem('u-email'),(boxesLeft===0),timer);
            let msg='congrats you have won the game!';
            if(boxesLeft>0){
                msg='You Lost, you selected mine!!';
            }
            setTimeout(() => {
                window.alert(msg);
                setTimeout(()=>{
                    navigate('/');
                },3000);
            },500);
        }
    },[gameEnded,setGameEnded]);

    useEffect(()=>{
        if(stopTimer===false){
            const intervalId=setInterval(() => {
                setStopTimer((timer)=>timer+1);
            }, 1000);
            return ()=>clearInterval(intervalId);
        }
    },[stopTimer,setStopTimer]);

    useEffect(()=>{
        if(boxesLeft===0){
            setGameEnded(true);
        }
    },[boxesLeft,setBoxesLeft])

    useEffect(()=>{
        async function fetchInitially(){
            const res=await fetchInitialInfo(backendLink,n,minesAccToSize[n]);
            console.log(res);
            setGroupOfZeroInfo(res.groupOfZeroInfo);
            setBoard(res.board);
            setMinesPos(res.minesPos);
        }
        const initialSetVisAndFlagVisible=()=>{
            setVis(createMatrix(n));
            setFlagVisible(createMatrix(n));
        }
        const setCellSize=()=>{
            const cellSide = `min(100vh, 100vw) / (${n} + 2)`;
            const boardSide= `${cellSide}*${n}`;
            document.documentElement.style.setProperty('--cellSideMinesweeper',`calc(${cellSide})`);
            document.documentElement.style.setProperty('--boardSideMinesweeper',`calc(${boardSide})`);
        }
        fetchInitially();
        initialSetVisAndFlagVisible();
        setCellSize();
    },[]);

    return (
        <contextData.Provider value={{board,vis,setVis,n,boxesLeft,setBoxesLeft,groupOfZeroInfo,setGroupOfZeroInfo,flagVisible,setFlagVisible,timer,minesLeft,setMinesLeft,minesPos,backendLink,gameEnded,setGameEnded,stopTimer,setStopTimer}}>
            <div className="minesweeperPage">
                <MinesweeperInfoBar/>
                <MinesweeperBoard/>
            </div>
        </contextData.Provider>
    )
}

export default Minesweeper
