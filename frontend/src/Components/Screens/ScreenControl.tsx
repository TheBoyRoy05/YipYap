import Chat from "./Chat/ChatScreen";
import useConversation from "../../Store/useConversation";
import useFriends from "../../Store/useFriends";
import DefaultScreen from "./DefaultScreen";
import FriendScreen from "./Friends/FriendScreen";

const ScreenControl = () => {
  const { conversation } = useConversation();
  const { showFriendsPage } = useFriends();

  return showFriendsPage ? (
    <FriendScreen />
  ) : conversation._id === "" ? (
    <DefaultScreen />
  ) : (
    <Chat />
  );
};

export default ScreenControl;
