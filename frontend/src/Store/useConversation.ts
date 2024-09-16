import { create } from "zustand";
import { ConversationType, emptyConversation, emptyUser, MessageType, UserType } from "../Utils/Types";
import { createSetter } from "../Utils/Functions";

interface ConvoType {
  authUser: UserType;
  searchText: string;
  messages: MessageType[];
  conversation: ConversationType;
  myConversations: ConversationType[];
  setSearchText: (searchText: string | ((prev: string) => string)) => void;
  setAuthUser: (authUser: UserType | ((prev: UserType) => UserType)) => void;
  setMessages: (messages: MessageType[] | ((prev: MessageType[]) => MessageType[])) => void;
  setConversation: (
    messages: ConversationType | ((prev: ConversationType) => ConversationType)
  ) => void;
  setMyConversations: (
    conversations: ConversationType[] | ((prev: ConversationType[]) => ConversationType[])
  ) => void;
}



const useConversation = create<ConvoType>((set) => {
  return {
    messages: [],
    searchText: "",
    authUser: emptyUser,
    myConversations: [],
    conversation: emptyConversation,
    setMessages: createSetter<ConvoType>(set)("messages"),
    setAuthUser: createSetter<ConvoType>(set)("authUser"),
    setSearchText: createSetter<ConvoType>(set)("searchText"),
    setConversation: createSetter<ConvoType>(set)("conversation"),
    setMyConversations: createSetter<ConvoType>(set)("myConversations"),
  };
});

export default useConversation;
