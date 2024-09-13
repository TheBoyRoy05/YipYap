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
import useGroupChat from "../../../Store/useGroupChat";

interface FriendProps {
  data: UserType | IncomingFriendRequestType | OutgoingFriendRequestType;
  requestType?: "incoming" | "outgoing";
  layoutType?: "grid" | "list";
}

const Friend = ({ data, requestType, layoutType }: FriendProps) => {
  const { selectedFriends } = useGroupChat();

  let { layout } = useFriends();
  layout = layoutType || layout;

  const user =
    requestType == "incoming"
      ? (data as IncomingFriendRequestType).sender
      : requestType == "outgoing"
      ? (data as OutgoingFriendRequestType).receiver
      : (data as UserType);

  const paddingStyle =
    requestType == "incoming" ? "pl-4 pr-2" : requestType == "outgoing" ? "px-4" : "px-4 py-2";
  const containerStyle =
    layout == "grid"
      ? "px-4 overflow-visible mt-10 text-center"
      : `flex flex-row items-center gap-4`;
  const avatarStyle = layout == "grid" ? "mx-auto top-[-1.75rem] mb-[-1rem]" : "";

  const { onlineUserIDs } = useSocket();
  const online = onlineUserIDs.includes(user._id) ? "online" : "";

  return (
    <div className={`card dark:bg-base-100 ${containerStyle} ${paddingStyle}`}>
      <div className={`avatar ${online} ${avatarStyle}`}>
        <div className={`${layout == "grid" ? "w-14" : "w-12"} rounded-full`}>
          <img src={user.profilePic} alt="user avatar" />
        </div>
      </div>
      <div className={`flex-grow ${layout == "list" && "flex flex-col justify-center text-left"}`}>
        <p className={`text-xl text-white`}>
          {layout == "grid" && user.fullName.length > 13
            ? user.fullName.slice(0, 13) + "..."
            : user.fullName}
        </p>
        <span className={`${layout == "grid" ? "text-lg" : "text-md"}`}>{"status"}</span>
      </div>
      {layoutType ? (
        <input
          type="checkbox"
          className="checkbox"
          onChange={() => {}}
          checked={selectedFriends.some((friend) => friend._id === user._id)}
        />
      ) : requestType == "incoming" ? (
        <RequestOptions request={data as IncomingFriendRequestType} />
      ) : requestType == "outgoing" ? (
        <CancelRequest request={data as OutgoingFriendRequestType} />
      ) : (
        <YapOptions user={user} />
      )}
    </div>
  );
};

export default Friend;
