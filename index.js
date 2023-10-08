const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const app = express();
const port = 5000;

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("id ", socket.id);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with id: ${socket.id} joined the room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data)
  });

  socket.on("disconnect", () => {
    console.log("User disconnected ", socket.id);
  });
});

server.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
