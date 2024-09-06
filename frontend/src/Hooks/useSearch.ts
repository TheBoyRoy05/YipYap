import { useEffect, useRef } from "react";
import useStore from "../Store/useStore";
import { UserType } from "../Utils/Types";

const useSearch = () => {
  const { conversations, setConversations } = useStore();
  const initialConversations = useRef<UserType[] | null>(null);

  // Initialize initialConversations when conversations is first populated
  useEffect(() => {
    if (conversations.length > 0 && initialConversations.current === null) {
      initialConversations.current = JSON.parse(JSON.stringify(conversations));
    }
  }, [conversations]);

  const search = (text: string) => {
    // Ensure initialConversations is populated before filtering
    if (initialConversations.current) {
      setConversations(
        initialConversations.current.filter((c: UserType) =>
          c.username.toLowerCase().includes(text.toLowerCase())
        )
      );
    }
  };

  return { search };
};

export default useSearch;