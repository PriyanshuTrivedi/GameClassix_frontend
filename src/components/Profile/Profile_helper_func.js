import axios from 'axios';

const pieChartColors={
    "win":"green",
    "loss":"red",
    "tie":"blue",
};
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

const fetchStats=async(backendLink,username)=>{
    try{
        const apiLink=`${backendLink}/auth/profile/${username}`;
        const res=await axios.get(apiLink);
        return res.data;
    }catch(e){
        console.log('Error while fetching stats!');
        console.log(e);
    }
}
const fetchPieChartData=(game,stats,modeIndex)=>{
    if(game==="minesweeper"){
        return [
            { "title": 'Won', "value": stats[game]["total_games_won"], "color": pieChartColors["win"] },
            { "title": 'Lost', "value": stats[game]["total_games_played"]-stats[game]["total_games_won"], "color": pieChartColors["loss"] },
        ];
    }
    const ans=[];
    let colorIndex=0;
    let lostGames=stats[game]["total_games_played"][modeIndex];
    ans.push({ "title": 'Won', "value": stats[game]["total_games_won"][modeIndex], "color": pieChartColors["win"] });
    lostGames-=stats[game]["total_games_won"][modeIndex];
    colorIndex++;
    if(game==='ticTacToe'){
        ans.push({ "title": 'Tie', "value": stats[game]["total_games_tie"][modeIndex], "color": pieChartColors["tie"] });
        lostGames-=stats[game]["total_games_tie"][modeIndex];
        colorIndex++;
    }
    ans.push({ "title": 'Lost', "value": lostGames, "color": pieChartColors["loss"] });
    colorIndex++;
    return ans;
}

export{
    fetchStats,
    fetchPieChartData,
    modeOfGame,
    displayNameOfGame,
}
