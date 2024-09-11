import useSocket from "../../../Store/useSocket";
import { UserType } from "../../../Utils/Types";
import YapOptions from "./YapOptions";

interface FriendProps {
  friend: UserType;
}

const FriendItem = ({ friend }: FriendProps) => {
  const { onlineUserIDs } = useSocket();
  const online = onlineUserIDs.includes(friend._id) ? "online" : "";

  return (
    <div className="card p-2 pl-4 bg-base-100 flex flex-row items-center gap-4">
      <div className={`avatar ${online}`}>
        <div className="w-12 h-12 rounded-full">
          <img src={friend.profilePic} alt="user avatar" />
        </div>
      </div>
      <div className="flex flex-col flex-grow justify-center">
        <p className={`text-xl text-white`}>{friend.fullName}</p>
        <span className={`text-md`}>{"status"}</span>
      </div>
      <YapOptions friend={friend} />
    </div>
  );
};

export default FriendItem;
