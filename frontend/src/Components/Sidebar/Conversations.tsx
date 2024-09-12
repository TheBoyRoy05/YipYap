import useGetMyConversations from "../../Hooks/Conversation/useGetMyConversations.ts";
import useConversation from "../../Store/useConversation.ts";
import Conversation from "./Conversation.tsx";

const Conversations = () => {
  const { loading } = useGetMyConversations();
  const { myConversations } = useConversation();

  return (
    <div className="flex-grow flex flex-col overflow-y-auto dark-scrollbar">
      {loading ? (
        <div className="h-full flex items-center justify-center">
          <span className="loading loading-bars loading-lg" />
        </div>
      ) : (
        myConversations.map((conversation, index) =>
            <Conversation key={index} conversation={conversation} numNotifs={0} />
        )
      )}
    </div>
  );
};

export default Conversations;
