import { useEffect, useRef } from "react";
import useConversation from "../Store/useConversation";
import { UserType } from "../Utils/Types";

const useSearch = () => {
  const { conversations } = useConversation();
  const initialConversations = useRef<UserType[] | null>(null);

  // Initialize initialConversations when conversations is first populated
  useEffect(() => {
    if (conversations.length > 0 && initialConversations.current === null) {
      initialConversations.current = JSON.parse(JSON.stringify(conversations));
    }
  }, [conversations]);

  const search = (text: string, setter: (users: UserType[]) => void) => {
    if (initialConversations.current) {
      setter(
        initialConversations.current.filter((c: UserType) =>
          c.fullName.toLowerCase().includes(text.toLowerCase())
        )
      );
    }
  };

  return { search };
};

export default useSearch;