import React, { useState } from 'react'
import GameCard from './GameCard/GameCard';
import Navbar from '../Navbar/Navbar'
import './Home.css'
import arrow_left from './arrow_left.png';
import arrow_right from './arrow_right.png';

const Home = () => {
  const totalGames=5;
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = (direction) => {
    let cardWidth=22;
    let numberOfGamesToShow=3;
    console.log(window.innerWidth);
    if(window.innerWidth>1240){
      numberOfGamesToShow=3;
    }else if(window.innerWidth>920){
      numberOfGamesToShow=2;
    }else{
      numberOfGamesToShow=1;
      if(window.innerWidth<=600){
        cardWidth=17;
      }
    }
    const remInPixels = cardWidth * parseFloat(getComputedStyle(document.documentElement).fontSize);
    const maxPosition = (totalGames-numberOfGamesToShow)*cardWidth * parseFloat(getComputedStyle(document.documentElement).fontSize);
    console.log(maxPosition);
    const newScrollPosition = (direction === 'next')?Math.min(scrollPosition+remInPixels,maxPosition):Math.max(scrollPosition - remInPixels, 0);
    const scrollableElement = document.getElementById('style-2');
    if (scrollableElement) {
      scrollableElement.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
    setScrollPosition(newScrollPosition);
  };
  return (
    <div className="homePage">
      <Navbar/>
      <div className="gameCardsContainer">
        <div className="prevBtn prev_next_Btns" onClick={()=>handleScroll('prev')}>
          <img src={arrow_left} alt="arrowLeft" className='btnImg'/>
        </div>
        <div className='gameCards' id='style-2'>
          <GameCard gameImg={'sudoku.png'} gameName={'Sudoku'} isMultiplayerGame={false}/>
          <GameCard gameImg={'ticTacToe.png'} gameName={'Tic Tac Toe'} isMultiplayerGame={true}/>
          <GameCard gameImg={'dotAndBoxes.jpg'} gameName={'Dot And Boxes'} isMultiplayerGame={true}/>
          <GameCard gameImg={'bingo.jpg'} gameName={'Bingo'} isMultiplayerGame={true}/>
          <GameCard gameImg={'minesweeper.png'} gameName={'Minesweeper'} isMultiplayerGame={false}/>
        </div>
        <div className="nextBtn prev_next_Btns" onClick={()=>handleScroll('next')}>
          <img src={arrow_right} alt="arrowRight" className='btnImg'/>
        </div>
      </div>
    </div>
  )
}

export default Home

