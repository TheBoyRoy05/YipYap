import { useEffect } from "react";
import useSocket from "../Store/useSocket";
import useStore from "../Store/useStore";
import { MessageType } from "../Utils/Types";

const useListenMessages = () => {
  const { socket } = useSocket();
  const { setMessages } = useStore();

  useEffect(() => {
    socket?.on("newMessage", (message: MessageType) => {
      setMessages((messages) => [...messages, message]);
    });

    return () => {
      if (socket) socket.off("newMessage");
    };
  }, [setMessages, socket]);
};

export default useListenMessages;