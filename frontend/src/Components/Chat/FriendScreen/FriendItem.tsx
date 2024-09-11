import useFriends from "../../../Store/useFriends";
import useSocket from "../../../Store/useSocket";
import { UserType } from "../../../Utils/Types";
import CancelRequest from "./Options/CancelRequest";
import RequestOptions from "./Options/RequestOptions";
import YapOptions from "./Options/YapOptions";

interface FriendProps {
  user: UserType;
  isIncomingRequest?: boolean;
}

const FriendItem = ({ user, isIncomingRequest }: FriendProps) => {
  const { addingFriends } = useFriends();
  const { onlineUserIDs } = useSocket();
  const online = onlineUserIDs.includes(user._id) ? "online" : "";

  return (
    <div className={`card bg-base-100 flex flex-row items-center gap-4 px-${isIncomingRequest ? "2" : "4"}`}>
      <div className={`avatar ${online}`}>
        <div className="w-12 h-12 rounded-full">
          <img src={user.profilePic} alt="user avatar" />
        </div>
      </div>
      <div className="flex flex-col flex-grow justify-center">
        <p className={`text-xl text-white`}>{user.fullName}</p>
        <span className={`text-md`}>{"status"}</span>
      </div>
      {addingFriends ? (
        isIncomingRequest ? (
          <RequestOptions />
        ) : (
          <CancelRequest />
        )
      ) : (
        <YapOptions user={user} />
      )}
    </div>
  );
};

export default FriendItem;
