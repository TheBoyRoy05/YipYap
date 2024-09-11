import useSocket from "../../../Store/useSocket";
import { UserType } from "../../../Utils/Types";
import YapOptions from "./YapOptions";

interface FriendCardProps {
  friend: UserType;
}

const FriendCard = ({ friend }: FriendCardProps) => {
  const { onlineUserIDs } = useSocket();
  const online = onlineUserIDs.includes(friend._id) ? "online" : "";

  return (
    <div className="card bg-base-100 px-4 overflow-visible mt-10 text-center">
      <div className={`avatar mx-auto top-[-1.75rem] mb-[-1rem] ${online}`}>
        <div className="w-14 rounded-full">
          <img src={friend.profilePic} alt="user avatar" />
        </div>
      </div>
      <div className="flex-grow">
        <p className={`text-xl text-gray-200`}>
          {friend.fullName.length > 13 ? friend.fullName.slice(0, 13) + "..." : friend.fullName}
        </p>
        <span className={`text-lg`}>{"status"}</span>
      </div>
      <YapOptions friend={friend} />
    </div>
  );
};

export default FriendCard;
