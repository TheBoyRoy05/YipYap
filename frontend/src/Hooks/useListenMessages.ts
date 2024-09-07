/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import useSocket from "../Store/useSocket";
import useStore from "../Store/useStore";
import { MessageType } from "../Utils/Types";
import Quack from "../assets/Sounds/quack_5.mp3";

const useListenMessages = () => {
  const { socket } = useSocket();
  const { receiver, setMessages } = useStore();

  useEffect(() => {
    const sound = new Audio(Quack);

    console.log("quack")
    socket?.on("newMessage", (message: MessageType) => {
      console.log("newMessage", message, receiver)
      if (receiver._id == message.senderID) {
        console.log("setMessages")
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
