import { io } from "socket.io-client";

let socket;

export const connectSocket = () => {
  const token = localStorage.getItem("token");
  const userString = localStorage.getItem("user");

  if (!socket && token) {
    socket = io(import.meta.env.VITE_SOCKET_URL, {
      auth: { token },
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      if (userString) {
        const user = JSON.parse(userString);
        if (user?._id) {
          socket.emit("join-room", user._id.toString());
        }
      }
    });
  }

  return socket;
};

export const getSocket = () => socket;