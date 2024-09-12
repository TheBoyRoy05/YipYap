import useGroupChat from "../../Store/useGroupChat";
import { UserType } from "../../Utils/Types";

const TagInput = () => {
  const { searchText, setSearchText, selectedFriends, setSelectedFriends } = useGroupChat();
  
  const handleRemoveTag = (friendToRemove: UserType) => {
    setSelectedFriends(prev => prev.filter((friend) => friend._id != friendToRemove._id));
  };

  return (
    <div className="flex items-center bg-gray-700 rounded-lg px-2">
      {selectedFriends.map((friend, index) => (
        <span key={index} className="flex items-center bg-gray-800 px-2 py-1 rounded mr-2">
          {friend.fullName}
          <button className="ml-2 text-red-500" onClick={() => handleRemoveTag(friend)}>
            &times;
          </button>
        </span>
      ))}
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="flex-grow bg-transparent placeholder-slate-500 text-box p-2"
        placeholder="Create Yap Session..."
      />
    </div>
  );
};

export default TagInput;
