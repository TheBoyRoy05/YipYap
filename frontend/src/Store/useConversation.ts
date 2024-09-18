import { create } from "zustand";
import { createSetter } from "../Utils/Functions";
import {
  ConversationType,
  emptyConversation,
  emptyUser,
  MessageType,
  UserType,
} from "../Utils/Types";

interface ConvoType {
  authUser: UserType;
  searchText: string;
  messageText: string;
  lastMessageTime: number;
  messages: MessageType[];
  conversation: ConversationType;
  myConversations: ConversationType[];
  setSearchText: (searchText: string | ((prev: string) => string)) => void;
  setMessageText: (messageText: string | ((prev: string) => string)) => void;
  setAuthUser: (authUser: UserType | ((prev: UserType) => UserType)) => void;
  setLastMessageTime: (lastMessageTime: number | ((prev: number) => number)) => void;
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
    messageText: "",
    authUser: emptyUser,
    myConversations: [],
    lastMessageTime: Date.now(),
    conversation: emptyConversation,
    setMessages: createSetter<ConvoType>(set)("messages"),
    setAuthUser: createSetter<ConvoType>(set)("authUser"),
    setSearchText: createSetter<ConvoType>(set)("searchText"),
    setMessageText: createSetter<ConvoType>(set)("messageText"),
    setConversation: createSetter<ConvoType>(set)("conversation"),
    setLastMessageTime: createSetter<ConvoType>(set)("lastMessageTime"),
    setMyConversations: createSetter<ConvoType>(set)("myConversations"),
  };
});

export default useConversation;
