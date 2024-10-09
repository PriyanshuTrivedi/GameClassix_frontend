import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Sudoku.css'
import {contextData} from '../../AllStates'
import { cnvrtedTime, fetchSudoku, initializeFreqOfNums, setStyle,updateStats,updatedShadowMatrix } from './Sudoku_helper_func';
import { copy2dArr, initialize2DArr } from '../DotAndBoxes/DotAndBoxes_helper_func';

const Sudoku = () => {
    const {backendLink,diff}=useContext(contextData);
    const [currSudoku,setCurrSudoku]=useState(null);
    const [completeSudoku,setCompleteSudoku]=useState(null);
    const [shadowmatrix,setShadowMatrix]=useState(initialize2DArr(9,9,false));
    const [freqOfNumbersLeft,setFreqOfNumbersLeft]=useState(null);
    const [timer,setTimer]=useState(0);
    const [numSelected,setNumberSelected]=useState(null);
    const [blanks,setBlanks]=useState(81);
    const [gameEnded,setGameEnded]=useState(false);

    const navigate=useNavigate();
    
    useEffect(()=>{
        if(localStorage.getItem('u-token')===null){
            navigate('/signup_login');
        }
    },[]);

    useEffect(()=>{
        async function fetchInitially(){
            const res=await fetchSudoku(backendLink,diff['sudoku']);
            console.log(res);
            setCurrSudoku(res.partiallyFilledSudokuWithUniqueSolution);
            setCompleteSudoku(res.completeSudoku);
            setFreqOfNumbersLeft(initializeFreqOfNums(res.partiallyFilledSudokuWithUniqueSolution));
            setTimer(0);
            setBlanks(res.blanks);
        }
        fetchInitially();
    },[]);
    useEffect(() => {
        const intervalId = setInterval(() => {
            if(gameEnded===false){
                setTimer(prevTimer=>prevTimer+1);
            }
        }, 1000);
        return ()=>clearInterval(intervalId);
    }, [gameEnded,setGameEnded]);

    const boxShadowStyle="3px 3px 10px rgba(0, 255, 236, 0.8), -3px -3px 10px rgba(0, 255, 236, 0.8)";

    const handleClick=(row,col)=>{
        if(numSelected===null){
            window.alert("First select a number!");
            return;
        }
        if(currSudoku[row][col]>0){
            window.alert("Cell is already filled!");
            return;
        }
        if(freqOfNumbersLeft[numSelected-1]===0){
            window.alert(`All ${numSelected}'s are filled!`);
            return;
        }
        if(numSelected!==completeSudoku[row][col]){
            updateStats(backendLink,false,localStorage.getItem('u-email'),diff["sudoku"],timer);
            setGameEnded(true);
            window.alert(`Correct number was ${completeSudoku[row][col]}, while you selected ${numSelected}! You lost the game!`);
            setTimeout(()=>{
                navigate('/');
            },1000);
            return;
        }
        const temp=copy2dArr(currSudoku);
        temp[row][col]=numSelected;
        setCurrSudoku(temp);
        const tempArr=[...freqOfNumbersLeft];
        tempArr[numSelected-1]--;
        setFreqOfNumbersLeft(tempArr);
        setBlanks(num=>num-1);
    }

    useState(()=>{
        if(blanks===0){
            updateStats(backendLink,true,localStorage.getItem('u-email'),diff["sudoku"],timer);
            setGameEnded(true);
            window.alert("congrats you have won the game!");
            setTimeout(()=>{
                navigate('/');
            },1000);
        }
    },[blanks,setBlanks])

  return (
    <div className="sudokuPage">
        <div className="timeAndQuitBtn">
            <div className="timerBox">{cnvrtedTime(timer)}</div>
            <div className="quitBtnSudoku" onClick={()=>navigate('/')}>Quit</div>
        </div>
        <div className='sudoku'>
            {
                currSudoku && currSudoku.map((rowEls,rowIdx)=>{
                    return (
                        <div className="sudokuRow">
                            {
                                rowEls && rowEls.map((el,colIdx)=>{
                                    return (
                                        <div className="sudokuCell" 
                                        onMouseEnter={()=>setShadowMatrix(updatedShadowMatrix(rowIdx,colIdx))} 
                                        onMouseLeave={()=>setShadowMatrix(initialize2DArr(9,9,false))}
                                        onClick={()=>handleClick(rowIdx,colIdx)}
                                        style={setStyle(rowIdx,colIdx,currSudoku,shadowmatrix)}>
                                            {el>0?el:""}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
        <div className="sudokuNumAndFreqBox">
            {
                freqOfNumbersLeft && freqOfNumbersLeft.map((el,idx)=>{
                    return (
                        <div className="numWithFreq" 
                        onClick={()=>setNumberSelected(idx+1)}
                        style={(numSelected===idx+1)?{boxShadow:boxShadowStyle}:{}}>
                            {idx+1}
                            <div className="freq" >{el}</div>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Sudoku
