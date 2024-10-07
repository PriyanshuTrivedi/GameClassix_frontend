import axios from 'axios';
import { initialize2DArr } from '../DotAndBoxes/DotAndBoxes_helper_func';

const shadowCol=["#43b7bf","#726ee6"];
const backgroundClr=["#242927","#313436"];

const cnvrtStringTo2dArr=(sudokuString)=>{
    let i,j,n;
    let ans=[];
    n=9;
    for(i=0;i<n;i++){
        let temp=[];
        for(j=0;j<n;j++){
            if(sudokuString[i*n+j]==='.'){
                temp.push(0);
            }else{
                temp.push(Number(sudokuString[i*n+j]));
            }
        }
        ans.push(temp);
    }
    return ans;
}
const fetchSudoku=async(backendLink,diff)=>{
    try{
        const apiLink=`${backendLink}/sudoku/findRandomSolvableSudokuWithSolution`;
        const payload={
            difficulty:diff
        }
        const res=await axios.post(apiLink,payload);
        const result=res.data;
        result.partiallyFilledSudokuWithUniqueSolution=cnvrtStringTo2dArr(result.partiallyFilledSudokuWithUniqueSolution);
        result.completeSudoku=cnvrtStringTo2dArr(result.completeSudoku);
        return result;
    }catch(err){
        console.log('error while fetching sudoku');
    }
}
const findMiddleCellOf3X3Box=(i,j)=>{
    const ans=[];
    ans.push(Math.floor(i/3)*3+1);
    ans.push(Math.floor(j/3)*3+1);
    return ans;
}
const findShadowColorIndexOfCell=(i,j)=>{
    const middleCell=findMiddleCellOf3X3Box(i,j);
    if(middleCell[0]===middleCell[1] || middleCell[0]+middleCell[1]===8){
        return 0;
    }
    return 1;
}
const updatedShadowMatrix=(row,col)=>{
    const middleCell=findMiddleCellOf3X3Box(row,col);
    const leadCellI=middleCell[0]-1;
    const leadCellJ=middleCell[1]-1;
    const ans=new Set();
    for(let i=leadCellI;i<leadCellI+3;i++){
        for(let j=leadCellJ;j<leadCellJ+3;j++){
            ans.add([i,j]);
        }
    }
    for(let i=0;i<9;i++){
        ans.add([i,col]);
        ans.add([row,i]);
    }
    const temp=initialize2DArr(9,9,false);
    ans.forEach((el)=>{
        temp[el[0]][el[1]]=true;
    });
    return temp;
}
const setStyle=(i,j,sudoku,shadowMatrix)=>{
    const idx=findShadowColorIndexOfCell(i,j);
    const ans={};
    ans["backgroundColor"]=backgroundClr[idx];
    ans["boxShadow"]=(shadowMatrix[i][j]===true)?"1px 1px 3.5px inset rgba(0, 255, 236, 0.8), -1px -1px 3.5px inset rgba(0, 255, 236, 0.8)":"";
    ans["cursor"]=(sudoku[i][j]===0)?"pointer":"not-allowed";
    return ans;
}
const initializeFreqOfNums=(sudoku)=>{
    const ans=Array(9).fill(9);
    sudoku.forEach((rowEls)=>{
        rowEls.forEach((el)=>{
            if(el!=='.'){
                ans[Number(el)-1]--;
            }
        })
    });
    return ans;
}
const updateStats=async(backendLink,result,email,diff,timeTaken)=>{
    try{
        const apiLink=`${backendLink}/sudoku/updateStats`;
        const payload={
            email:email,
            result:result,
            difficulty:diff,
            timeTaken:timeTaken
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
const cnvrtedTime=(time)=>{
    let min=Math.floor(time/60);
    if(min==0){
        min="00";
    }else if(min<10){
        min="0"+min;
    }
    let sec=time%60;
    if(sec==0){
        sec="00";
    }else if(sec<10){
        sec="0"+sec;
    }
    const ans=min+":"+sec;
    return ans;
}
export{
    fetchSudoku,
    findMiddleCellOf3X3Box,
    findShadowColorIndexOfCell,
    updatedShadowMatrix,
    shadowCol,
    setStyle,
    initializeFreqOfNums,
    updateStats,
    cnvrtedTime
}