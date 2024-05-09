import { Server } from "socket.io";

const socket = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("A user connected");

    //disconnect socket
    socket.on("disconnect", () => {
      console.log("A user disconnect");
    });
  });
};

export const SocketHelper = { socket };
