import axios from 'axios';

const createRandomRoomId=async(backendLink)=>{
    try{
        const apiLink=`${backendLink}/room/createRandomNotUsedRoomId`;
        const res=await axios.get(apiLink);
        console.log("create random id");
        console.log(res);
        return res.data.roomId;
    }catch(e){
        console.log(`error while creating roomId`);
        console.log(e);
    }
}

const checkIfRoomExistsAndGameNotStarted=async(backendLink,roomId,game)=>{
    try{
        const apiLink=`${backendLink}/room/canEnterRoom/${game}/${roomId}`;
        const res=await axios.get(apiLink);
        console.log("checking room exists");
        console.log(res);
        return res.data;
    }catch(e){
        console.log(`error while checking if can enter room`);
        console.log(e);
    }
}

export{
    createRandomRoomId,
    checkIfRoomExistsAndGameNotStarted,
}