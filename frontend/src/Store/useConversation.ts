import { create } from "zustand";
import { ConversationType, emptyConversation, emptyUser, UserType } from "../Utils/Types";
import { createSetter } from "../Utils/Functions";

interface ConvoType {
  authUser: UserType;
  searchText: string;
  conversation: ConversationType;
  myConversations: ConversationType[];
  setSearchText: (searchText: string | ((prev: string) => string)) => void;
  setAuthUser: (authUser: UserType | ((prev: UserType) => UserType)) => void;
  setConversation: (
    messages: ConversationType | ((prev: ConversationType) => ConversationType)
  ) => void;
  setMyConversations: (
    conversations: ConversationType[] | ((prev: ConversationType[]) => ConversationType[])
  ) => void;
}



const useConversation = create<ConvoType>((set) => {
  return {
    searchText: "",
    authUser: emptyUser,
    myConversations: [],
    conversation: emptyConversation,
    setAuthUser: createSetter<ConvoType>(set)("authUser"),
    setSearchText: createSetter<ConvoType>(set)("searchText"),
    setConversation: createSetter<ConvoType>(set)("conversation"),
    setMyConversations: createSetter<ConvoType>(set)("myConversations"),
  };
});

export default useConversation;
