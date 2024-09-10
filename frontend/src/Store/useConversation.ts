import { create } from "zustand";
import { emptyUser, MessageType, UserType } from "../Utils/Types";

interface ConversationType {
  authUser: UserType;
  receiver: UserType;
  messages: MessageType[];
  conversations: UserType[];
  setAuthUser: (authUser: UserType | ((prev: UserType) => UserType)) => void;
  setReceiver: (receiver: UserType | ((prev: UserType) => UserType)) => void;
  setMessages: (
    messages: MessageType[] | ((prev: MessageType[]) => MessageType[])
  ) => void;
  setConversations: (
    conversations: UserType[] | ((prev: UserType[]) => UserType[])
  ) => void;
}

const useConversation = create<ConversationType>((set) => {
  // Helper function to handle both direct values and callbacks (Thanks ChatGPT)
  const createSetter =
    <T extends keyof ConversationType>(key: T) =>
    (value: ConversationType[T] | ((prev: ConversationType[T]) => ConversationType[T])) =>
      set((state: ConversationType) => ({
        [key]:
          typeof value === "function"
            ? (value as (prev: ConversationType[T]) => ConversationType[T])(state[key])
            : value,
      }));

  return {
    authUser: emptyUser,
    receiver: emptyUser,
    messages: [],
    conversations: [],
    setAuthUser: createSetter("authUser"),
    setReceiver: createSetter("receiver"),
    setMessages: createSetter("messages"),
    setConversations: createSetter("conversations"),
  };
});

export default useConversation;
