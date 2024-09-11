import useFriends from "../../../Store/useFriends";
import FriendItem from "./FriendItem";
import FriendCard from "./FriendCard";
import useGetFriends from "../../../Hooks/Friends/useGetFriends";

const Friends = () => {
  const { loading, friends } = useGetFriends();
  const { layout } = useFriends();
  const style =
    layout === "grid" && !loading
      ? "grid grid-cols-5 content-stretch px-12 gap-x-10 gap-y-8"
      : "flex flex-col gap-y-4 px-12";

  return (
    <div className={`flex-grow overflow-y-auto dark-scrollbar ${style}`}>
      {loading ? (
        <div className="h-full flex items-center justify-center">
          <span className="loading loading-bars loading-lg" />
        </div>
      ) : (
        friends.map((friend, index) =>
          layout === "grid" ? (
            <FriendCard key={index} user={friend} />
          ) : (
            <FriendItem key={index} user={friend} />
          )
        )
      )}
    </div>
  );
};

export default Friends;
