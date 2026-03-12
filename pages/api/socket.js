// /pages/api/socket.js
import { Server } from "socket.io";

export default function handler(req, res) {
  if (res.socket.server.io) {
    console.log("🟡 Socket.io server already running");
    res.end();
    return;
  }

  console.log("🔌 Initializing new Socket.io server...");
  const io = new Server(res.socket.server, {
    path: "/api/socket",
  });

  io.on("connection", (socket) => {
    console.log("✅ Client connected:", socket.id);

    // Handle video synchronization events
    socket.on("request-current-time", () => {
      socket.emit("get-current-time", { requester: socket.id });

    })
    socket.on("send-current-time", ({ currentTime, requester }) => {
      io.to(requester).emit("set-time", { currentTime });
    })

    socket.on("chat-msg", (message) => {
      console.log("📩 Message received from client:", message);
      socket.broadcast.emit("received-msg", message);
    });

    socket.on("video-event", (data) => {
      console.log("📹 Video event received:", data);
      socket.broadcast.emit("video-event", data);
    });

    socket.on("signal", (data) => {
      socket.broadcast.emit("signal", data);
    });


    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);
    });
  });

  res.socket.server.io = io;
  res.end();
}
