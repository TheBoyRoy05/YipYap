import useConversation from "../../../Store/useConversation";
import useSocket from "../../../Store/useSocket";
import Input from "./Input";
import Messages from "./Messages";

const ChatScreen = () => {
  const { receiver } = useConversation();
  const { onlineUserIDs } = useSocket();
  const online = onlineUserIDs.includes(receiver._id);

  return (
    <div className="flex-grow md:min-w-[450px] flex flex-col">
      <div className="bg-blue-500 px-4 py-3 flex items-center gap-4">
        <div className={`avatar ${online ? "online" : ""}`}>
          <div className="w-10 rounded-full border-2 border-white">
            <img src={receiver.profilePic} alt="user avatar" />
          </div>
        </div>
        <span className="text-white font-bold text-xl">{receiver.fullName}</span>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default ChatScreen