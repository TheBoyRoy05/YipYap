/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import useSocket from "../Store/useSocket";
import useConversation from "../Store/useConversation";
import { MessageType } from "../Utils/Types";
import Quack from "../assets/Sounds/quack_5.mp3";

const useListenMessages = () => {
  const { socket } = useSocket();
  const { receiver, setMessages } = useConversation();

  useEffect(() => {
    const sound = new Audio(Quack);
    
    socket?.on("newMessage", (message: MessageType) => {
      if (receiver._id == message.senderID) {
        setMessages((messages) => [...messages, message]);
      }
      sound.currentTime = 0;
      sound.play();
    });

    return () => {
      if (socket) socket.off("newMessage");
    };
  }, [socket, receiver._id]);
};

export default useListenMessages;
