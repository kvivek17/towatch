"use client";


import { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import io from "socket.io-client";

let socket;
let peer;

export default function VoiceCall() {
    const audioRef = useRef(null);
    const [Connected, setConnected] = useState(false);

    useEffect(() => {
        socket = io({ path: "/api/socket" });

        // Incoming signal from other peer
        socket.on("signal", (data) => {
            if (!peer) {
                setupPeer(false, data); // Receiving side
            } else {
                peer.signal(data); // Accept offer or answer
            }
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const startCall = async () => {
        // Get user's microphone audio
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        setupPeer(true, null, stream); // Initiator side

        setConnected(true);


    };

    const setupPeer = (initiator, signalData = null, stream = null) => {
        peer = new Peer({
            initiator,
            trickle: false,
            stream,
        });

        // Send your signal (offer/answer)
        peer.on("signal", (data) => {
            socket.emit("signal", data);
        });

        // Receiving side gets remote stream here
        peer.on("stream", (remoteStream) => {
            const audio = audioRef.current;
            audio.srcObject = remoteStream;

            // Try to play audio (sometimes triggered on receiver side as well)
            audio.play().catch((err) => {
                console.warn("Play blocked until user interaction:", err);
            });
        });

        // Accept incoming signal data
        if (signalData) {
            peer.signal(signalData);
        }
    };

    const disconnectCall = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.srcObject = null;
        }
        if (peer?.streams?.[0]) {
            peer.streams[0].getTracks().forEach(track => {
                track.stop(); // Stops microphone
            });
        }


        setConnected(false);
    };

    return (
        <div className="p-4">
     {!Connected ? (
  <button
    onClick={startCall}
    className="bg-gradient-to-r from-green-500 via-emerald-500 to-lime-500
               text-white font-medium px-3 py-2
               text-sm rounded-lg shadow-md 
               hover:scale-105 transition-transform duration-200"
  >
    Voice
  </button>
) : (
  <button
    onClick={disconnectCall}
    className="bg-red-600 text-white font-medium px-3 py-1.5 
               text-sm rounded-full shadow-md 
               hover:bg-red-700 transition-colors duration-200"
  >
    End Call
  </button>
)}


            {/* Hidden audio element */}
            <audio ref={audioRef} autoPlay controls style={{ display: "none" }} />
        </div>
    );
}
