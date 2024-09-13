import { FaCheck, FaTimes } from "react-icons/fa";
import { IncomingFriendRequestType } from "../../../../Utils/Types";
import useHandleRequest from "../../../../Hooks/Friends/useHandleRequest";

interface RequestOptionsProps {
  request: IncomingFriendRequestType;
}

const RequestOptions = ({ request }: RequestOptionsProps) => {
  const { handleFriendRequest } = useHandleRequest();

  return (
    <div className="flex justify-evenly text-2xl my-4 min-w-36">
      <button
        className="btn btn-circle bg-green-500 hover:bg-green-600 text-white text-xl"
        onClick={() => handleFriendRequest(request._id, "accept")}
      >
        <FaCheck />
      </button>
      <button
        className="btn btn-circle bg-red-500 hover:bg-red-600 text-white text-xl"
        onClick={() => handleFriendRequest(request._id, "decline")}
      >
        <FaTimes />
      </button>
    </div>
  );
};

export default RequestOptions;
