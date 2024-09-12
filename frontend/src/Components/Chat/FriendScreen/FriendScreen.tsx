import { FaUserFriends } from "react-icons/fa";
import FriendSearch from "./FriendSearch";
import Friends from "./Friends";
import LayoutSelect from "./LayoutSelect";
import useFriends from "../../../Store/useFriends";
import FriendRequests from "./FriendRequests";
import useGetFriends from "../../../Hooks/Friends/useGetFriends";
import { useEffect, useState } from "react";

const FriendScreen = () => {
  const { loading, friends } = useGetFriends();
  const [filteredFriends, setFilteredFriends] = useState(friends);
  const { addingFriends, setAddingFriends, searchText } = useFriends();

  useEffect(() => {
    setFilteredFriends(
      friends.filter((friend) => friend.fullName.toLowerCase().includes(searchText.toLowerCase()))
    );
  }, [friends, searchText]);

  const headerBg = addingFriends ? "bg-blue-500" : "bg-slate-500 bg-opacity-30";
  const btnBg = addingFriends ? "bg-slate-700 hover:bg-slate-800" : "bg-blue-500 hover:bg-blue-600";

  return (
    <div className="flex flex-col w-full h-fit">
      <div className={`${headerBg} px-4 py-2 flex gap-4 items-center text-xl text-white font-bold`}>
        <FaUserFriends className="text-2xl pt-1" />
        <span className="flex-1">{`${addingFriends ? "Add" : "My"} Yappers`}</span>
        <button
          className={`flex-0 btn ${btnBg} border-none text-white text-base font-bold`}
          onClick={() => setAddingFriends((prev) => !prev)}
        >
          {`${addingFriends ? "My" : "Add"} Yappers`}
        </button>
      </div>
      <div className="flex items-center pt-10 pb-6">
        <FriendSearch />
        <LayoutSelect />
      </div>
      {addingFriends ? <FriendRequests /> : <Friends loading={loading} friends={filteredFriends} />}
    </div>
  );
};

export default FriendScreen;
