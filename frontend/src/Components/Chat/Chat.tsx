import ChatScreen from "./ChatScreen/ChatScreen";
import useConversation from "../../Store/useConversation";
import useFriends from "../../Store/useFriends";
import DefaultScreen from "./DefaultScreen";
import FriendScreen from "./FriendScreen/FriendScreen";

const Chat = () => {
  const { receiver } = useConversation();
  const { showFriendsPage } = useFriends();

  return showFriendsPage ? (
    <FriendScreen />
  ) : receiver._id === "" ? (
    <DefaultScreen />
  ) : (
    <ChatScreen />
  );
};

export default Chat;
