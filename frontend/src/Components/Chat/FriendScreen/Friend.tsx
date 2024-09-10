import useSocket from "../../../Store/useSocket";
import { UserType } from "../../../Utils/Types";
import YapOptions from "./YapOptions";

interface FriendProps {
  user: UserType;
}

const Friend = ({ user }: FriendProps) => {
  const { onlineUserIDs } = useSocket();
  const online = onlineUserIDs.includes(user._id) ? "online" : "";

  return (
    <div className="card p-2 pl-4 bg-base-100 flex flex-row items-center gap-4">
      <div className={`avatar ${online}`}>
        <div className="w-12 h-12 rounded-full">
          <img src={user.profilePic} alt="user avatar" />
        </div>
      </div>
      <div className="flex flex-col flex-grow justify-center">
        <p className={`text-xl text-white`}>{user.fullName}</p>
        <span className={`text-md`}>{"status"}</span>
      </div>
      <YapOptions user={user} />
    </div>
  );
};

export default Friend;
