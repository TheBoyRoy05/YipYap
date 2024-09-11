/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import useFriends from "../../../Store/useFriends";
import FriendItem from "./FriendItem";
import FriendCard from "./FriendCard";
import useGetFriends from "../../../Hooks/Friends/useGetFriends";

interface CardsProps {
  layout: "grid" | "list";
}

const Friends = ({ layout }: CardsProps) => {
  const { loading, friends } = useGetFriends();
  const { setFriends } = useFriends();
  const style =
    layout === "grid" && !loading
      ? "grid grid-cols-5 content-stretch px-12 gap-x-10 gap-y-8"
      : "flex flex-col gap-y-4 px-12";

  useEffect(() => {
    setFriends(friends)
  }, [loading]);

  return (
    <div className={`flex-grow overflow-y-auto dark-scrollbar ${style}`}>
      {loading ? (
        <div className="h-full flex items-center justify-center">
          <span className="loading loading-bars loading-lg" />
        </div>
      ) : (
        friends.map((friend, index) =>
          layout === "grid" ? (
            <FriendCard key={index} friend={friend} />
          ) : (
            <FriendItem key={index} friend={friend} />
          )
        )
      )}
    </div>
  );
};

export default Friends;
