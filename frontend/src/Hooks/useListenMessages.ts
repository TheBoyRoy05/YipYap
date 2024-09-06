import { useEffect } from "react";
import useSocket from "../Store/useSocket";
import useStore from "../Store/useStore";
import { MessageType } from "../Utils/Types";

const useListenMessages = () => {
  const { socket } = useSocket();
  const { receiver, setMessages } = useStore();

  useEffect(() => {
    socket?.on("newMessage", (message: MessageType) => {
      if (receiver._id == message.receiverID)
        setMessages((messages) => [...messages, message]);
    });

    return () => {
      if (socket) socket.off("newMessage");
    };
  }, [receiver._id, setMessages, socket]);
};

export default useListenMessages;
