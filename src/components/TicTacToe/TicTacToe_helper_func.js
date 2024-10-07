import axios from "axios";


const updateStats=async(backendLink,isMultiplayer,result,email,diff)=>{
    try{
        const apiLink=`${backendLink}/ticTacToe/updateStats`;
        const payload={
            email:email,
            isMultiplayer:isMultiplayer,
            result:result,
            difficulty:diff
        }
        const res=await axios.put(apiLink,payload,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('u-token')}`
            }
        });
        console.log(res.data);
        console.log(`updated successfully`);
    }catch(e){
        console.log(`error while updating stats`);
        console.log(e);
    }
}
const compOptimalChance=async(backendLink,board,diff)=>{
    try{
        const apiLink=`${backendLink}/ticTacToe/findOptimalMove`;
        const payload={
            board:board,
            difficulty:diff
        }
        const res=await axios.post(apiLink,payload);
        console.log(res.data);
        return res.data.result;
    }catch(e){
        console.log(`error while computer takes chance`);
        console.log(e);
    }
}
const returnWinnerIndex=(board,row,col)=>{
    if(board[row][0]!==-1 && board[row][1]===board[row][0] && board[row][2]===board[row][0]){
        return board[row][0];
    }
    if(board[0][col]!==-1 && board[1][col]===board[0][col] && board[2][col]===board[0][col]){
        return board[0][col];
    }
    if(board[0][0]!==-1 && board[0][0]===board[1][1] && board[0][0]===board[2][2]){
        return board[0][0];
    }
    if(board[0][2]!==-1 && board[0][2]===board[1][1] && board[0][2]===board[2][0]){
        return board[0][2];
    }
    return -1;
}

export{
    updateStats,
    compOptimalChance,
    returnWinnerIndex,
}