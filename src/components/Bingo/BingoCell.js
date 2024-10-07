import React, { useContext} from 'react'
import { contextData } from '../../AllStates';
import './BingoCell.css'

const BingoCell = ({num,rowNo,colNo,board}) => {
  const context=useContext(contextData);
  const {numbersCalled,setNumbersCalled,socket,playersWithBoard,globalGameEnded,isMultiplayer,roomId}=context;

  const handleMouseIn=(e)=>{
    if(numbersCalled.includes(num)){
      e.target.style.cursor='not-allowed';
    }
  }
  const handleClickCell=(e)=>{
    if(globalGameEnded===true){
      window.alert("Game has ended my child!");
      return;
    }
    if(playersWithBoard.length<2){
      window.alert('Atleast 2 players must join to play!!');
      return;
    }
    const playerWhoseChanceIs=playersWithBoard[numbersCalled.length%playersWithBoard.length][0];
    if(playerWhoseChanceIs!==localStorage.getItem('u-username')){
      window.alert('Its not your chance!!');
      return;
    }
    if(numbersCalled.includes(num)){
      window.alert('Number already clicked!!');
      return;
    }
    
    if(roomId!="singlePlayer"){
      console.log('frontend se bhejra');
      socket.emit('bingo_sendNumberClicked',num);
    }
    setNumbersCalled([num,...numbersCalled]);
    document.querySelector('.bingo_infoBoxContainer').scrollTo(0,0);
    console.log('push krdia '+num+' number!!');
  }
  // const styleWhenClicked={
  //   boxShadow:'rgba(50, 50, 93, 0.35) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset',
  //   cursor:'not-allowed'
  // };
  const styleWhenClicked={
    boxShadow:'0px 15px 45px -12px rgba(77, 5, 5, 0.8) inset, 0px 15px 45px -12px rgba(77, 5, 5, 0.8)inset',
    cursor:'not-allowed'
  };
  return (
    <div className='bingoCell' onMouseEnter={handleMouseIn} onClick={handleClickCell} id={`bingoCellWithNo_${num}`} style={numbersCalled.includes(board[rowNo][colNo])?styleWhenClicked:{}}>
        {board[rowNo][colNo]}
    </div>
  )
}

export default BingoCell
