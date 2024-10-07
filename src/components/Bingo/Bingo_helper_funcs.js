import axios from "axios";

const n=5;

const setInitiallyVisibilityHidden=()=>{
    const horiLines=document.querySelectorAll('.bingo_horiLine');
    horiLines.forEach(horiLine => {
        horiLine.style.visibility='hidden';
    });
    const vertLines=document.querySelectorAll('.bingo_vertLine');
    vertLines.forEach(vertLine => {
        vertLine.style.visibility='hidden';
    });
    const diagLines=document.querySelectorAll('.diag');
    diagLines.forEach(diag=>{
        diag.style.visibility='hidden';
    });
    const bingoCharSlash=document.querySelectorAll('.bingoCharSlash');
    bingoCharSlash.forEach(slash=>{
        slash.style.visibility='hidden';
    })
}
const fetchBoard=async(backendLink)=>{
    try{
        const apiLink=`${backendLink}/bingo/findRandomBingoBoard`;
        const res=await axios.get(apiLink);
        return res.data.result.board;
    }catch(e){
        console.log(`error while fetching bingo board`);
        console.log(e);
    }
}
const updateStats=async(backendLink,isMultiplayer,won,email)=>{
    try{
        const apiLink=`${backendLink}/bingo/updateStats`;
        const payload={
            email:email,
            isMultiplayer:isMultiplayer,
            result:won
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

const compOptimalChance=async(backendLink,board,numbersCalled)=>{
    try{
        const apiLink=`${backendLink}/bingo/findOptimalMove`;
        const payload={
            board:board,
            numbersCalled:numbersCalled
        }
        const res=await axios.post(apiLink,payload);
        console.log(res.data);
        return res.data.result;
    }catch(e){
        console.log(`error while computer takes chance`);
        console.log(e);
    }
}

const findCompleteHoriLines=(board,numbersCalled)=>{
    console.log(board);
    let i,j;
    let tempArr=[];
    for(i=0;i<n;i++){
        let allPresent=true;
        for(j=0;j<n;j++){
            if(!numbersCalled.includes(board[i][j])){
                allPresent=false;
                break;
            }
        }
        if(allPresent){
            tempArr.push(i);
        }
    }
    return tempArr;
}
const findCompleteVertLines=(board,numbersCalled)=>{
    let i,j;
    let tempArr=[];
    for(j=0;j<n;j++){
        let allPresent=true;
        for(i=0;i<n;i++){
            if(!numbersCalled.includes(board[i][j])){
                allPresent=false;
                break;
            }
        }
        if(allPresent){
            tempArr.push(j);
        }
    }
    return tempArr;
}
const findCompleteDiagLines=(board,numbersCalled)=>{
    let i,j;
    let tempArr=[];
    i=0;j=0;
    let allPresent=true;
    while(i<n){
        if(!numbersCalled.includes(board[i][j])){
            allPresent=false;
            break;
        }
        i++;
        j++;
    }
    if(allPresent){
        tempArr.push(0);
    }
    allPresent=true;
    i=0;j=n-1;
    while(i<n){
        if(!numbersCalled.includes(board[i][j])){
            allPresent=false;
            break;
        }
        i++;
        j--;
    }
    if(allPresent){
        tempArr.push(1);
    }
    return tempArr;
}

const totalVisibleLines=(board,numbersCalled)=>{
    return findCompleteDiagLines(board,numbersCalled).length+findCompleteHoriLines(board,numbersCalled).length+findCompleteVertLines(board,numbersCalled).length;
}


export{
    setInitiallyVisibilityHidden,
    fetchBoard,
    updateStats,
    compOptimalChance,
    findCompleteDiagLines,
    findCompleteHoriLines,
    findCompleteVertLines,
    totalVisibleLines,
}