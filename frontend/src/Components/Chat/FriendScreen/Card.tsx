import { IoCall, IoChatbubble, IoVideocam } from "react-icons/io5";
import useSocket from "../../../Store/useSocket";
import { UserType } from "../../../Utils/Types";

interface CardProps {
  user: UserType;
}

const Card = ({ user }: CardProps) => {
  const { onlineUserIDs } = useSocket();
  const online = onlineUserIDs.includes(user._id);

  return (
    <div className="card bg-base-100 px-4 overflow-visible mt-10 text-center">
      <div
        className={`avatar mx-auto top-[-1.75rem] mb-[-1rem] ${
          online ? "online" : ""
        }`}
      >
        <div className="w-14 rounded-full">
          <img src={user.profilePic} alt="user avatar" />
        </div>
      </div>
      <div className="flex-grow">
        <p className={`text-2xl text-gray-200 group-hover:text-white`}>
          {user.fullName.length > 12 ? user.fullName.slice(0, 12) + "..." : user.fullName}
        </p>
        <span className={`text-lg group-hover:text-gray-200`}>{"status"}</span>
      </div>
      <div className="flex justify-evenly text-2xl my-4">
        <button>
          <IoChatbubble />
        </button>
        <button>
          <IoCall />
        </button>
        <button>
          <IoVideocam />
        </button>
      </div>
    </div>
  );
};

export default Card;
