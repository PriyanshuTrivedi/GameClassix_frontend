import React, { useContext, useEffect, useState } from 'react';
import { setInitiallyVisibilityHidden, showCompleteLinesAndReturnIfGameFinished, fetchBoard, changeStyleForClickedBox, updateStats, totalVisibleLines, compOptimalChance } from './Bingo_helper_funcs';
import { contextData } from '../../AllStates';
import './Bingo.css';
import Player from './Player';
import BingoInfo from './BingoInfo';
import BingoBoard from './BingoBoard';
import Bingo_results_page from './Bingo_results_page';
import { useParams,useNavigate } from 'react-router-dom';
import { checkIfRoomExistsAndGameNotStarted } from '../Home/GameCard/GameCard_helper_func';
import QuitBtn from '../QuitBtn/QuitBtn';

const Bingo = () => {
    const context = useContext(contextData);
    const { backendLink, isMultiplayer, socket, user ,setIsMultiplayer} = context;
    const [board, setBoard] = useState(null);
    const [compBoard, setCompBoard] = useState(null);
    const [numbersCalled, setNumbersCalled] = useState([]);
    const [playersWithBoard,setPlayersWithBoard]=useState([]);
    const [gameFinished,setGameFinished]=useState(false);
    const [globalGameEnded,setGlobalGameEnded]=useState(false);
    const [updatedStats,setUpdatedStats]=useState(false);

    const {roomId}=useParams();
    const navigate=useNavigate();

    useEffect(()=>{
        async function handleInitially(){
            const res=await checkIfRoomExistsAndGameNotStarted(backendLink,roomId,"bingo");
            console.log(res);
            if(res.canJoin===false){
                window.alert(res.message);
                navigate('/');
            }
        }
        if(roomId!=="singlePlayer"){
            handleInitially();
        }
        if(localStorage.getItem('u-id')===null){
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
            const callNumber = (num) => {
                num = Number(num);
                if(numbersCalled.includes(num)){
                    return;
                }
                setNumbersCalled([num,...numbersCalled]);
                document.querySelector('.bingo_infoBoxContainer').scrollTo(0,0);
            };
            socket.on('bingo_receiveNumberClicked', callNumber);
            return () => {
                socket.off('bingo_receiveNumberClicked', callNumber);
            };
        }
    }, [socket,numbersCalled]);

    useEffect(() => {
        if(roomId!="singlePlayer"){
            const addPlayers = (playrs) => {
                playrs = JSON.parse(playrs);
                console.log(playrs);
                setPlayersWithBoard(playrs);
            };
            socket.on('roomPlayers_updated', addPlayers);
            return () => {
                socket.off('roomPlayers_updated', addPlayers);
            };
        }
    }, [socket]);
    
    useEffect(() => {
        const initialFillBoard = async () => {
            const randomBoardForUser = await fetchBoard(backendLink);
            setBoard(randomBoardForUser);
            if(roomId!="singlePlayer"){
                const obj = { room: roomId, game:"bingo", username: localStorage.getItem('u-username'), board: randomBoardForUser };
                socket.emit('join_room', JSON.stringify(obj));
                // console.log('console for joining from frontend');
            }else{
                const randomBoardForComputer = await fetchBoard(backendLink);
                setCompBoard(randomBoardForComputer);
                setPlayersWithBoard([[localStorage.getItem('u-username'),randomBoardForUser],["Computer",randomBoardForComputer]]);
            }
        };
        initialFillBoard();
    }, []);

    useEffect(()=>{
        if(gameFinished){
            console.log('mera to game khtm')
            if(!updatedStats && board){
                updateStats(backendLink,roomId!="singlePlayer",totalVisibleLines(board,numbersCalled)>=5,localStorage.getItem('u-email'));
                setUpdatedStats(true);
            }
            if(roomId!="singlePlayer"){
                console.log('backend ko btao game finish hogya')
                socket.emit('game_finished');
            }
            setGlobalGameEnded(true);
        }
    },[gameFinished,setGameFinished,setGlobalGameEnded]);

    useEffect(()=>{
        if(roomId!="singlePlayer"){
            const informGameEnded=()=>{
                console.log('pta chl gya game end');
                setGlobalGameEnded(true);
                if(!updatedStats && board){
                    updateStats(backendLink,roomId!="singlePlayer",totalVisibleLines(board,numbersCalled)>=5,localStorage.getItem('u-email'));
                    setUpdatedStats(true);
                }
            }
            socket.on('inform_gameHasFinished', informGameEnded);
            return () => {
                socket.off('inform_gameHasFinished', informGameEnded);
            };
        }
    },[socket,updatedStats,board]);

    useEffect(()=>{
        if(roomId!="singlePlayer"){
            const endTheGame=()=>{
                setGlobalGameEnded(true);
            }
            socket.on('player_left',endTheGame);
            return ()=>{
                socket.off('player_left',endTheGame);
            }
        }
    },[socket]);

    useEffect(()=>{
        if(roomId=="singlePlayer"){
            if(compBoard!=null && board!=null){
                async function compTakesTurn(){
                    const res=await compOptimalChance(backendLink,compBoard,numbersCalled);
                    console.log(res);
                    setTimeout(() => {
                        setNumbersCalled([...numbersCalled,compBoard[res.posi][res.posj]]);
                    },1500);
                }
                if(numbersCalled.length%2==1){
                    compTakesTurn();
                }else{
                    if(totalVisibleLines(compBoard,numbersCalled)>=5){
                        setGlobalGameEnded(true);
                        if(!updatedStats && board){
                            updateStats(backendLink,isMultiplayer.bingo,totalVisibleLines(board,numbersCalled)>=5,localStorage.getItem('u-email'));
                            setUpdatedStats(true);
                        }
                    }
                }
            }
        }
    },[numbersCalled,compBoard]);

    useEffect(()=>{
        console.log(playersWithBoard);
    },[setPlayersWithBoard]);

    return (
        <contextData.Provider value={{numbersCalled, setNumbersCalled, socket, backendLink, gameFinished, setGameFinished,playersWithBoard,globalGameEnded,isMultiplayer,roomId}}>
            {
                !globalGameEnded?
                <div className="bingo_page" >
                    <div className="myBoard">
                        {
                            roomId==="singlePlayer"?
                            <></>
                            :
                            <div className="roomIdBoxBingo">
                                Room: {roomId}
                            </div>
                        }
                        <div className="players">
                            {playersWithBoard && playersWithBoard.map((playerWithBoard, index) => (
                                <Player key={index} PlayerName={playerWithBoard[0]} isCurrentPlayer={index===(numbersCalled.length%playersWithBoard.length)}/>
                            ))}
                        </div>
                        {
                            board
                            ?
                            <BingoBoard board={board}/>
                            :
                            <></>
                        }
                    </div>
                    <BingoInfo/>
                </div>
                :
                <Bingo_results_page playersWithBoard={playersWithBoard}/>
            }
        </contextData.Provider>
    );
};

export default Bingo;
