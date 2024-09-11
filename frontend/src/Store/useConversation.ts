import { create } from "zustand";
import { ConversationType, emptyConversation, emptyUser, UserType } from "../Utils/Types";
import { createSetter } from "../Utils/Functions";

interface ConvoType {
  authUser: UserType;
  conversation: ConversationType;
  myConversations: ConversationType[];
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
    authUser: emptyUser,
    conversation: emptyConversation,
    myConversations: [],
    setAuthUser: createSetter<ConvoType>(set)("authUser"),
    setConversation: createSetter<ConvoType>(set)("conversation"),
    setMyConversations: createSetter<ConvoType>(set)("myConversations"),
  };
});

export default useConversation;
