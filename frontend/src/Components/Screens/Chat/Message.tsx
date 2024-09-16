import useConversation from "../../../Store/useConversation.ts";
import { formatDateTime } from "../../../Utils/Functions.ts";
import { emptyUser, MessageType } from "../../../Utils/Types.ts";

interface MessageProps {
  first: boolean;
  message: MessageType;
}

const Message = ({ first, message }: MessageProps) => {
  const { date, time } = formatDateTime(message.createdAt);
  const { conversation } = useConversation();
  const sender =
    conversation.participants.find((participant) => participant._id === message.sender) ||
    emptyUser;

  return (
    <div className={`flex items-center hover:bg-gray-800 group px-2 ${first ? "mt-2" : ""}`}>
      {first ? (
        <div className="avatar">
          <div className="w-10 mx-3 rounded-full">
            <img src={sender.profilePic} alt="user avatar" />
          </div>
        </div>
      ) : (
        <span className="w-16 text-xs text-gray-400 text-center invisible group-hover:visible">
          {time}
        </span>
      )}
      <div className="flex flex-col">
        {first ? (
          <div className="flex text-sm mt-1">
            <p className="text-white mr-2">{sender.fullName}</p>
            <span className="text-gray-400">{`${date} ${time}`}</span>
          </div>
        ) : (
          <></>
        )}
        <p className="text-gray-300">{message.message}</p>
      </div>
    </div>
  );
};

export default Message;
