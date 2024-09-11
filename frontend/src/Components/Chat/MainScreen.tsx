import ChatScreen from "./ChatScreen/ChatScreen";
import useConversation from "../../Store/useConversation";
import useFriends from "../../Store/useFriends";
import DefaultScreen from "./DefaultScreen";
import FriendScreen from "./FriendScreen/FriendScreen";

const MainScreen = () => {
  const { conversation } = useConversation();
  const { showFriendsPage } = useFriends();

  return showFriendsPage ? (
    <FriendScreen />
  ) : conversation._id === "" ? (
    <DefaultScreen />
  ) : (
    <ChatScreen />
  );
};

export default MainScreen;
