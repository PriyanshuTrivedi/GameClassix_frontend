import React, { useContext } from 'react'
import './MinesweeperCell.css'
import { contextData } from '../../AllStates'
import { cpyMatrix, swapElsOfArray} from './Minesweeper_helperFunc';

const MinesweeperCell = ({rowNo,colNo}) => {
  const {board,vis,setVis,n,boxesLeft,setBoxesLeft,groupOfZeroInfo,setGroupOfZeroInfo,flagVisible,setFlagVisible,minesLeft,setMinesLeft,minesPos,gameEnded,setGameEnded,stopTimer,setStopTimer}=useContext(contextData);

  const dirs=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,0],[0,1],[1,-1],[1,0],[1,1]];
  const validCell=(i,j,matrixSize)=>{
    if(i<0||j<0||i>=matrixSize||j>=matrixSize){
      return false;
    }
    return true;
  }

  const handleClickedMine=()=>{
    
    setStopTimer(true);

    let minesPosCpy=[...minesPos];
    for(let i=0;i<minesPos.length;i++){
      if(minesPos[i]===rowNo*n+colNo){
        swapElsOfArray(0,i,minesPosCpy);
        break;
      }
    }

    for(let i=0;i<minesPosCpy.length;i++){
      setTimeout(() => {
        let temp=cpyMatrix(vis);
        for (let j=0;j<=i;j++) {
          temp[Math.floor(minesPosCpy[j]/n)][minesPosCpy[j]%n] = true;
        }
        setVis(temp);
      }, i*1000);
    }

    setTimeout(() => {
      setGameEnded(true);
    }, minesPosCpy.length*1000);
  }

  const handleClickedZeroCell=()=>{
    let temp=cpyMatrix(vis);
    let boxesUncovered=0;
    groupOfZeroInfo.indexesWithSameGroupNumber[groupOfZeroInfo.groupNumber[rowNo*n+colNo]].forEach(el => {
      let row=Math.floor(el/n);
      let col=el%n;
      dirs.forEach(dir => {
        let i=row+dir[0];
        let j=col+dir[1];
        if(validCell(i,j,n) && temp[i][j]===false){
          boxesUncovered++;
          temp[i][j]=true;
        }
      });
    });
    setVis(temp);
    setBoxesLeft(boxesLeft-boxesUncovered);
  }

  const handleClickedGreaterThanZeroCell=()=>{
    let temp=cpyMatrix(vis);
    temp[rowNo][colNo]=true;
    setVis(temp);
    setBoxesLeft(boxesLeft-1);
  }

  const handleClick=()=>{
    if(vis[rowNo][colNo]===true){
      window.alert('Box already opened!');
    }else if(board[rowNo][colNo]===-1){
      handleClickedMine();
    }else if(board[rowNo][colNo]===0){
      handleClickedZeroCell();
    }else{
      handleClickedGreaterThanZeroCell();
    }
  }
  
  const handleRightClick=(e)=>{
    e.preventDefault();
    let temp=cpyMatrix(flagVisible);
    if(temp[rowNo][colNo]===true){
      setMinesLeft((mines)=>mines+1);
      temp[rowNo][colNo]=false;
    }else{
      if(minesLeft===0){
        window.alert("You are trying to mark more than present mines!");
        return;
      }
      setMinesLeft((mines)=>mines-1);
      temp[rowNo][colNo]=true;
    };
    setFlagVisible(temp);
    console.log('chl right click hora');
  }
  return (
    <div className='minesweeperCell' onClick={handleClick} onContextMenu={handleRightClick} style={vis[rowNo][colNo]?{backgroundColor:"rgb(75 85 85)"}:{}}>
      {
        vis[rowNo][colNo]===true
        ?
        <>
        {
          board[rowNo][colNo]===-1
          ?
          <img src={require('../../images/minesweeper_mine.png')} alt=""  style={{height:"50%",width:"50%"}}/>
          :
          <>
          {
            board[rowNo][colNo]>0
            ?
            board[rowNo][colNo]
            :
            <></>
          }
          </>
        }
        </>
        :
        <>
        {
          flagVisible[rowNo][colNo]===true?
          <img src={require('../../images/filled-flag-64.png')} alt=""  style={{height:"50%",width:"50%"}}/>
          :
          <></>
        }
        </>
      }
    </div>
  )
}

export default MinesweeperCell
