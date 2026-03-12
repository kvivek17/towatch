
"use client"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
const JoinRoom = () => {

  const [link, setlink] = useState('')
  const router = useRouter();
  


  const handlejoin=()=>{
    if(!link){
      alert("Please enter a valid link")
      return; 
    }
    router.push(`${link}`)

  }
  return (
   <>
   <Dialog>
  <DialogTrigger><Button>Join Room</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Enter the joining link 🔗</DialogTitle>
      <DialogDescription>
        <div className='flex flex-col gap-2'>
          <input type="text"  onChange={(e)=>{setlink(e.target.value)}} placeholder='Enter the link' className='border border-gray-300 rounded p-2 w-full' />
          <Button onClick={handlejoin}  className='bg-blue-500 text-white'>Join</Button>
        </div>
        <p className='text-sm text-gray-500 mt-2'>You can join a room using a valid link.</p>
  
      
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
   </>
  )
}

export default JoinRoom