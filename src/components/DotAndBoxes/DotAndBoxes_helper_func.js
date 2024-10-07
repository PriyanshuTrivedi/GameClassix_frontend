import axios from 'axios';

const playerColors=["#4848ffb0","#f9f968bd","#ff1717ad","#74ff5bb0"];

const initialize2DArr=(size1,size2,initialVal)=>{
    let ans=[];
    let i,j;
    for(i=0;i<size1;i++){
        let tempArr=[];
        for(j=0;j<size2;j++){
            tempArr.push(initialVal);
        }
        ans.push(tempArr);
    }
    return ans;
}
const copy2dArr=(arr)=>{
    const ans=[];
    let i,j;
    for(i=0;i<arr.length;i++){
        let tempArr=[];
        for(j=0;j<arr[i].length;j++){
            tempArr.push(arr[i][j]);
        }
        ans.push(tempArr);
    }
    return ans;
}

const check_up_down_for_horiLine=(i,j,horiLineMatrix,vertLineMatrix)=>{
    const ans=[];
    // check above 
    if(i-1>=0 && horiLineMatrix[i-1][j]>-1 && vertLineMatrix[i-1][j]>-1 && vertLineMatrix[i-1][j+1]>-1){
        ans.push([i-1,j]);
    }
    // check below 
    if(i+1<horiLineMatrix.length && horiLineMatrix[i+1][j]>-1 && vertLineMatrix[i][j]>-1 && vertLineMatrix[i][j+1]>-1){
        ans.push([i,j]);
    }
    return ans;
}

const check_left_right_for_vertLine=(i,j,horiLineMatrix,vertLineMatrix)=>{
    const ans=[];
    // check left
    if(j-1>=0 && vertLineMatrix[i][j-1]>-1 && horiLineMatrix[i][j-1]>-1 && horiLineMatrix[i+1][j-1]>-1){
        ans.push([i,j-1]);
    }
    // check right
    if(j+1<vertLineMatrix[0].length && vertLineMatrix[i][j+1]>-1 && horiLineMatrix[i][j]>-1 && horiLineMatrix[i+1][j]>-1){
        ans.push([i,j]);
    }
    return ans;
}

const updateStatesForHoriLine=(row,col,horiLineMatrix,vertLineMatrix,boxCol,indexOfPlayerWhoHasChance,setHoriLineMatrix,setBoxCol,setIndexOfPlayerWhoHasChance,numberOfPlayers,playersScore,setPlayersScore,boxesFilled,setBoxesFilled,isCompChance)=>{
    // updating horiLineMatrix 
    let tempHoriLineMatrix,tempBoxCol;
    if(isCompChance){
        tempHoriLineMatrix=horiLineMatrix;
        tempBoxCol=boxCol;
    }else{
        tempHoriLineMatrix=copy2dArr(horiLineMatrix);
        tempBoxCol=copy2dArr(boxCol);
    }
    tempHoriLineMatrix[row][col]=indexOfPlayerWhoHasChance;
    setHoriLineMatrix(tempHoriLineMatrix);
    // updating affected boxes 
    const boxAffected=check_up_down_for_horiLine(row,col,horiLineMatrix,vertLineMatrix);
    if(boxAffected.length>0){
        boxAffected.forEach((el)=>{
            tempBoxCol[el[0]][el[1]]=indexOfPlayerWhoHasChance;
        });
        setBoxCol(tempBoxCol);
        let tempArr;
        if(isCompChance){
            tempArr=playersScore;
        }else{
            tempArr=[...playersScore];
        }
        tempArr[indexOfPlayerWhoHasChance]+=boxAffected.length;
        setPlayersScore(tempArr);
        setBoxesFilled((num)=>num+boxAffected.length);
    }else{
        setIndexOfPlayerWhoHasChance((num)=>(num+1)%numberOfPlayers);
    }
}

const updateStatesForVertLine=(row,col,horiLineMatrix,vertLineMatrix,boxCol,indexOfPlayerWhoHasChance,setVertLineMatrix,setBoxCol,setIndexOfPlayerWhoHasChance,numberOfPlayers,playersScore,setPlayersScore,boxesFilled,setBoxesFilled,isCompChance)=>{
    // updating vertLineMatrix 
    let tempVertLineMatrix,tempBoxCol;
    if(isCompChance){
        tempVertLineMatrix=vertLineMatrix;
        tempBoxCol=boxCol;
    }else{
        tempVertLineMatrix=copy2dArr(vertLineMatrix);
        tempBoxCol=copy2dArr(boxCol);
    }
    tempVertLineMatrix[row][col]=indexOfPlayerWhoHasChance;
    setVertLineMatrix(tempVertLineMatrix);
    // updating affected boxes 
    const boxAffected=check_left_right_for_vertLine(row,col,horiLineMatrix,vertLineMatrix);
    if(boxAffected.length>0){
        boxAffected.forEach((el)=>{
            tempBoxCol[el[0]][el[1]]=indexOfPlayerWhoHasChance;
        });
        setBoxCol(tempBoxCol);
        let tempArr;
        if(isCompChance){
            tempArr=playersScore;
        }else{
            tempArr=[...playersScore];
        }
        tempArr[indexOfPlayerWhoHasChance]+=boxAffected.length;
        setPlayersScore(tempArr);
        setBoxesFilled((num)=>num+boxAffected.length);
    }else{
        setIndexOfPlayerWhoHasChance((num)=>(num+1)%numberOfPlayers);
    }
}

const updateStats=async(backendLink,email,isMultiplayer,won,difficulty)=>{
    try{
        const apiLink=`${backendLink}/dotAndBoxes/updateStats`;
        const payload={
            email:email,
            isMultiplayer:isMultiplayer,
            result:won
        }
        if(isMultiplayer===false){
            payload['difficulty']=difficulty;
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

const compTakesChance=async(backendLink,horiLineMatrix,vertLineMatrix,difficulty)=>{
    try{
        const apiLink=`${backendLink}/dotAndBoxes/findOptimalMove`;
        const payload={
            horiLineMatrix:horiLineMatrix,
            vertLineMatrix:vertLineMatrix,
            difficulty:difficulty
        }
        const res=await axios.post(apiLink,payload);
        console.log(res.data);
        console.log(`fetched optimal move`);
        return res.data.result;
    }catch(e){
        console.log(`error while finding optimal move`);
        console.log(e);
    }
}

const setBoxAndDotSize=(n)=>{
    const boxSide = `min(65vh, 80vw) / (${n} + 2)`;
    const dotSide = `0.4*${boxSide}`;
    const boardSide= `${boxSide+dotSide}*${n}`;
    document.documentElement.style.setProperty('--boxSide',`calc(${boxSide})`);
    document.documentElement.style.setProperty('--dotSide',`calc(${dotSide})`);
    document.documentElement.style.setProperty('--boardSide',`calc(${boardSide})`);
}

const checkIfWon=(players,playersScore)=>{
    let userIndex=-1;
    for(let i=0;i<players.length;i++){
        if(players[i]===localStorage.getItem('u-username')){
            userIndex=i;
            break;
        }
    }
    if(Math.max(...playersScore)===playersScore[userIndex]){
        return true;
    }
    return false;
}

export{
    playerColors,
    initialize2DArr,
    copy2dArr,
    check_left_right_for_vertLine,
    check_up_down_for_horiLine,
    updateStatesForHoriLine,
    updateStatesForVertLine,
    updateStats,
    setBoxAndDotSize,
    checkIfWon,
    compTakesChance,
}


