import { FaPlus, FaUserFriends } from "react-icons/fa";
import useFriends from "../../Store/useFriends";
import useConversation from "../../Store/useConversation";
import { emptyConversation } from "../../Utils/Types";
import useGroupChat from "../../Store/useGroupChat";

const Title = () => {
  const { showFriendsPage, setShowFriendsPage } = useFriends();
  const { setConversation } = useConversation();
  const { popup, setPopup } = useGroupChat();

  const btnClass = `btn btn-sm border-0 px-2 text-xl rounded-md hover:bg-blue-500 hover:text-white flex items-center justify-center ml-2 text-gray-400`;
  const friendsBtn = showFriendsPage ? "bg-blue-500 text-white" : "bg-opacity-0";
  const addBtn = popup ? "bg-blue-500 text-white" : "bg-opacity-0";

  const handleFriendsClick = () => {
    if (!showFriendsPage) setConversation(emptyConversation);
    setShowFriendsPage((prev) => !prev);
  };

  const handleAddGroupChatClick = () => {
    setPopup(prev => !prev);
  };

  return (
    <div className="flex w-72 h-12 items-center px-2 mt-2 border-b">
      <span className="flex-grow text-white font-bold text-xl">{"Yap Sessions"}</span>
      <button className={`${btnClass} ${friendsBtn}`} onClick={handleFriendsClick}>
        <FaUserFriends  />
      </button>
      <button className={`${btnClass} ${addBtn}`} onClick={handleAddGroupChatClick}>
        <FaPlus />
      </button>
    </div>
  );
};

export default Title;
