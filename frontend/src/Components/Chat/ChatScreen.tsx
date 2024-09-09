import Input from "./Input";
import Messages from "./Messages";
import useStore from "../../Store/useStore";
import { useEffect } from "react";
import { emptyUser } from "../../Utils/Types";
import useSocket from "../../Store/useSocket";
import DefaultScreen from "./DefaultScreen";

const ChatScreen = () => {
  const { receiver, setReceiver } = useStore();
  const { onlineUserIDs } = useSocket();
  const online = onlineUserIDs.includes(receiver._id);

  useEffect(() => {
    return () => {
      setReceiver(emptyUser);
    };
  }, [setReceiver]);

  return receiver._id != "" ? (
    <div className="flex-grow md:min-w-[450px] flex flex-col">
      <div className="bg-slate-500 px-4 py-2 flex items-center">
        <div className={`avatar ${online ? "online" : ""} w-8 mr-2`}>
          <div className="w-12 rounded-full">
            <img src={receiver.profilePic} alt="user avatar" />
          </div>
        </div>
        <span className="text-gray-900 font-bold">{receiver.username}</span>
      </div>
      <Messages />
      <Input />
    </div>
  ) : (
    <DefaultScreen />
  );
};

export default ChatScreen;
