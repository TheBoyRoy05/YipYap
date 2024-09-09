import { useEffect, useRef } from "react";
import useGetMessages from "../../Hooks/useGetMessages";
import Message from "./Message";
import useListenMessages from "../../Hooks/useListenMessages";

const Messages = () => {
  const { messages } = useGetMessages();
  const lastMessage = useRef<HTMLDivElement>(null);
  useListenMessages();

  useEffect(() => {
    setTimeout(() => {
      lastMessage.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }, [messages]);

  return (
    <div className="p-4 flex-1 overflow-auto dark-scrollbar my-2">
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
