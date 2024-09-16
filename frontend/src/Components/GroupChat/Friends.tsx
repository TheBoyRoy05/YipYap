import useGroupChat from "../../Store/useGroupChat";
import { UserType } from "../../Utils/Types";
import Friend from "../Screens/Friends/Friend";

interface FriendsProps {
  friends: UserType[];
}

const Friends = ({ friends }: FriendsProps) => {
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
      {friends.map((friend, index) => (
        <button key={index} type="button" className="w-full" onClick={() => handleClick(friend)}>
          <Friend data={friend} layoutType="list" />
        </button>
      ))}
    </div>
  );
};

export default Friends;
