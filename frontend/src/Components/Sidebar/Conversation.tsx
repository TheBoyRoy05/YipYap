import useGetConvo from "../../Hooks/useGetConvo";
import useConversation from "../../Store/useConversation";

interface ConvoProps {
  receiverID: string;
  username: string;
  status: string;
  profilePic: string;
  numNotifs: number;
}

const Conversation = (props: ConvoProps) => {
  const { receiverID, username, status, profilePic, numNotifs } = props;
  const { setReceiver } = useConversation();
  const { loading, getConvo } = useGetConvo();

  const handleClick = () => {
    setReceiver({ _id: receiverID, username, profilePic });
    getConvo(receiverID);
  };

  return (
    <button onClick={handleClick}>
      <div className="flex gap-2 items-center hover:bg-sky-500 rounded-lg p-2 py-1 cursor-pointer group text-left">
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img src={profilePic} alt="user avatar" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <p className="text-gray-200 group-hover:text-white">
            {loading ? (
              <span className="loading loading-dots loading-xs"></span>
            ) : (
              username
            )}
          </p>
          <span className="text-sm text-gray-400 group-hover:text-gray-200">
            {status}
          </span>
        </div>
        {numNotifs > 0 ? (
          <div className="w-6 h-6 rounded-full bg-green-500 text-gray-50 text-xs font-bold flex justify-center items-center">
            {numNotifs}
          </div>
        ) : (
          <></>
        )}
      </div>
    </button>
  );
};

export default Conversation;
