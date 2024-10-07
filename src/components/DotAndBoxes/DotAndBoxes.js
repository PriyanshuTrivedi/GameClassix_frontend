import React, { useContext, useEffect, useState } from 'react'
import './DotAndBoxes.css'
import { contextData } from '../../AllStates'
import MainGrid from './MainGrid'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom'
import { initialize2DArr,playerColors,copy2dArr,check_left_right_for_vertLine,check_up_down_for_horiLine, updateStatesForHoriLine, updateStatesForVertLine,setBoxAndDotSize, updateStats, checkIfWon, compTakesChance } from './DotAndBoxes_helper_func'
import { checkIfRoomExistsAndGameNotStarted } from '../Home/GameCard/GameCard_helper_func'
import Player from '../Bingo/Player'

const DotAndBoxes = () => {
    const {sizeOfMatrix,setSizeOfMatrix,backendLink,diff,socket}=useContext(contextData);

    const navigate=useNavigate();
    const {size,roomId}=useParams();

    const n=size;
    // const n=3;

    const [horiLineMatrix,setHoriLineMatrix]=useState(initialize2DArr((Number)(n)+1,n,-1));
    const [vertLineMatrix,setVertLineMatrix]=useState(initialize2DArr(n,(Number)(n)+1,-1));
    const [boxCol,setBoxCol]=useState(initialize2DArr(n,n,-1));
    const [players,setPlayers]=useState([]);
    const [indexOfPlayerWhoHasChance,setIndexOfPlayerWhoHasChance]=useState(0);
    const [playersScore,setPlayersScore]=useState([]);
    const [boxesFilled,setBoxesFilled]=useState(0);
    const [linesCalledWithPlayerColor,setLinesCalledWithPlayerColor]=useState([]);
    const [compIsTakingChance,setCompIsTakingChance]=useState(false);

    

    useEffect(()=>{
        async function handleInitially(){
            const res=await checkIfRoomExistsAndGameNotStarted(backendLink,roomId,"dotAndBoxes");
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

    useEffect(()=>{
        if(roomId!=='singlePlayer'){
            const handleConnectLine=(data)=>{
                console.log(data);
                const tempArr=data.split('_');
                const row=Number(tempArr[1]);
                const col=Number(tempArr[2]);
                if(tempArr[0]=='0'){
                    updateStatesForHoriLine(row,col,horiLineMatrix,vertLineMatrix,boxCol,indexOfPlayerWhoHasChance,setHoriLineMatrix,setBoxCol,setIndexOfPlayerWhoHasChance,players.length,playersScore,setPlayersScore,boxesFilled,setBoxesFilled,false);
                }else{
                    updateStatesForVertLine(row,col,horiLineMatrix,vertLineMatrix,boxCol,indexOfPlayerWhoHasChance,setVertLineMatrix,setBoxCol,setIndexOfPlayerWhoHasChance,players.length,playersScore,setPlayersScore,boxesFilled,setBoxesFilled,false);
                }
            }
            socket.on("dotAndBoxes_receiveLineClicked",handleConnectLine);
            return ()=>{
                socket.off("dotAndBoxes_receiveLineClicked",handleConnectLine);
            }
        }
    },[socket,players,horiLineMatrix,vertLineMatrix,boxCol,indexOfPlayerWhoHasChance,setHoriLineMatrix,setVertLineMatrix,setBoxCol,setIndexOfPlayerWhoHasChance,,playersScore,setPlayersScore,boxesFilled,setBoxesFilled]);

    useEffect(()=>{
        if(roomId!=='singlePlayer'){
            const addPlayers=(data)=>{
                data=JSON.parse(data);
                console.log(data);
                setPlayers(data);
                setPlayersScore(Array(data.length).fill(0));
            }
            socket.on("roomPlayers_updated",addPlayers);
            return ()=>{
                socket.off("roomPlayers_updated",addPlayers);
            }
        }
    },[socket,playersScore,setPlayersScore]);

    useEffect(() => {
        if(roomId!="singlePlayer"){
            const obj = { room: roomId, game:"dotAndBoxes", username: localStorage.getItem('u-username')};
            socket.emit('join_room', JSON.stringify(obj));
        }else{
            setPlayers([localStorage.getItem('u-username'),"computer"]);
            setPlayersScore(Array(2).fill(0));
        }
        setBoxAndDotSize(n);
    }, []);


    useEffect(()=>{
        const handleGameFinished=async()=>{
            const won=checkIfWon(players,playersScore);
            await updateStats(backendLink,localStorage.getItem('u-email'),roomId!=='singlePlayer',won,diff['dotAndBoxes']);
            if(won===true){
                window.alert("congrats you have won the game!");
            }else{
                window.alert("oops, you have lost the game!");
            }
        }
        if(boxesFilled===n*n){
            console.log("game finished");
            handleGameFinished();
        }
    },[boxesFilled,setBoxesFilled]);

    useEffect(()=>{
        if(roomId==="singlePlayer" && indexOfPlayerWhoHasChance===1 && compIsTakingChance===false && boxesFilled<n*n){
            const CompTakesTurn=async()=>{
                setCompIsTakingChance(true);
                const linesDrawnInOrderWithGain=await compTakesChance(backendLink,horiLineMatrix,vertLineMatrix,diff['dotAndBoxes']);
                const linesDrawnInOrder=linesDrawnInOrderWithGain.optimalChancesTakenInSequence;
                const tempHoriLineMatrix=copy2dArr(horiLineMatrix);
                const tempVertLineMatrix=copy2dArr(vertLineMatrix);
                const tempBoxCol=copy2dArr(boxCol);
                for(let i=0;i<linesDrawnInOrder.length;i++){
                    setTimeout(()=>{
                        let row,col,isHoriLine;
                        isHoriLine=linesDrawnInOrder[i][0];
                        row=linesDrawnInOrder[i][1];
                        col=linesDrawnInOrder[i][2];
                        if(isHoriLine===1){
                            updateStatesForHoriLine(row,col,tempHoriLineMatrix,tempVertLineMatrix,tempBoxCol,indexOfPlayerWhoHasChance,setHoriLineMatrix,setBoxCol,setIndexOfPlayerWhoHasChance,players.length,playersScore,setPlayersScore,boxesFilled,setBoxesFilled,true);
                        }else{
                            updateStatesForVertLine(row,col,tempHoriLineMatrix,tempVertLineMatrix,tempBoxCol,indexOfPlayerWhoHasChance,setVertLineMatrix,setBoxCol,setIndexOfPlayerWhoHasChance,players.length,playersScore,setPlayersScore,boxesFilled,setBoxesFilled,true);
                        }
                    },400*(i+1));
                }
                setTimeout(()=>{
                    setCompIsTakingChance(false);
                },400*(linesDrawnInOrder.length));
            }
            CompTakesTurn();
        }
    },[players,horiLineMatrix,vertLineMatrix,boxCol,indexOfPlayerWhoHasChance,setHoriLineMatrix,setVertLineMatrix,setBoxCol,setIndexOfPlayerWhoHasChance,,playersScore,setPlayersScore,boxesFilled,setBoxesFilled,compIsTakingChance,setCompIsTakingChance]);

    useEffect(()=>{
        if(roomId!="singlePlayer"){
          const endTheGame=()=>{
            window.alert("One of the player has left the game!");
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
    
    return(
        <contextData.Provider value={{backendLink,linesCalledWithPlayerColor,setLinesCalledWithPlayerColor,horiLineMatrix,setHoriLineMatrix,vertLineMatrix,setVertLineMatrix,n,boxCol,setBoxCol,socket,players,indexOfPlayerWhoHasChance,setIndexOfPlayerWhoHasChance,playersScore,setPlayersScore,boxesFilled,setBoxesFilled}}>
            <div className="dotAndBoxes_page">
                <div className="myBoard">
                    <div className='roomIdBoxDotAndBoxes'>{roomId}</div>
                    <div className='roomPlayersContainer'>
                        {
                            players.map((el,index)=>{
                                return  (
                                    <div className='dotAndBoxes_playerBox'>
                                        <div className="playerColorBox" style={{backgroundColor:playerColors[index]}}>
                                            {playersScore[index]}
                                        </div>
                                        <Player key={index} PlayerName={el} isCurrentPlayer={index===indexOfPlayerWhoHasChance}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <MainGrid/>
                </div>
            </div>
        </contextData.Provider>
    )
}
export default DotAndBoxes