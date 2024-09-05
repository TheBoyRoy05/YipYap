import useStore from "../../Store/useStore.ts";
import { formatDateTime } from "../../Utils/Functions";
import { MessageType } from "../../Utils/Types";

interface MessageProps {
  first: boolean;
  message: MessageType;
}

const Message = ({first, message}: MessageProps) => {
  const { date, time } = formatDateTime(message.createdAt);
  const { authUser, receiver } = useStore();
  const sender = message.senderID === authUser._id ? authUser : receiver;

  return (
    <div className={`flex items-center hover:bg-gray-700 group ${first ? "mt-2" : ""}`}>
      {first ? (
        <div className="avatar">
          <div className="w-10 mx-3 rounded-full">
            <img src={sender.profilePic} alt="user avatar" />
          </div>
        </div>
      ) : (
        <span className="w-16 text-xs text-center invisible group-hover:visible">
          {time}
        </span>
      )}
      <div className="flex flex-col">
        {first ? (
          <div className="flex text-sm mt-1">
            <p className="text-white mr-2">{sender.username}</p>
            <span>{`${date} ${time}`}</span>
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
