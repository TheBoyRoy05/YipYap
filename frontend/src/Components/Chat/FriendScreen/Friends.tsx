import useGetUsers from "../../../Hooks/useGetUsers";
import Friend from "./Friend";
import FriendCard from "./FriendCard";

interface CardsProps {
  layout: "grid" | "list";
}

const Friends = ({ layout }: CardsProps) => {
  const { loading, users } = useGetUsers();
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
        users.map((user, index) => layout === "grid" ? <FriendCard key={index} user={user} /> : <Friend key={index} user={user} />)
      )}
    </div>
  );
};

export default Friends;
