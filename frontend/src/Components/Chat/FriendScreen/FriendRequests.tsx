import useGetRequests from "../../../Hooks/Friends/useGetRequests";
import useFriends from "../../../Store/useFriends";
import Friend from "./Friend";

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
          {incoming.length > 0 && (
            <p className="mx-12 mb-4 py-2 border-b-2 text-white text-xl font-bold">
              Incoming Requests
            </p>
          )}
          <div className={style}>
            {incoming.map((request, index) => (
              <Friend key={index} data={request} requestType="incoming" />
            ))}
          </div>
          {outgoing.length > 0 && (
            <p className="mx-12 mb-4 py-2 border-b-2 text-white text-xl font-bold">
              Outgoing Requests
            </p>
          )}
          <div className={style}>
            {outgoing.map((request, index) => (
              <Friend key={index} data={request} requestType="outgoing" />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default FriendRequests;
