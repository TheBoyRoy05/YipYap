import Button from "../Form/Button";
import ConvoSearch from "./ConvoSearch";
import Conversations from "./Conversations";
import useLogout from "../../Hooks/Auth/useLogout";
import Title from "./Title";
import useGetMyConversations from "../../Hooks/Conversation/useGetMyConversations";
import useConversation from "../../Store/useConversation";
import { useEffect, useState } from "react";
import useListenConversation from "../../Hooks/Conversation/useListenConversation";

const Siderbar = () => {
  useListenConversation();
  const { searchText, conversation, myConversations, setMyConversations } = useConversation();
  const [filteredConversations, setFilteredConversations] = useState(myConversations);
  const { loading: convosLoading } = useGetMyConversations();
  const { loading: logoutLoading, logout } = useLogout();

  useEffect(() => {
    setFilteredConversations(
      myConversations.filter((conversation) =>
        conversation.name.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [myConversations, searchText]);

  useEffect(() => {
    if (conversation) {
      setMyConversations((prevConversations) =>
        prevConversations.map((convo) => (convo._id === conversation._id ? conversation : convo))
      );
    }
  }, [conversation, setMyConversations]);

  return (
    <div className="p-4 border-r border-slate-500 flex flex-col">
      <ConvoSearch />
      <Title />
      <Conversations loading={convosLoading} conversations={filteredConversations} />
      <Button text="Logout" loading={logoutLoading} click={logout} />
    </div>
  );
};

export default Siderbar;
