import { io } from "socket.io-client";

export const initSocket = async () => {
    return io("https://cd-back-one.vercel.app/",{
        transports: ['websocket', 'polling']
    });
    // return io("https://cd-back.onrender.com/");
}
