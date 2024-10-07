import React, { createContext } from 'react'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Sudoku from './components/Sudoku/Sudoku';
import DotAndBoxes from './components/DotAndBoxes/DotAndBoxes';
import TicTacToe from './components/TicTacToe/TicTacToe';
import Bingo from './components/Bingo/Bingo';
import Home from './components/Home/Home';
import AllStates from './AllStates';
import SignInLogIn from './components/SignInLogIn/SignInLogIn'
import About from './components/About/About';
import Leaderboard from './components/Leaderboard/Leaderboard';
import Minesweeper from './components/Minesweeper/Minesweeper';
import Profile from './components/Profile/Profile';

function App() {
  return (
    <AllStates>
      // <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/users/:username'element={<Profile/>} />
          <Route path='/signup_login' element={<SignInLogIn/>}/>
          <Route path='/About' element={<About/>}/>
          <Route path='/sudoku' element={<Sudoku/>}/>
          <Route path='/ticTacToe/:roomId' element={<TicTacToe/>}/>
          <Route path='/dotAndBoxes/:size/:roomId' element={<DotAndBoxes/>}/>
          <Route path='/bingo/:roomId' element={<Bingo/>}/>
          <Route path='/minesweeper' element={<Minesweeper/>} />
          <Route path='/Leaderboard' element={<Leaderboard/>}/>
        </Routes>
      // </Router>
    </AllStates>
  );
}

export default App;
