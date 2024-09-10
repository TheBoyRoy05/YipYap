import useSocket from "../../../Store/useSocket";
import { UserType } from "../../../Utils/Types";
import YapOptions from "./YapOptions";

interface FriendCardProps {
  user: UserType;
}

const FriendCard = ({ user }: FriendCardProps) => {
  const { onlineUserIDs } = useSocket();
  const online = onlineUserIDs.includes(user._id) ? "online" : "";

  return (
    <div className="card bg-base-100 px-4 overflow-visible mt-10 text-center">
      <div className={`avatar mx-auto top-[-1.75rem] mb-[-1rem] ${online}`}>
        <div className="w-14 rounded-full">
          <img src={user.profilePic} alt="user avatar" />
        </div>
      </div>
      <div className="flex-grow">
        <p className={`text-xl text-gray-200`}>
          {user.fullName.length > 13 ? user.fullName.slice(0, 13) + "..." : user.fullName}
        </p>
        <span className={`text-lg`}>{"status"}</span>
      </div>
      <YapOptions user={user} />
    </div>
  );
};

export default FriendCard;
