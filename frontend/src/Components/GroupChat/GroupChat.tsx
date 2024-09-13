import { useEffect, useState } from "react";
import useGetFriends from "../../Hooks/Friends/useGetFriends";
import useGroupChat from "../../Store/useGroupChat";
import TagInput from "./TagInput";
import Friends from "./Friends";
import useCreateConversation from "../../Hooks/Conversation/useCreateConversation";

const GroupChat = () => {
  const { loading: loadingFriends, friends } = useGetFriends();
  const [filteredFriends, setFilteredFriends] = useState(friends);
  const { loading: loadingCreate, createConversation } = useCreateConversation();
  const { popup, setPopup, searchText, setSearchText, selectedFriends, setSelectedFriends } =
    useGroupChat();

  useEffect(() => {
    setFilteredFriends(
      friends.filter((friend) => friend.fullName.toLowerCase().includes(searchText.toLowerCase()))
    );
  }, [friends, searchText]);

  const reset = () => {
    setPopup(false);
    setSearchText("");
    setSelectedFriends([]);
  };

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) reset();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createConversation(selectedFriends.map((friend) => friend._id));
    reset();
  };

  return (
    <>
      {popup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleClickOutside}
        >
          <form className="card bg-slate-700 p-4 w-[800px] max-h-[500px]" onSubmit={handleSubmit}>
            <p className="text-xl font-bold mb-4 border-b pb-2 text-white">Select Friends</p>
            <TagInput />
            <Friends loading={loadingFriends} friends={filteredFriends} />
            <button
              className="btn btn-block mt-6 bg-blue-500 hover:bg-blue-600 text-white text-lg disabled:bg-zinc-800"
              disabled={selectedFriends.length == 0}
              type="submit"
            >
              {loadingCreate ? <span className="loading loading-spinner" /> : "Create Yap Session"}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default GroupChat;
