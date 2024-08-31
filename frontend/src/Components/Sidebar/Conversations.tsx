import useGetConvos from "../../Hooks/useGetConvos";
import Conversation from "./Conversation";

const Conversations = () => {
  const { loading, convos } = useGetConvos();

  return (
    <div className="py-2 flex flex-col overflow-y-auto dark-scrollbar">
      {loading ? (
        <span className="loading loading-spinner" />
      ) : (
        convos.map((convo, index) => (
          <Conversation
            key={index}
            username={convo.username}
            status="status"
            profilePic={convo.profilePic}
            numNotifs={0}
          />
        ))
      )}
    </div>
  );
};

export default Conversations;
