import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import User from "./src/lib/models/user-model";


const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port, turbopack: true });
const handler = app.getRequestHandler();

let onlineUsers: { userId: string; socketId: string }[] = [];

const addUser = (userId: string, socketId: string) => {
  const isExist = onlineUsers.find((user) => user.userId === socketId);

  if (!isExist) {
    onlineUsers.push({ userId, socketId });
    console.log(userId + "added!");
  }
};

const removeUser = (socketId: string) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
  console.log("user removed!");
};

const getUser = (socketId: string) => {
  return onlineUsers.find((user) => user.socketId === socketId);
};

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    socket.on("newUser", async (userid) => {
      addUser(userid, socket.id);
      const user = await User.find({ _id: userid });
      if (user) {
        await User.updateOne({ _id: userid }, { $set: { active: true } });
      }
    });

    socket.on("create-room", (channelId: string) => {
      socket.join(channelId);
    });

    socket.on(
      "sendMsg",
      async ({msg  , roomId }) => {        
        socket.to(roomId).emit('recieveMsg' , msg);
        
      }
    );

    socket.on("sendNotification", ({ receiverUsername, data }) => {
      const receiver = getUser(receiverUsername);
    });

    socket.on("disconnect", async () => {
      const userid = onlineUsers.find((user) => user.socketId === socket.id);
      if (userid) {
        const user = await User.find({ _id: userid.userId });
        if (user)
          await User.updateOne(
            { _id: userid.userId },
            { $set: { active: false } }
          );
      }
      removeUser(socket.id);
      console.log(userid, "removeddd .....................");
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
