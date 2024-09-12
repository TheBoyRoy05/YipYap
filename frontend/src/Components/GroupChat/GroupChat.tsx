import useGetFriends from "../../Hooks/Friends/useGetFriends";
import useGroupChat from "../../Store/useGroupChat";
import Friend from "../Chat/FriendScreen/Friend";
import TagInput from "./TagInput";

const GroupChat = () => {
  const { popup, setPopup, setSearchText, setSelectedFriends } = useGroupChat();
  const { loading, friends } = useGetFriends();

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
            <div className="flex flex-col gap-y-4 mt-4">
              {loading ? (
                <div className="h-full flex items-center justify-center">
                  <span className="loading loading-bars loading-lg" />
                </div>
              ) : (
                friends.map((friend, index) => (
                  <button className="w-full" onClick={() => {
                    setSearchText("");
                    setSelectedFriends(prev => [...prev, friend])
                  }}>
                    <Friend key={index} data={friend} layoutType="list" />
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GroupChat;
