import { FaUserFriends } from "react-icons/fa";
import useConversation from "../../../Store/useConversation";
import useSocket from "../../../Store/useSocket";
import { emptyUser } from "../../../Utils/Types";
import Input from "./Input";
import Messages from "./Messages";
import { getConversationName, hashIDToColor } from "../../../Utils/Functions";
import AIResponses from "./AIResponses";

const ChatScreen = () => {
  const { authUser, conversation } = useConversation();
  const { onlineUserIDs } = useSocket();

  const receiver = conversation.participants.find((p) => p._id !== authUser._id) || emptyUser;
  const online = onlineUserIDs.includes(receiver._id);
  const isGroupChat = conversation.participants.length > 2;

  return (
    <div className="flex-grow md:min-w-[450px] flex flex-col">
      <div className="bg-slate-500 px-4 py-3 flex items-center gap-4">
        {isGroupChat && !conversation.profilePic ? (
          <div
            className="flex justify-center items-center rounded-full w-10 h-10 text-white border-2 border-white"
            style={{ backgroundColor: hashIDToColor(conversation._id) }}
          >
            <FaUserFriends />
          </div>
        ) : (
          <div className={`avatar ${online ? "online" : ""}`}>
            <div className="w-10 rounded-full border-2 border-white">
              <img
                src={isGroupChat ? conversation.profilePic : receiver.profilePic}
                alt="user avatar"
              />
            </div>
          </div>
        )}
        <span className="text-white font-bold text-xl">
          {getConversationName(conversation, authUser)}
        </span>
      </div>
      <Messages />
      <AIResponses />
      <Input />
    </div>
  );
};

export default ChatScreen;
