import useConversation from "../../Store/useConversation";
import Message from "./Message";

const Messages = () => {
  const { messages } = useConversation();

  return (
    <div className="px flex-1 overflow-auto dark-scrollbar">
      {messages.map((message, index) => (
        <Message
          first={index == 0 || messages[index - 1].senderID.username != message.senderID.username}
          username={message.senderID.username}
          profilePic={message.senderID.profilePic}
          message={message.message}
          dateTime={message.createdAt}
          key={index}
        />
      ))}
    </div>
  );
};

export default Messages;
