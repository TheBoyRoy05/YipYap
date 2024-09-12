import useGroupChat from "../../Store/useGroupChat";
import { UserType } from "../../Utils/Types";
import Friend from "../Chat/FriendScreen/Friend";

interface FriendsProps {
  loading: boolean;
  friends: UserType[];
}

const Friends = ({ loading, friends }: FriendsProps) => {
  const { setSearchText, setSelectedFriends } = useGroupChat();

  return (
    <div className="flex flex-col gap-y-4 mt-4">
      {loading ? (
        <div className="h-full flex items-center justify-center">
          <span className="loading loading-bars loading-lg" />
        </div>
      ) : (
        friends.map((friend, index) => (
          <button
            key={index}
            className="w-full"
            onClick={() => {
              setSearchText("");
              setSelectedFriends((prev) => [...prev, friend]);
            }}
          >
            <Friend data={friend} layoutType="list" />
          </button>
        ))
      )}
    </div>
  );
};

export default Friends;
