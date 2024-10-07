import React, { useContext, useEffect, useState } from 'react'
import {contextData} from '../../AllStates';
import './Leaderboard.css'
import { displayNameOfGame, fetchLeaderBoard, getWinPercentage, leaderboardHeaders, modeOfGame } from './Leaderboard_helper_func';

const Leaderboard = () => {
    const {backendLink}=useContext(contextData);
    const [game,setGame]=useState('ticTacToe');
    const [sortAccTo,setSortAccTo]=useState('wins');
    const [indexOfMode,setIndexOfMode]=useState(0);
    const [leaderboard,setLeaderboard]=useState([]);
    useEffect(()=>{
        async function fetchLeaderboard(){
            const res=await fetchLeaderBoard(backendLink,game,sortAccTo,indexOfMode);
            setLeaderboard(res);
            console.log(res);
        }
        fetchLeaderboard();
    },[game,sortAccTo,indexOfMode,setGame,setSortAccTo,setIndexOfMode]);
  return (
    <div className='leaderBoardPage'>
        <div className='headr'>LeaderBoard</div>
        <div className="leaderboardBox">
          <div className="leaderboardSelectOptionsContainer">
            <div className='leaderboardSelectOptions'>
              <div className='leaderboardSelectHeaders'>Game:</div>
              <div className='leaderboardSelectHeaders'>Mode:</div>
              <div className='leaderboardSelectHeaders'>Rank By:</div>
            </div>
            <div className="leaderboardSelectOptions">
              <select className='leaderboardSelect' value={game} onChange={(e)=>setGame(e.target.value)}>
                {
                  Object.entries(modeOfGame).map(([gameName,modes])=>{
                    return (
                      <option value={gameName}>
                        {displayNameOfGame[gameName]}
                      </option>
                    )
                  })
                }
              </select>
              <select className='leaderboardSelect' value={indexOfMode} onChange={(e)=>setIndexOfMode(e.target.value)}>
                {
                  modeOfGame[game].map((el,idx)=>{
                    return (
                      <option value={idx}>
                        {el}
                      </option>
                    )
                  })
                }
              </select>
              <select className='leaderboardSelect' value={sortAccTo} onChange={(e)=>setSortAccTo(e.target.value)}>
                <option value="wins">Wins</option>
                <option value="winPercentage">Win Percentage</option>
              </select>
            </div>
          </div>
          <div className="leaderboard">
            <div className="leaderboardHeaders">
              {
                leaderboardHeaders.map((el,index)=>{
                  return (
                    <div className="leaderboardHeadr">{el}</div>
                  )
                })
              }
            </div>
            <div className="lplayers">
              {
                leaderboard.map((el,index)=>{
                  return(
                    <div className="playerRow">
                      <div className="playerRank playerEntries">{index+1}</div>
                      <div className="playername playerEntries">{el.username}</div>
                      <div className="playerWins playerEntries">
                        {game==='minesweeper'?el.total_games_won:el.total_games_won[indexOfMode]}
                      </div>
                      <div className="playerWinPercentage playerEntries">
                        {getWinPercentage(game==='minesweeper'?el.total_games_won:el.total_games_won[indexOfMode],game==='minesweeper'?el.total_games_played:el.total_games_played[indexOfMode])}
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
    </div>
  )
}

export default Leaderboard