import { create } from "zustand";
import { ConversationType, emptyConversation, emptyUser, UserType } from "../Utils/Types";

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
  // Helper function to handle both direct values and callbacks (Thanks ChatGPT)
  const createSetter =
    <T extends keyof ConvoType>(key: T) =>
    (value: ConvoType[T] | ((prev: ConvoType[T]) => ConvoType[T])) =>
      set((state: ConvoType) => ({
        [key]:
          typeof value === "function"
            ? (value as (prev: ConvoType[T]) => ConvoType[T])(state[key])
            : value,
      }));

  return {
    authUser: emptyUser,
    conversation: emptyConversation,
    myConversations: [],
    setAuthUser: createSetter("authUser"),
    setConversation: createSetter("conversation"),
    setMyConversations: createSetter("myConversations"),
  };
});

export default useConversation;
