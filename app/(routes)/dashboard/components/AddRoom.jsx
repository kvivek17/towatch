
"use client"
import { useState } from "react"
import axios from "axios";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ArrowBigRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { set } from "lodash";
const AddRoom = () => {
  const [Roomname, setRoomname] = useState('')
  const [open, setOpen] = useState(false)
  const [videofile, setvideofile] = useState(null);
  const [loading, setloading] = useState(false)
  const router = useRouter();

const CreateRoom = async () => {
  if (!videofile) return;

  setloading(true);

  try {

    // 1️⃣ upload video directly to Cloudinary
    const cloudData = new FormData();
    cloudData.append("file", videofile);
    cloudData.append("upload_preset", "watchparty");

    const uploadRes = await axios.post(
      "https://api.cloudinary.com/v1_1/dxduwuyxb/video/upload",
      cloudData
    );

    const videoUrl = uploadRes.data.secure_url;

    console.log("Video uploaded to Cloudinary:", videoUrl);



    // 2️⃣ send metadata to your API
    const result = await axios.post("/api/room", {
      roomname: Roomname,
      videoUrl: videoUrl
    });

    if (result.data.success) {
      router.push("/watch/" + result.data.roomid);
    }

  } catch (error) {
    console.log(error);
  }

  setloading(false);
};


  return (
    <>
      <Dialog>
        <DialogTrigger><Button>Create a Room</Button></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a your Personal Room:</DialogTitle>
            <DialogDescription aschild className="flex flex-col gap-4 justify-center items-center">
              <input type="text" onChange={(e) => {
                setRoomname(e.target.value);
              }} placeholder="Enter Room Name" className="border p-2 rounded w-full" />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>
              <Button>Close</Button>
            </DialogClose>
            <Button onClick={() => { setOpen(true) }} disabled={!Roomname} > Create <ArrowBigRight /></Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload a Video File</DialogTitle>
            <DialogDescription>
              <label htmlFor="upload" className="text-sm font-bold text-white p-2 bg-blue-900 rounded-md">
               Upload video file upto 1GB:-
              </label>
              <input id='upload' type="file" accept="video/*" onChange={(e)=>setvideofile(e.target.files?.[0])} />
              {videofile && <p className="text-sm mt-4"><span className="font-bold text-black">video name:-</span>{videofile.name}</p>}
              {loading && <p className="text-sm mt-4">Uploading...</p>}
            </DialogDescription>

          </DialogHeader>
          <DialogFooter>
            <button onClick={CreateRoom} disabled={!videofile} className="px-4 py-1 disabled:bg-blue-200  bg-blue-500 text-white font-bold rounded-md">Upload</button>
           <button disabled={loading}  className="px-4 py-1 disabled:bg-blue-200  bg-blue-500 text-white font-bold rounded-md">{loading?"uploading":"Next"}</button>
            <DialogClose asChild>
              <Button variant="outline" onClick={()=>{setvideofile(null)}}>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>


    </>
  )
  }

export default AddRoom
