import { useEffect, useState } from "react";
import useGetFriends from "../../Hooks/Friends/useGetFriends";
import useGroupChat from "../../Store/useGroupChat";
import TagInput from "./TagInput";
import Friends from "./Friends";

const GroupChat = () => {
  const { loading, friends } = useGetFriends();
  const [filteredFriends, setFilteredFriends] = useState(friends);
  const { popup, setPopup, searchText, setSearchText, setSelectedFriends } = useGroupChat();

  useEffect(() => {
    setFilteredFriends(
      friends.filter((friend) => friend.fullName.toLowerCase().includes(searchText.toLowerCase()))
    );
  }, [friends, searchText]);

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      setPopup(false);
      setSearchText("");
      setSelectedFriends([]);
    }
  };

  return (
    <>
      {popup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleClickOutside}
        >
          <div className="card bg-base-300 p-4 w-[800px]">
            <TagInput />
            <Friends loading={loading} friends={filteredFriends} />
          </div>
        </div>
      )}
    </>
  );
};

export default GroupChat;
