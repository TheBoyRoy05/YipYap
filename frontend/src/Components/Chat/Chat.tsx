import { TiMessages } from "react-icons/ti";
import Input from "./Input";
import Messages from "./Messages";
import useStore from "../../Store/useStore";
import { useEffect } from "react";
import { emptyUser } from "../../Utils/Types";
import useSocket from "../../Store/useSocket";

const Chat = () => {
  const { receiver, setReceiver } = useStore();
  const { onlineUserIDs } = useSocket();
  const online = onlineUserIDs.includes(receiver._id);

  useEffect(() => {
    return () => {
      setReceiver(emptyUser);
    };
  }, [setReceiver]);

  return receiver._id != "" ? (
    <div className="md:min-w-[450px] flex flex-col">
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
    <NoChat />
  );
};

const NoChat = () => {
  const { authUser } = useStore();

  return (
    <div className="flex flex-col items-center justify-center w-full h-full px-4 sm:text-lg md:text-xl text-gray-200 font-semibold gap-2">
      <p>{`Welcome ${authUser.username}`}</p>
      <p>Select a chat to start messaging</p>
      <TiMessages className="text-3xl md:text-6xl text-center" />
    </div>
  );
};

export default Chat;
