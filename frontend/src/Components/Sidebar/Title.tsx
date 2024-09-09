import { FaPlus, FaUserFriends } from "react-icons/fa";

const Title = () => {
  const btnClass = "w-8 h-8 text-xl rounded-md hover:bg-blue-500 hover:text-white flex items-center justify-center ml-2";

  return (
    <div className="flex w-72 h-12 items-center px-2 mt-2">
      <span className="flex-grow text-white font-bold text-xl">{"Yap Sessions"}</span>
      <button className={btnClass}>
        <FaUserFriends />
      </button>
      <button className={btnClass}>
        <FaPlus />
      </button>
    </div>
  );
};

export default Title;
