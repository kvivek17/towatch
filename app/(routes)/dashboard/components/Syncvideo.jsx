"use client";
import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import io from "socket.io-client";

let socket;

const Syncvideo = ({ videoUrl, roomname }) => {
  const videoRef = useRef(null);
  const [isconnected, setisconnected] = useState(false);
  const seeked = useRef(false);

  useEffect(() => {
    socket = io({ path: "/api/socket" });

    socket.on("connect", () => {
      console.log("Connected to socket server");
      setisconnected(true);
    });

    socket.on("get-current-time", ({ requester }) => {
      const video = videoRef.current;
      if (!video) return;
      const currentTime = video.currentTime;
      socket.emit("send-current-time", { currentTime, requester });
    });

    socket.on("set-time", ({ currentTime }) => {
      const video = videoRef.current;
      if (video && !seeked.current) {
        video.currentTime = currentTime;
        seeked.current = true;
      }
    });

    socket.emit("request-current-time");

    socket.on("video-event", (data) => {
      const video = videoRef.current;
      if (!video) return;

      const { type, currentTime } = data;

      if (type === "play") video.play();
      if (type === "pause") video.pause();
      if (type === "seek" && currentTime !== undefined) {
        seeked.current = true;
        video.currentTime = currentTime;
      }
    });

    return () => {
      socket.disconnect();
      console.log("Disconnected from socket server");
    };
  }, []);

  const handlePlay = () => socket.emit("video-event", { type: "play" });
  const handlePause = () => socket.emit("video-event", { type: "pause" });

  const handleSeek = () => {
    const video = videoRef.current;
    if (!video) return;

    if (seeked.current) {
      seeked.current = false;
      return;
    }

    socket.emit("video-event", {
      type: "seek",
      currentTime: video.currentTime,
    });
  };


  const copyLink = async () => {
    try {
      const roomlink = await navigator.clipboard.writeText(window.location.href);
      alert("Room link copied to clipboard!");
    } catch (error) {
      alert("Failed to copy link. Please try again.");
      console.error("Error copying link:", error);
    }

  }




  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-100 to-blue-200 px-4 py-8">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-3xl border border-blue-300">
       <h2 className="text-2xl font-bold mb-4 text-center text-gray-400 
               bg-blue-100 rounded-xl px-4 py-2 shadow-sm">
  {roomname}
</h2>

        <div className="relative rounded-xl overflow-hidden border-4 border-blue-400 shadow-[0_0_10px_#3b82f6]">
          <video
            ref={videoRef}
            className="w-full h-auto"
            controls
            muted
            onPlay={handlePlay}
            onPause={handlePause}
            onSeeked={handleSeek}
            src={videoUrl}
          />
        </div>

        <div className="flex mt-4 gap-5 items-center ">
          <p className=" text-center font-medium text-blue-600">
            Status: {isconnected ? "🟢 Active" : "🔴 Disconnected"}
          </p>
          <Dialog>
            <DialogTrigger><Button   >Share Room Link</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Copy link 🔗</DialogTitle>
                <DialogDescription>
                  <div className='flex flex-col gap-2'>

                    <Button onClick={copyLink} className='bg-blue-500 text-white'>Copy Link</Button>
                  </div>
                  <p className='text-sm text-gray-500 mt-2'>You can share this link to a freinds .</p>


                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>

      </div>
    </div>
  );
};

export default Syncvideo;
