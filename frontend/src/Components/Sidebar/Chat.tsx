import useSocket from "../../Store/useSocket";
import useConversation from "../../Store/useConversation";
import { ConversationType, emptyUser } from "../../Utils/Types";
import useFriends from "../../Store/useFriends";

interface ChatProps {
  conversation: ConversationType;
  numNotifs: number;
}

const Chat = ({ conversation, numNotifs }: ChatProps) => {
  const { authUser, conversation: selectedConversation, setConversation } = useConversation();
  const { setShowFriendsPage } = useFriends();
  const { onlineUserIDs } = useSocket();

  const receiver = conversation.participants.find((p) => p._id !== authUser._id) || emptyUser;
  const online = onlineUserIDs.includes(receiver._id);

  const selected = conversation._id == selectedConversation._id;
  const bgColor = selected ? "bg-sky-500" : "hover:bg-slate-500";
  const usernameColor = selected ? "text-white" : "text-gray-200";
  const statusColor = selected ? "text-gray-200" : "text-gray-400";

  const handleClick = () => {
    setConversation(conversation);
    setShowFriendsPage(false);
  };

  return (
    <button
      onClick={handleClick}
      className={`flex gap-3 items-center border-b px-2 py-3 cursor-pointer group text-left ${bgColor}`}
    >
      <div className={`avatar ${online ? "online" : ""}`}>
        <div className="w-10 rounded-full">
          <img src={receiver.profilePic} alt="user avatar" />
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <p className={`text-lg leading-5 group-hover:text-white ${usernameColor}`}>
          {receiver.fullName}
        </p>
        <span className={`text-sm group-hover:text-gray-200 ${statusColor}`}>{"status"}</span>
      </div>
      {numNotifs > 0 ? (
        <div className="w-6 h-6 rounded-full bg-green-500 text-gray-50 text-xs font-bold flex justify-center items-center">
          {numNotifs}
        </div>
      ) : (
        <></>
      )}
    </button>
  );
};

export default Chat;
