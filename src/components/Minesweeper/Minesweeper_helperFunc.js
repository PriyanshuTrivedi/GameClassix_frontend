import axios from "axios";

const swapElsOfArray=(i,j,arr)=>{
    let temp=arr[i];
    arr[i]=arr[j];
    arr[j]=temp;
}

const cpyMatrix=(matrix)=>{
    let i,j,n;
    n=matrix.length;
    let ans=[];
    for(i=0;i<n;i++){
        let temp=[];
        for(j=0;j<n;j++){
            temp.push(matrix[i][j]);
        }
        ans.push(temp);
    }
    return ans;
}
const createMatrix=(size)=>{
    let i,j;
    let ans=[];
    for(i=0;i<size;i++){
        let temp=[];
        for(j=0;j<size;j++){
            temp.push(false);
        }
        ans.push(temp);
    }
    return ans;
}

const fetchInitialInfo=async(backendLink,size,mines)=>{
    try{
        const apiLink=`${backendLink}/minesweeper/getRandomBoard`;
        const params={
            size:size,
            mines:mines
        }
        const res=await axios.get(apiLink,{params});
        return res.data;
    }catch(e){
        console.log(`console.log error while fetching board in minesweeper`);
        console.log(e);
    }
}

const updateStats=async(backendLink,email,won,timeTaken)=>{
    try{
        const apiLink=`${backendLink}/minesweeper/updateStats`;
        const payload={
            email:email,
            result:won,
            timeTaken:timeTaken
        }
        const res=await axios.put(apiLink,payload);
        console.log(res.data);
        console.log(`updated successfully`);
    }catch(e){
        console.log(`error while updating stats`);
        console.log(e);
    }
}

export{
    fetchInitialInfo,
    updateStats,
    cpyMatrix,
    createMatrix,
    swapElsOfArray
}