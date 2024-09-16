import { useEffect, useRef } from "react";
import Message from "./Message";
import useConversation from "../../../Store/useConversation";
import useGetMessages from "../../../Hooks/Conversation/useGetMessages.ts";

const Messages = () => {
  const { loading, messages } = useGetMessages();
  const { conversation } = useConversation();
  const lastMessage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      lastMessage.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }, [conversation.messages]);

  return (
    <div className="flex-1 overflow-auto dark-scrollbar my-2">
      {loading ? (
        <div className="h-full flex items-center justify-center">
          <span className="loading loading-bars loading-lg" />
        </div>
      ) : (
        messages.map((message, index) => (
          <div key={index} ref={lastMessage}>
            <Message
              first={index === 0 || messages[index - 1].sender !== message.sender}
              message={message}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default Messages;
