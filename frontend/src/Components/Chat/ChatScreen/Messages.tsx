import { useEffect, useRef } from "react";
import Message from "./Message";
import useListenMessages from "../../../Hooks/Conversation/useListenMessages";
import useConversation from "../../../Store/useConversation";

const Messages = () => {
  const { conversation } = useConversation();
  const lastMessage = useRef<HTMLDivElement>(null);
  useListenMessages();

  useEffect(() => {
    setTimeout(() => {
      lastMessage.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }, [conversation.messages]);

  return (
    <div className="p-4 flex-1 overflow-auto dark-scrollbar my-2">
      {conversation.messages.map((message, index) => (
        <div key={index} ref={lastMessage}>
          <Message
            first={
              index === 0 || conversation.messages[index - 1].senderID !== message.senderID
            }
            message={message}
          />
        </div>
      ))}
    </div>
  );
};

export default Messages;
