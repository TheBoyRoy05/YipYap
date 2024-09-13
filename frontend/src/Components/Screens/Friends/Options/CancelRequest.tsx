import useHandleRequest from "../../../../Hooks/Friends/useHandleRequest";
import { OutgoingFriendRequestType } from "../../../../Utils/Types";

interface CancelRequestProps {
  request: OutgoingFriendRequestType;
}

const CancelRequest = ({ request }: CancelRequestProps) => {
  const { handleFriendRequest } = useHandleRequest();

  return (
    <div className="my-4">
      <button
        className="btn w-40 bg-red-500 hover:bg-red-600 text-white text-base"
        onClick={() => handleFriendRequest(request._id, "cancel")}
      >
        Cancel Request
      </button>
    </div>
  );
};

export default CancelRequest;
