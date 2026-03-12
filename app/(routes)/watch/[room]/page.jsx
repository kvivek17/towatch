
"use client";
import { useParams } from 'next/navigation'
import  { useEffect,useState } from 'react'
import ReactPlayer from 'react-player';
import axios from 'axios';
import Syncvideo from '../../dashboard/components/Syncvideo';
import Chatbox from '../../dashboard/components/Chatbox';



const Watch = () => {

const {room} = useParams()
console.log("Fetching room details for room ID:", room);
const [roomdetails, setroomdetails] = useState({})
    useEffect(()=>{

        getroomdetails();

    },[room])

    const getroomdetails = async()=>{
        
        const result = await axios.get('/api/room?roomid=' +room);
        console.log("Room details result data:", result.data);
            console.log("✅ Video URL fetched:", result.data.videoUrl); // ✅ MOVE LOG HERE


        setroomdetails(result.data)

        
      }
      console.log("Room details fetched video kkkk:", roomdetails.videoUrl);


  return (
<>

<div>

  <div className=' bg-black'>
 <Syncvideo videoUrl={roomdetails.videoUrl} roomname={roomdetails.roomname} />
  </div>


 <div className='flex items-center justify-center gap-4'>
     <Chatbox/>
</div>

</div>

</>


  )
}

export default Watch