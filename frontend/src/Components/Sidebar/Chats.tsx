import useGetMyConversations from "../../Hooks/Conversation/useGetMyConversations.ts";
import useConversation from "../../Store/useConversation.ts";
import Chat from "./Chat.tsx";
import GroupChat from "./GroupChat.tsx";

const Chats = () => {
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
          conversation.participants.length > 2 ? (
            <GroupChat key={index} conversation={conversation} numNotifs={0} />
          ) : (
            <Chat key={index} conversation={conversation} numNotifs={0} />
          )
        )
      )}
    </div>
  );
};

export default Chats;
