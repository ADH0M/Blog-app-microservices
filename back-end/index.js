const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // For password hashing
const cors = require("cors");
const port = 3201;
const nodemailer = require("nodemailer");
const router = require("./route/mq");
const http = require("http");
const { Server } = require("socket.io");
const { connectRabbitMQ } = require("./utlis/RabbitMQ");

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("send-msg", (msg) => {
    console.log(msg, "0----------------------------------------------");
  });

  socket.on("join-room", (ms) => {
    console.log(ms);
    socket.join(ms);
    socket.to(ms).emit("recieve-msg", "online");
  });

  socket.on("add-like", (ms) => {
    socket.broadcast.emit("new-notification", {
      user: ms.username,
      msg: "user add like",
    });
  });

  socket.on("notification-send", async (msg) => {
    socket.broadcast.emit("notification-recieve", msg);
  });
});

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/notification")
  .then(() => {
    console.log("Connected to MongoDB: notification database");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use(router);






// Start server
server.listen(port, () => {
  console.log(`Server started on port ${port}`);
  connectRabbitMQ();
});
