import { FaUserFriends } from "react-icons/fa";
import FriendSearch from "./FriendSearch";
import Cards from "./Cards";

const FriendScreen = () => {
  return (
    <div className="flex flex-col w-full h-fit">
      <div className="bg-slate-500 bg-opacity-30 px-4 py-2 flex gap-4 items-center text-xl text-white font-bold">
        <FaUserFriends className="text-2xl pt-1" />
        <span className="flex-1">{"My Yappers"}</span>
        <button className="flex-0 btn bg-blue-500 hover:bg-blue-600 border-none text-white text-base font-bold">
          {"Add Yappers"}
        </button>
      </div>
      <FriendSearch />
      <Cards />
    </div>
  );
};

export default FriendScreen;
