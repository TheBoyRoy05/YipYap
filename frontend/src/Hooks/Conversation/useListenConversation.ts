import { useEffect } from "react";
import useSocket from "../../Store/useSocket";
import useConversation from "../../Store/useConversation";
import { ConversationType, MessageType } from "../../Utils/Types";
import Quack from "../../assets/Sounds/quack_5.mp3";
import useReadConversation from "./useReadConversation";

const useListenConversation = () => {
  const { socket } = useSocket();
  const { readConversation } = useReadConversation();
  const { conversation, setMessages, setConversation, setMyConversations } = useConversation();

  useEffect(() => {
    const sound = new Audio(Quack);

    socket?.on("newMessage", (message: MessageType) => {
      if (message.conversation === conversation._id) {
        setConversation((prevConvo) => ({
          ...prevConvo,
          lastReadMessageID: message._id,
          messages: [...prevConvo.messages, message._id],
        }));

        setMessages((prevMessages) => [...prevMessages, message]);
        readConversation(message._id);
      }

      setMyConversations((prevConversations) =>
        prevConversations.map((convo) => {
          if (convo._id === message.conversation) {
            return { ...convo, messages: [...convo.messages, message._id] };
          } else return convo;
        })
      );

      sound.currentTime = 0;
      sound.play();
    });

    socket?.on("newGroupChat", (conversation: ConversationType) => {
      setMyConversations((prevConversations) => [conversation, ...prevConversations]);
    });

    return () => {
      if (socket) {
        socket.off("newMessage");
        socket.off("newGroupChat");
      }
    };
  }, [conversation._id, readConversation, setConversation, setMessages, setMyConversations, socket]);
};

export default useListenConversation;
