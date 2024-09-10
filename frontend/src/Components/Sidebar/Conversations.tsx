import useGetUsers from "../../Hooks/useGetUsers";
import Conversation from "./Conversation";

const Conversations = () => {
  const { loading, users } = useGetUsers();

  return (
    <div className="flex-grow flex flex-col overflow-y-auto dark-scrollbar">
      {loading ? (
        <div className="h-full flex items-center justify-center">
          <span className="loading loading-bars loading-lg" />
        </div>
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
