import { FaPlus, FaUserFriends } from "react-icons/fa";
import useFriends from "../../Store/useFriends";
import useConversation from "../../Store/useConversation";
import { emptyUser } from "../../Utils/Types";

const Title = () => {
  const { showFriendsPage, toggleFriendsPage } = useFriends();
  const { setReceiver } = useConversation();
  const btnClass = `w-8 h-8 text-xl rounded-md hover:bg-blue-500 hover:text-white flex items-center justify-center ml-2`;

  const handleFriendsClick = () => {
    if (!showFriendsPage) setReceiver(emptyUser);
    toggleFriendsPage();
  };

  return (
    <div className="flex w-72 h-12 items-center px-2 mt-2 border-b">
      <span className="flex-grow text-white font-bold text-xl">
        {"Yap Sessions"}
      </span>
      <button
        className={btnClass + (showFriendsPage ? " bg-blue-500 text-white" : "")}
        onClick={handleFriendsClick}
      >
        <FaUserFriends />
      </button>
      <button className={btnClass}>
        <FaPlus />
      </button>
    </div>
  );
};

export default Title;
