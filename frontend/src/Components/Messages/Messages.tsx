import useGetMessages from "../../Hooks/useGetMessages";
import Message from "./Message";

const Messages = () => {
  const { messages } = useGetMessages();

  return (
    <div className="px flex-1 overflow-auto dark-scrollbar">
      {messages.map((message, index) => {
        console.log(message);
        return (
        <Message
          first={index == 0 || messages[index - 1].senderID != message.senderID}
          message={message}
        />
      )})}
    </div>
  );
};

export default Messages;
