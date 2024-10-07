import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchStats, modeOfGame, displayNameOfGame, fetchPieChartData } from './Profile_helper_func';
import { contextData } from '../../AllStates';
import Pie_Chart from './Pie_Chart';
import './Profile.css';

const Profile = () => {
    const {backendLink}=useContext(contextData);
    const {username}=useParams();
    const navigate=useNavigate();

    const [stats,setStats]=useState(null);
    const [game,setGame]=useState('ticTacToe');
    const [indexOfMode,setIndexOfMode]=useState(0);
    const [pieChartData,setPieChartData]=useState(null);

    useEffect(()=>{
        async function fetchInitially(){
            const res=await fetchStats(backendLink,username);
            console.log(res);
            setStats(res);
        }
        fetchInitially();
    },[]);
    useEffect(()=>{
      if(stats===null){
        return;
      }
      const res=fetchPieChartData(game,stats,indexOfMode);
      console.log(res);
      setPieChartData(res);
    },[stats,game,indexOfMode,setStats,setGame,setIndexOfMode]);

  return (
    <div className='profilePage'>
      <div className="homeBtn"  onClick={()=>navigate('/')}>Home</div>
      <div className="profile">
        <div className="profileRow">
          <div className="profileHeadr">UserName: </div>
          <div className="userName">{username}</div>
        </div>
        <div className="profileRow">
          <div className="profileHeadr">Email: </div>
          <div className="email">{stats && stats.email}</div>
        </div>
      </div>
      <div className="pieChartContainer">
        <div className="profileSelectOptions">
          <select className='profileSelect' value={game} onChange={(e)=>setGame(e.target.value)}>
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
          <select className='profileSelect' value={indexOfMode} onChange={(e)=>setIndexOfMode(e.target.value)}>
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
        </div>
        {
          pieChartData
          ?
          (
            ((game==="minesweeper" && stats[game]["total_games_played"]>0) || (stats[game]["total_games_played"][indexOfMode]>0)) 
            ?
            <Pie_Chart myData={pieChartData}/>
            :
            <div className="notEnoughData">Not Enough Data</div>
          )
          :
          <></>
        }
      </div>
    </div>
  )
}

export default Profile
