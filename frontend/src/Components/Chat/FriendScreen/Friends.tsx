import { useEffect } from "react";
import useGetUsers from "../../../Hooks/useGetUsers";
import useFriends from "../../../Store/useFriends";
import Friend from "./Friend";
import FriendCard from "./FriendCard";

interface CardsProps {
  layout: "grid" | "list";
}

const Friends = ({ layout }: CardsProps) => {
  const { loading, users } = useGetUsers();
  const { friends, setFriends } = useFriends();
  const style =
    layout === "grid" && !loading
      ? "grid grid-cols-5 content-stretch px-12 gap-x-10 gap-y-8"
      : "flex flex-col gap-y-4 px-12";

  useEffect(() => setFriends(users), [users, setFriends, loading]);

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
            <Friend key={index} user={friend} />
          )
        )
      )}
    </div>
  );
};

export default Friends;
