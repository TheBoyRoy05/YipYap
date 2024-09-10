import { IoCall, IoChatbubble, IoVideocam } from "react-icons/io5";
import useConversation from "../../../Store/useConversation";
import useFriends from "../../../Store/useFriends";
import { UserType } from "../../../Utils/Types";

interface YapOptionsProps {
  user: UserType;
}

const YapOptions = ({ user }: YapOptionsProps) => {
  const { setReceiver } = useConversation();
  const { setShowFriendsPage } = useFriends();

  const handleMessageClick = () => {
    setReceiver(user);
    setShowFriendsPage(false);
  };

  return (
    <div className="flex justify-evenly text-2xl my-4 min-w-36">
      <button onClick={handleMessageClick}>
        <IoChatbubble />
      </button>
      <button>
        <IoCall />
      </button>
      <button>
        <IoVideocam />
      </button>
    </div>
  );
};

export default YapOptions;
