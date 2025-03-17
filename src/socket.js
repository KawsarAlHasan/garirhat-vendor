import { io } from "socket.io-client";

const socket = io("https://api.garirhat.com", {
  autoConnect: false,
});

export default socket;
