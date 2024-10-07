import axios from 'axios';

const modeOfGame={
    "bingo":["Single Player","Multiplayer"],
    "dotAndBoxes":["Single Player- Easy","Single Player- Medium","Single Player- Hard","Multiplayer"],
    "minesweeper":["SinglePlayer"],
    "sudoku":["Beginner","Easy","Medium","Hard"],
    "ticTacToe":["Single Player- Easy","Single Player- Medium","Single Player- Hard","Multiplayer"]
}
const displayNameOfGame={
    "bingo":"Bingo",
    "dotAndBoxes":"Dot And Boxes",
    "minesweeper":"Minesweeper",
    "sudoku":"Sudoku",
    "ticTacToe":"Tic Tac Toe"
}
const leaderboardHeaders=["Rank","Username","Wins","Win%"];
const getWinPercentage=(wins,totalGamesPlayed)=>{
    if(wins===0){
        return 0;
    }
    return (wins/totalGamesPlayed*100).toFixed(2);
}
const fetchLeaderBoard=async(backendLink,game,sortAccTo,index)=>{
    try{
        const apiLink=`${backendLink}/leaderboard`;
        const payload={
            game:game,
            sortAccTo:sortAccTo,
            index:index
        }
        const res=await axios.post(apiLink,payload);
        return res.data;
    }catch(e){
        console.log('error while fetching leaderboard');
        console.log(e);
    }
}
export{
    modeOfGame,
    displayNameOfGame,
    leaderboardHeaders,
    fetchLeaderBoard,
    getWinPercentage,
}