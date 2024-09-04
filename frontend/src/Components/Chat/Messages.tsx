import { useEffect, useRef } from "react";
import useGetMessages from "../../Hooks/useGetMessages";
import Message from "./Message";

const Messages = () => {
  const { messages } = useGetMessages();
  const lastMessage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      lastMessage.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }, [messages]);

  return (
    <div className="px flex-1 overflow-auto dark-scrollbar">
      {messages.map((message, index) => (
        <div key={index} ref={lastMessage}>
          <Message
            first={
              index === 0 || messages[index - 1].senderID !== message.senderID
            }
            message={message}
          />
        </div>
      ))}
    </div>
  );
};

export default Messages;
