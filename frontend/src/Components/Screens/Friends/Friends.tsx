import useFriends from "../../../Store/useFriends";
import { UserType } from "../../../Utils/Types";
import Friend from "./Friend";

interface FriendsProps {
  loading: boolean;
  friends: UserType[];
}

const Friends = ({ loading, friends }: FriendsProps) => {
  const { layout } = useFriends();
  const style =
    layout === "grid" && !loading
      ? "grid grid-cols-5 content-stretch px-12 gap-x-10 gap-y-8"
      : "flex flex-col gap-y-4 px-12 mt-4";

  return (
    <div className={`flex-grow overflow-y-auto dark-scrollbar ${style}`}>
      {loading ? (
        <div className="h-full flex items-center justify-center">
          <span className="loading loading-bars loading-lg" />
        </div>
      ) : (
        friends.map((friend, index) => <Friend key={index} data={friend} />)
      )}
    </div>
  );
};

export default Friends;
