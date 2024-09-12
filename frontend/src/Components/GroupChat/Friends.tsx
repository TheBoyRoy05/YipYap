import useGroupChat from "../../Store/useGroupChat";
import { UserType } from "../../Utils/Types";
import Friend from "../Chat/FriendScreen/Friend";

interface FriendsProps {
  loading: boolean;
  friends: UserType[];
}

const Friends = ({ loading, friends }: FriendsProps) => {
  const { setSearchText, selectedFriends, setSelectedFriends } = useGroupChat();

  const handleClick = (friend: UserType) => {
    if (selectedFriends.some((addedFriend) => addedFriend._id === friend._id)) {
      setSelectedFriends((prev) => prev.filter((addedFriend) => addedFriend._id !== friend._id));
    } else {
      setSearchText("");
      setSelectedFriends((prev) => [...prev, friend]);
    }
  };

  return (
    <div className="flex flex-col flex-grow gap-y-4 mt-4 overfow-y-auto dark-scrollbar">
      {loading ? (
        <div className="h-full flex items-center justify-center">
          <span className="loading loading-bars loading-lg" />
        </div>
      ) : (
        friends.map((friend, index) => (
          <button key={index} type="button" className="w-full" onClick={() => handleClick(friend)}>
            <Friend data={friend} layoutType="list" />
          </button>
        ))
      )}
    </div>
  );
};

export default Friends;
