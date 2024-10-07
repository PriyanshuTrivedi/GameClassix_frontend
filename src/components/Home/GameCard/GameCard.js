import React, { useContext, useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import './GameCard.css'
import ToggleBtn from './ToggleBtn/ToggleBtn'
import { contextData } from '../../../AllStates'
import OTPInput from './OTPInput/OTPInput'
import { useNavigate } from 'react-router-dom';
import {createRandomRoomId,checkIfRoomExistsAndGameNotStarted} from './GameCard_helper_func'

const GameCard = ({gameImg,gameName,isMultiplayerGame}) => {
  const context=useContext(contextData);
  const game=gameImg.split('.')[0];
  const {isMultiplayer,setIsMultiplayer,diff,setDiff,sizeOfMatrix,setSizeOfMatrix,backendLink}=context;
  const [currDiff,setCurrDiff]=useState(diff[game]);
  const [currSize,setCurrSize]=useState(sizeOfMatrix[game]);
  const [canInputRoomId,setCanInputRoomId]=useState(false);
  const [isJoiningRoom,setIsJoiningRoom]=useState(false);
  const [currRoom, setCurrRoom] = useState('');
  const navigate=useNavigate();

  useEffect(()=>{
    setIsMultiplayer({
      dotAndBoxes:false,
      ticTacToe:false,
      bingo:false
    });
  },[]);
  const updateDiff=(newValue)=>{
    const tempObj={...context.diff};
    tempObj[game]=newValue;
    setDiff(tempObj);
    setCurrDiff(newValue);
  }
  const updateSize=(newValue)=>{
    const tempObj={...context.sizeOfMatrix};
    tempObj[game]=newValue;
    setSizeOfMatrix(tempObj);
    setCurrSize(newValue);
  }
  const showRoomIdInputAndHandleClick=async()=>{
    setCanInputRoomId(true);
    setIsJoiningRoom(true);
    if(isJoiningRoom===true){
      // check if currRoom exists 
      const res=await checkIfRoomExistsAndGameNotStarted(backendLink,currRoom,game);
      if(res.canJoin===true){
        // setRoom(currRoom);
        if(game==='dotAndBoxes'){
          navigate(`/${game}/${currSize}/${currRoom}`);
        }else{
          navigate(`/${game}/${currRoom}`);
        }
      }else{
        window.alert(res.message);
      }
    }
  }
  const handleGenRandomRoom=async()=>{
    const roomKey=await createRandomRoomId(backendLink);
    // setRoom(roomKey);
    if(game==='dotAndBoxes'){
      navigate(`/${game}/${currSize}/${roomKey}`);
    }else{
      navigate(`/${game}/${roomKey}`);
    }
    // navigate(`/${game}/${roomKey}`);
  }
  const handleRoomChange = (otpValue) => {
    setCurrRoom(otpValue);
  };
  useEffect(()=>{
    if(isMultiplayerGame && !isMultiplayer[game]){
      setCanInputRoomId(false);
      setIsJoiningRoom(false);
    }
  },[isMultiplayer]);
  return (
    <div className='gameCard' >
        <div className="gameName">{gameName}</div>
        <div className="gameImg">
            <img src={require(`../../../images/${gameImg}`)} alt={gameImg}/>
        </div>
        <div className="gameInfo">
            {
              isMultiplayerGame?
              <div className="multiplayerBtn">
                <div className="singlePlayerSide">Single Player</div>
                <ToggleBtn game={game}/>
                <div className="multiPlayerSide">Multi Player</div>
              </div>
              :
              <div className='multiplayerBtn'>Single Player</div>
            }
            {
              game==="dotAndBoxes" && isMultiplayer[game]
              ?
              <div className="sizeMatDiv">
                <div className="sizeHeader">Size of Matrix:</div>
                <select className="inptFieldHome" value={currSize} onChange={(e) => updateSize(e.target.value)}>
                  <option value="5">5X5 matrix</option>
                  <option value="6">6X6 matrix</option>
                  <option value="7">7X7 matrix</option>
                </select>
              </div>
              :
              <></>
            }
            {
              isMultiplayer[game]?
              <div className="roomMultiplayer">
                {
                  canInputRoomId===true?
                  <OTPInput length={5} onChangeOTP={handleRoomChange}/>
                  :
                  <></>
                }
                <div className="roomBtnsContainer">
                  <div className="enterRoomId roomBtns " onClick={showRoomIdInputAndHandleClick}>{isJoiningRoom===true?"Join Room":"Enter Room Id"}</div>
                  {
                    canInputRoomId===false?
                    <div className="createOrJoinRoom roomBtns " onClick={handleGenRandomRoom}>Create Room</div>
                    :
                    <></>
                  }
                  
                </div>
              </div>
              :
              <div className="vsCompDiv">
                {
                  diff[game]?
                  <div className="diffDiv">
                    <div className="diffHeader">Difficulty:</div>
                    <select className="inptFieldHome" value={currDiff} onChange={(e) => updateDiff(e.target.value)}>
                      {
                        game==="sudoku"?
                        <option value="beginner">Beginner</option>
                        :
                        <></>
                      }
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                  :
                  <></>
                }
                {
                  sizeOfMatrix[game]?
                  <div className="sizeMatDiv">
                    <div className="sizeHeader">Size of Matrix:</div>
                    <select className="inptFieldHome" value={currSize} onChange={(e) => updateSize(e.target.value)}>
                      {
                        game==='dotAndBoxes'?
                        <>
                          <option value="5">5X5 matrix</option>
                          <option value="7">7X7 matrix</option>
                          <option value="9">9X9 matrix</option>
                        </>
                        :
                        <>
                          <option value="7">7X7 matrix</option>
                          <option value="10">10X10 matrix</option>
                          <option value="15">15X15 matrix</option>
                        </>
                      }
                    </select>
                  </div>
                  :
                  <></>
                }
                <Link className="links" to={isMultiplayerGame?`/${game}/${game==='dotAndBoxes'?currSize+'/':''}singlePlayer`:`/${game}`}>
                  <div className="playBtn roomBtns ">PLAY</div>
                </Link>
              </div>
            }
        </div>
        
    </div>
  )
}

export default GameCard
