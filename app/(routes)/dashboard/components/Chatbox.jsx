"use client";
import { io } from "socket.io-client";
import { useState, useEffect, useRef } from "react";
import VoiceCall from "./Voice";

let socket;


const Chatbox = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();


  useEffect(() => {
    socket = io({ path: "/api/socket" });

    socket.on("connect", () => {
      console.log("✅ Connected to socket server");
    });

    socket.on("received-msg", (msg) => {
      console.log("📩 Received from other user:", msg);
      setMessages((prev) => [...prev, { sender: "other", text: msg }]);
    });

    return () => socket.disconnect();
  }, []);

  const sendMessage = () => {
    if (!message) return;

    socket.emit("chat-msg", message);
    setMessages((prev) => [...prev, { sender: "me", text: message }]);
    setMessage("");
  };

  return (
    <div className=" bg-gradient-to-r from-blue-100 to-blue-200">
      <div className="mb-4 h-64 overflow-y-auto  p-2 w-[98.8vw]  rounded  flex flex-col gap-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
          >
            <div className={`px-3 py-1 rounded max-w-[75%]  break-words ${msg.sender === "me" ? "bg-blue-600 bg- text-white font-bold" : "bg-white text-blue-500 font-bold"
              }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="flex  justify-center items-center gap-1 ">

        <input
          type="text"
          className="flex-1 font-bold px-2 py-2 rounded-2xl w-[50vw] 
             text-white placeholder-white border-none 
             bg-gradient-to-r from-indigo-500 via-purple-400 to-blue-300
             focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={message}
          placeholder="Enter message"
          onChange={(e) => setMessage(e.target.value)}
        />


 <button onClick={sendMessage} className="p-2 sm:p-3">
  <img
    src="/send.png"
    alt="Send"
    className="w-6 h-6 sm:w-6 sm:h-7 object-contain min-w-[24px] min-h-[24px]"
  />
</button>


        <VoiceCall  />
      </div>
    </div>
  );
};

export default Chatbox;
