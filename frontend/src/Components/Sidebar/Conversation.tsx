import useSocket from "../../Store/useSocket";
import useStore from "../../Store/useStore";
import { UserType } from "../../Utils/Types";

interface ConvoProps {
  user: UserType;
  numNotifs: number;
}

const Conversation = ({ user, numNotifs }: ConvoProps) => {
  const { receiver, setReceiver } = useStore();
  const selected = user._id == receiver._id;
  const { onlineUserIDs } = useSocket();
  const online = onlineUserIDs.includes(user._id);

  return (
    <button onClick={() => setReceiver(user)}>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded-lg p-2 py-1 cursor-pointer group text-left ${
          selected ? "bg-sky-500" : ""
        }`}
      >
        <div className={`avatar ${online ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={user.profilePic} alt="user avatar" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <p
            className={`group-hover:text-white ${
              selected ? "text-white" : "text-gray-200"
            }`}
          >
            {user.username}
          </p>
          <span
            className={`text-sm group-hover:text-gray-200 ${
              selected ? "text-gray-200" : "text-gray-400"
            }`}
          >
            {"status"}
          </span>
        </div>
        {numNotifs > 0 ? (
          <div className="w-6 h-6 rounded-full bg-green-500 text-gray-50 text-xs font-bold flex justify-center items-center">
            {numNotifs}
          </div>
        ) : (
          <></>
        )}
      </div>
    </button>
  );
};

export default Conversation;
