// // About.js

// import React from 'react';
// import './About.css';

// const About = () => {
//   return (
//     <div className='aboutPageContainer'>
//       <h1>About</h1>
//       <div className="aboutPage">
//         <h2>About the Games</h2>
//         <p>
//           Welcome to the BoardLogic Trio! Our application brings you three exciting single-player games: Dot and Boxes, Doxes, and Tic Tac Toe. Immerse yourself in these classic challenges and compete against the computer to test your skills and strategy.
//         </p>

//         <h3>Game Rules</h3>
//         <div className='gameRules'>
//           <h4>Dot and Boxes</h4>
//           <p>
//             Dot and Boxes is a traditional pen-and-paper game where players take turns connecting dots to form boxes. The player who completes the most boxes at the end of the game is declared the winner. It's not just about connecting dots; it's about outsmarting your opponent and claiming territory on the grid. Be strategic, anticipate your opponent's moves, and block their paths to secure victory.
//           </p>

//           <h4>Sudoku</h4>
//           <p>
//             Sudoku is a classic number-placement puzzle game. The objective is to fill a 9x9 grid with digits so that each column, each row, and each of the nine 3x3 subgrids contain all of the digits from 1 to 9. It's a game of logic and deduction where players use their problem-solving skills to complete the grid. Challenge yourself with different difficulty levels and become a Sudoku master!
//           </p>

//           <h4>Tic Tac Toe</h4>
//           <p>
//             Tic Tac Toe, a timeless classic, pits you against the computer in a battle of Xs and Os. Take turns marking spaces in a 3x3 grid, aiming to align three of your marks in a row, column, or diagonal. Outsmart the computer by predicting its moves and blocking its attempts to achieve victory. It's a game of strategy and foresight, where each move brings you closer to triumph or defeat. Can you outplay the computer and become the Tic Tac Toe master?
//           </p>
//         </div>

//         <h2>About the Application</h2>
//         <p>
//           The BoardLogic Trio is more than just a collection of games; it's an immersive experience designed for players seeking entertainment and challenge. Our application provides a user-friendly interface for you to enjoy these classic games at your own pace. Keep track of your wins, challenge yourself with different difficulty levels, and embark on a journey of skill improvement. The BoardLogic Trio is your go-to destination for single-player gaming fun!
//         </p>

//         <h2>About the Developer</h2>
//         <p>
//           Hi, I'm Priyanshu, the passionate developer behind the BoardLogic Trio. With a love for creating engaging applications, I set out to bring the joy of classic games to your fingertips. The BoardLogic Trio is a testament to my commitment to providing users with a seamless and enjoyable gaming experience. Your feedback is valuable, so feel free to reach out and share your thoughts. You can connect with me on linkedIn, here's link to my profile <a href='https://www.linkedin.com/in/priyanshu-trivedi-517250211/' target='blank' id='linkedLink'>Priyanshu Trivedi</a> . Thank you for being a part of the BoardLogic Trio community!
//         </p>
//       </div>
//     </div>
//   );
// };

// export default About;

// About.js

import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className='aboutPageContainer'>
      <h1>About</h1>
      <div className="aboutPage">
        <h2>About the Games</h2>
        <p>
          Welcome to Game Classix! Our application brings you five exciting games, offering both single-player and multiplayer experiences. Test your skills and strategy with Tic Tac Toe, Bingo, Dot and Boxes (play against the computer or real players), Sudoku, and Minesweeper.
        </p>

        <h3>Game Rules</h3>
        <div className='gameRules'>
          <h4>Tic Tac Toe</h4>
          <p>
            Tic Tac Toe is a timeless classic where you face off against the computer or real players in a game of Xs and Os. The objective is to align three of your marks in a row, column, or diagonal. Predict your opponent's moves and block their attempts to win!
          </p>

          <h4>Bingo</h4>
          <p>
            Bingo is a fun and fast-paced game where you match numbers on a 5x5 grid. In multiplayer mode, you can compete with real players or challenge the computer. Mark your numbers quickly, form rows, and call "Bingo!" before your opponents to claim victory.
          </p>

          <h4>Dot and Boxes</h4>
          <p>
            In Dot and Boxes, you can play against the computer or challenge real players. Take turns connecting dots to form boxes on the grid. The player who forms the most boxes wins. Be strategic and anticipate your opponent's moves to dominate the board!
          </p>

          <h4>Sudoku</h4>
          <p>
            Sudoku is a classic number puzzle. The objective is to fill a 9x9 grid so that each row, column, and 3x3 subgrid contain all digits from 1 to 9. Challenge yourself with different difficulty levels and sharpen your problem-solving skills.
          </p>

          <h4>Minesweeper</h4>
          <p>
            Minesweeper is a game of logic where the goal is to clear a grid without detonating hidden mines. Use numbers to deduce the location of mines and safely uncover all the safe squares to win. Keep your mind sharp and enjoy this classic challenge.
          </p>
        </div>

        <h2>About the Application</h2>
        <p>
          Game Classix offers a range of classic games with a modern twist. Whether you're playing solo or with others, our user-friendly interface ensures an enjoyable experience. Track your wins, challenge yourself with different game modes, and have fun improving your skills.
        </p>

        <h2>About the Developer</h2>
        <p>
          Hi, I'm Priyanshu, the developer behind Game Classix. My passion for creating engaging applications has driven me to bring these timeless games to life. Your feedback is important to me, so feel free to reach out and share your thoughts. Connect with me on LinkedIn: <a href='https://www.linkedin.com/in/priyanshu-trivedi-517250211/' target='_blank' id='linkedLink'>Priyanshu Trivedi</a>. Thank you for being a part of the Game Classix community!
        </p>
      </div>
    </div>
  );
};

export default About;

