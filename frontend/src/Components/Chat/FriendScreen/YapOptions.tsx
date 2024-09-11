import { IoCall, IoChatbubble, IoVideocam } from "react-icons/io5";
import useConversation from "../../../Store/useConversation";
import useFriends from "../../../Store/useFriends";
import { emptyConversation, UserType } from "../../../Utils/Types";

interface YapOptionsProps {
  friend: UserType;
}

const YapOptions = ({ friend }: YapOptionsProps) => {
  const { authUser, myConversations, setConversation } = useConversation();
  const { setShowFriendsPage } = useFriends();

  const handleMessageClick = () => {
    const thisConversation = myConversations.find((conversation) => {
      const participantIDs = conversation.participants.map((p) => p._id);
      return (
        participantIDs.length === 2 &&
        participantIDs.includes(friend._id) &&
        participantIDs.includes(authUser._id)
      );
    });

    setConversation(thisConversation || emptyConversation);
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
