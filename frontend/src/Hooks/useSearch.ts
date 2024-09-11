import { useEffect, useRef } from "react";
import useConversation from "../Store/useConversation";
import { ConversationType, UserType } from "../Utils/Types";
import useFriends from "../Store/useFriends";

const useSearch = () => {
  const { myConversations, setMyConversations } = useConversation();
  const initialConversations = useRef<ConversationType[] | null>(null);

  // Initialize initialConversations when conversations is first populated
  useEffect(() => {
    if (myConversations.length > 0 && initialConversations.current === null) {
      initialConversations.current = JSON.parse(JSON.stringify(myConversations));
    }
  }, [myConversations]);

  const convoSearch = (text: string) => {
    if (initialConversations.current) {
      setMyConversations(
        initialConversations.current.filter((conversation) =>
          conversation.name.toLowerCase().includes(text.toLowerCase())
        )
      );
    }
  };

  const { friends, setFriends } = useFriends();
  const initialFriends = useRef<UserType[] | null>(null);

  // Initialize initialFriends when friends is first populated
  useEffect(() => {
    if (friends.length > 0 && initialFriends.current === null) {
      initialFriends.current = JSON.parse(JSON.stringify(friends));
    }
  }, [friends]);

  const friendSearch = (text: string) => {
    if (initialFriends.current) {
      setFriends(
        initialFriends.current.filter((friend) =>
          friend.fullName.toLowerCase().includes(text.toLowerCase())
        )
      );
    }
  };

  return { convoSearch, friendSearch };
};

export default useSearch;
