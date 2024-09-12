import Button from "../Form/Button";
import ConvoSearch from "./ConvoSearch";
import Conversations from "./Conversations";
import useLogout from "../../Hooks/Auth/useLogout";
import Title from "./Title";
import useGetMyConversations from "../../Hooks/Conversation/useGetMyConversations";
import useConversation from "../../Store/useConversation";
import { useEffect, useState } from "react";

const Siderbar = () => {
  const { searchText } = useConversation();
  const { loading: logoutLoading, logout } = useLogout();
  const { loading: convosLoading, myConversations } = useGetMyConversations();
  const [filteredConversations, setFilteredConversations] = useState(myConversations);

  useEffect(() => {
    setFilteredConversations(myConversations.filter((conversation) =>
      conversation.name.toLowerCase().includes(searchText.toLowerCase())
    ));
  }, [myConversations, searchText])

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
