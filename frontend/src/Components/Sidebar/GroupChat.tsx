import useConversation from "../../Store/useConversation";
import { ConversationType } from "../../Utils/Types";
import useFriends from "../../Store/useFriends";
import { FaUserFriends } from "react-icons/fa";
import { randInt } from "../../Utils/Functions";

interface GroupChatProps {
  conversation: ConversationType;
  numNotifs: number;
}

const GroupChat = ({ conversation, numNotifs }: GroupChatProps) => {
  const { conversation: selectedConversation, setConversation } = useConversation();
  const { setShowFriendsPage } = useFriends();

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
      <div className="p-4" style={{ backgroundColor: `hsl(${randInt(0, 360)}, 60%, 60%)` }}>
        <FaUserFriends />
      </div>
      <div className="flex flex-col flex-1">
        <p className={`text-lg leading-5 group-hover:text-white ${usernameColor}`}>
          {conversation.name}
        </p>
        <span className={`text-sm group-hover:text-gray-200 ${statusColor}`}>
          {`${conversation.participants.length} members`}
        </span>
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

export default GroupChat;
