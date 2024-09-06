/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import useSocket from "../Store/useSocket";
import useStore from "../Store/useStore";
import { MessageType } from "../Utils/Types";
import MeowMeow from "../assets/Sounds/sad-meow-song.mp3";

const useListenMessages = () => {
  const { socket } = useSocket();
  const { receiver, setMessages } = useStore();

  useEffect(() => {
    const sound = new Audio(MeowMeow);

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
