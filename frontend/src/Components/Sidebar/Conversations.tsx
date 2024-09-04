import useGetUsers from "../../Hooks/useGetUsers";
import Conversation from "./Conversation";

const Conversations = () => {
  const { loading, conversations: users } = useGetUsers();

  return (
    <div className="py-2 flex flex-col overflow-y-auto dark-scrollbar">
      {loading ? (
        <span className="loading loading-spinner" />
      ) : (
        users.map((user, index) => (
          <Conversation
            key={index}
            user={user}
            numNotifs={0}
          />
        ))
      )}
    </div>
  );
};

export default Conversations;
