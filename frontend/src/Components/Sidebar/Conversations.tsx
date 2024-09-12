import { ConversationType } from "../../Utils/Types.ts";
import Conversation from "./Conversation.tsx";

interface ConversationsProps {
  loading: boolean;
  conversations: ConversationType[];
}

const Conversations = ({loading, conversations} : ConversationsProps) => {
  return (
    <div className="flex-grow flex flex-col overflow-y-auto dark-scrollbar">
      {loading ? (
        <div className="h-full flex items-center justify-center">
          <span className="loading loading-bars loading-lg" />
        </div>
      ) : (
        conversations.map((conversation, index) => (
          <Conversation key={index} conversation={conversation} numNotifs={0} />
        ))
      )}
    </div>
  );
};

export default Conversations;
