import useFriends from "../../../Store/useFriends";
import useSocket from "../../../Store/useSocket";
import CancelRequest from "./Options/CancelRequest";
import RequestOptions from "./Options/RequestOptions";
import YapOptions from "./Options/YapOptions";
import {
  IncomingFriendRequestType,
  OutgoingFriendRequestType,
  UserType,
} from "../../../Utils/Types";

interface FriendProps {
  data: UserType | IncomingFriendRequestType | OutgoingFriendRequestType;
  requestType?: "" | "incoming" | "outgoing";
}

const Friend = ({ data, requestType = "" }: FriendProps) => {
  const { layout } = useFriends();
  const user =
    requestType == "incoming"
      ? (data as IncomingFriendRequestType).senderID
      : requestType == "outgoing"
      ? (data as OutgoingFriendRequestType).receiverID
      : (data as UserType);

  const containerStyle =
    layout == "grid"
      ? "px-4 overflow-visible mt-10 text-center"
      : `flex flex-row items-center gap-4 ${requestType == "incoming" ? "px-2" : "px-4"}`;
  const avatarStyle = layout == "grid" ? "mx-auto top-[-1.75rem] mb-[-1rem]" : "";

  const { onlineUserIDs } = useSocket();
  const online = onlineUserIDs.includes(user._id) ? "online" : "";

  return (
    <div className={`card bg-base-100 ${containerStyle}`}>
      <div className={`avatar ${online} ${avatarStyle}`}>
        <div className={`${layout == "grid" ? "w-14" : "w-12"} rounded-full`}>
          <img src={user.profilePic} alt="user avatar" />
        </div>
      </div>
      <div className={`flex-grow ${layout == "list" ? "flex flex-col justify-center" : ""}`}>
        <p className={`text-xl text-white`}>
          {layout == "grid" && user.fullName.length > 13
            ? user.fullName.slice(0, 13) + "..."
            : user.fullName}
        </p>
        <span className={`${layout == "grid" ? "text-lg" : "text-md"}`}>{"status"}</span>
      </div>
      {requestType == "incoming" ? (
        <RequestOptions request={(data as IncomingFriendRequestType)} />
      ) : requestType == "outgoing" ? (
        <CancelRequest request={(data as OutgoingFriendRequestType)}/>
      ) : (
        <YapOptions user={user} />
      )}
    </div>
  );
};

export default Friend;
