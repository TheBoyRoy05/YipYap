import useGetRequests from "../../../Hooks/Friends/useGetRequests";
import useFriends from "../../../Store/useFriends";
import FriendCard from "./FriendCard";
import FriendItem from "./FriendItem";

const FriendRequests = () => {
  const { layout } = useFriends();
  const { loading, requests } = useGetRequests();
  const { incoming, outgoing } = requests;
  const style =
    layout === "grid" && !loading
      ? "grid grid-cols-5 content-stretch px-12 gap-x-10 gap-y-8"
      : "flex flex-col gap-y-4 px-12";

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center">
          <span className="loading loading-bars loading-lg" />
        </div>
      ) : (
        <div className="flex-grow">
          {incoming.length > 0 ? (
            <p className="mx-12 mb-4 py-2 border-b-2 text-white text-xl font-bold">Incoming</p>
          ) : (
            <></>
          )}
          <div className={style}>
            {incoming.map((request, index) =>
              layout === "grid" ? (
                <FriendCard key={index} user={request.senderID} isIncomingRequest={true} />
              ) : (
                <FriendItem key={index} user={request.senderID} isIncomingRequest={true} />
              )
            )}
          </div>
          {outgoing.length > 0 ? (
            <p className="mx-12 mb-4 py-2 border-b-2 text-white text-xl font-bold">Outgoing</p>
          ) : (
            <></>
          )}
          <div className={style}>
            {outgoing.map((request, index) =>
              layout === "grid" ? (
                <FriendCard key={index} user={request.receiverID} isIncomingRequest={false} />
              ) : (
                <FriendItem key={index} user={request.receiverID} isIncomingRequest={false} />
              )
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FriendRequests;
