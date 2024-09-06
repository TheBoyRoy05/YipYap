/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import useSocket from "../Store/useSocket";

const useSocketConnection = (authUser: { _id: string }) => {
  const { socket, setSocket, setOnlineUserIDs } = useSocket();

  useEffect(() => {
    if (authUser._id) {
      try {
        const newSocket: Socket = io("http://localhost:3000", {
          query: {
            userID: authUser._id,
          },
        });
        setSocket(newSocket);

        return () => {
          if (socket) socket.close();
          setSocket(null);
        };
      } catch (error) {
        console.error(`Socket connection error: ${(error as Error).message}`);
        setSocket(null);
      }
    } else if (socket) {
      socket.close();
      setSocket(null);
    }
  }, [authUser]);

  useEffect(() => {
    socket?.on("getOnlineUsers", (userIDs) => {
      setOnlineUserIDs(userIDs);
    });
  }, [setOnlineUserIDs, socket]);
};

export default useSocketConnection;