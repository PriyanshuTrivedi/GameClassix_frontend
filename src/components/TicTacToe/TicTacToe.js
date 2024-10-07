import React, { useContext,useState,useEffect } from 'react'
import { contextData } from '../../AllStates'
import { copy2dArr, initialize2DArr } from '../DotAndBoxes/DotAndBoxes_helper_func';
import './TicTacToe.css'
import { checkIfRoomExistsAndGameNotStarted } from '../Home/GameCard/GameCard_helper_func';
import Player from '../Bingo/Player';
import { useNavigate, useParams } from 'react-router-dom';
import {updateStats, compOptimalChance, returnWinnerIndex} from './TicTacToe_helper_func'


const TicTacToe = () => {
  const {diff,socket,backendLink}=useContext(contextData);
  const arr2d=initialize2DArr(3,3,-1);
  const [board,setBoard]=useState(arr2d);
  const [players,setPlayers]=useState(null);
  const [indexOfPlayerWhoHasChance,setIndexOfPlayerWhoHasChance]=useState(0);
  const [cellsLeft,setCellsLeft]=useState(9);
  const [compIsTakingChance,setCompIsTakingChance]=useState(false);
  const [winnerIndex,setWinnerIndex]=useState(-1);

  const {roomId}=useParams();
  const navigate=useNavigate();

  useEffect(()=>{
    async function handleInitially(){
      const res=await checkIfRoomExistsAndGameNotStarted(backendLink,roomId,"ticTacToe");
      console.log(res);
      if(res.canJoin===false){
        window.alert(res.message);
        navigate('/');
      }
    }
    if(roomId!=="singlePlayer"){
      handleInitially();
    }
    if(localStorage.getItem('u-token')===null){
      navigate('/signup_login');
    }
  },[]);

  useEffect(() => {
    return ()=>{
      socket.close();
    }
  }, []);

  useEffect(() => {
    if(roomId!="singlePlayer"){
      const obj = { room: roomId, game:"ticTacToe", username: localStorage.getItem('u-username')};
      socket.emit('join_room', JSON.stringify(obj));
    }else{
      setPlayers([localStorage.getItem('u-username'),"computer"]);
    }
  }, []);

  useEffect(()=>{
    if(roomId!=='singlePlayer'){
      const addPlayers=(data)=>{
        data=JSON.parse(data);
        console.log(data);
        setPlayers(data);
      }
      socket.on("roomPlayers_updated",addPlayers);
      return ()=>{
        socket.off("roomPlayers_updated",addPlayers);
      }
    }
  },[socket]);

  const takeTurn=(idOfBox)=>{
    const arr=idOfBox.split('_');
    const row=Number(arr[0]);
    const col=Number(arr[1]);
    let tempArr=copy2dArr(board);
    tempArr[row][col]=indexOfPlayerWhoHasChance;
    setBoard(tempArr);
    setIndexOfPlayerWhoHasChance((num)=>(num+1)%2);
    setCellsLeft((num)=>num-1);
    const idx=returnWinnerIndex(tempArr,row,col);
    if(idx!==-1){
      setWinnerIndex(idx);
    }
  }

  useEffect(()=>{
    if(roomId!=='singlePlayer'){
      const makeOppChance=(data)=>{
        console.log(data);
        takeTurn(data);
      }
      socket.on("ticTacToe_receiveBoxClicked",makeOppChance);
      return ()=>{
        socket.off("ticTacToe_receiveBoxClicked",makeOppChance);
      }
    }
  },[socket,board,setBoard,indexOfPlayerWhoHasChance,setIndexOfPlayerWhoHasChance,cellsLeft,setCellsLeft]);

  const handleClick=(row,col)=>{
    if(players.length<2){
      window.alert("Tic Tac Toe is played between 2 players!");
      return;
    }
    if(board[row][col]!==-1){
      return;
    }
    if(players[indexOfPlayerWhoHasChance]!==localStorage.getItem('u-username')){
      window.alert("Its not your chance!");
      return;
    }
    const idOfBox=`${row}_${col}`;
    takeTurn(idOfBox);
    if(roomId!=='singlePlayer'){
      socket.emit("ticTacToe_sendBoxClicked",idOfBox);
    }
  }

  useEffect(()=>{
    if(roomId==='singlePlayer' && cellsLeft>0 && indexOfPlayerWhoHasChance===1 && compIsTakingChance===false){
      async function compTakesTurn(){
        setCompIsTakingChance(true);
        const res=await compOptimalChance(backendLink,board,diff["ticTacToe"]);
        console.log(res);
        const idOfBox=`${res.row}_${res.column}`;
        setTimeout(() => {
          takeTurn(idOfBox);
          setCompIsTakingChance(false);
        },1000);
      }
      compTakesTurn();
    }
  },[indexOfPlayerWhoHasChance,setIndexOfPlayerWhoHasChance,compIsTakingChance,setCompIsTakingChance,cellsLeft,setCellsLeft])

  useEffect(()=>{
    console.log(cellsLeft);
    if(cellsLeft===0 || winnerIndex>=0){
      async function updateStatsForTTT(){
        let res=winnerIndex;
        let finalMsg=`Game reulted in draw!!`;
        if(winnerIndex>=0){
          res=(localStorage.getItem('u-username')===players[winnerIndex])?1:0;
          finalMsg=`${players[winnerIndex]} won the game!!`;
        }
        await updateStats(backendLink,roomId!=="singlePlayer",res,localStorage.getItem('u-email'),diff["ticTacToe"]);
        setTimeout(()=>{
          window.alert(finalMsg);
          navigate('/');
        },1000)
      }
      updateStatsForTTT();
    }
  },[cellsLeft,setCellsLeft,winnerIndex,setWinnerIndex,players,setPlayers]);

  useEffect(()=>{
    if(roomId!="singlePlayer"){
      const endTheGame=()=>{
        window.alert("Other player has left the game!");
        setTimeout(() => {
          navigate('/');
        },1000);
      }
      socket.on('player_left',endTheGame);
      return ()=>{
        socket.off('player_left',endTheGame);
      }
    }
  },[socket]);

  const styleWhenClicked={
    boxShadow:'0px 15px 45px -12px rgba(77, 5, 5, 0.8) inset, 0px 15px 45px -12px rgba(77, 5, 5, 0.8)inset',
    cursor:'not-allowed'
  };

  return (
    <div className='ticTacToeContainer'>
      {
        roomId!=="singlePlayer"
        ?
        <div className='roomDiv'>Room: {roomId}</div>
        :
        <></>
      }
      <div className="players">
        {
          players && players.map((el,index)=>{
            return <Player key={index} PlayerName={el} isCurrentPlayer={index===indexOfPlayerWhoHasChance}/> 
          })
        }
      </div>
      <div className='ticTacToeBoard'>
        {
          board && board.map((row,rowIdx)=>{
            return (
            <div className='ticTacToeRow'>
              {
                row.map((el,colIdx)=>{
                  return <div className='ticTacToeBox' style={Number(el)===-1?{cursor:"pointer"}:styleWhenClicked} onClick={()=>handleClick(rowIdx,colIdx)}>{(Number(el)!==-1)?(Number(el)>0?"O":"X"):""}</div>
                })
              }
            </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default TicTacToe