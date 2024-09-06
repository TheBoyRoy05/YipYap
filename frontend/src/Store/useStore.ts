import { create } from "zustand";
import { emptyUser, MessageType, UserType } from "../Utils/Types";

// Update the StoreType to allow for both direct values and callback functions in setters
interface StoreType {
  authUser: UserType;
  receiver: UserType;
  messages: MessageType[];
  conversations: UserType[];

  // Setters using generics to allow callbacks or direct values
  setAuthUser: (authUser: UserType | ((prev: UserType) => UserType)) => void;
  setReceiver: (receiver: UserType | ((prev: UserType) => UserType)) => void;
  setMessages: (
    messages: MessageType[] | ((prev: MessageType[]) => MessageType[])
  ) => void;
  setConversations: (
    conversations: UserType[] | ((prev: UserType[]) => UserType[])
  ) => void;
}

// Define the store
const useStore = create<StoreType>((set) => {
  // Helper function to handle both direct values and callbacks
  const createSetter =
    <T extends keyof StoreType>(key: T) =>
    (value: StoreType[T] | ((prev: StoreType[T]) => StoreType[T])) =>
      set((state: StoreType) => ({
        [key]:
          typeof value === "function"
            ? (value as (prev: StoreType[T]) => StoreType[T])(state[key])
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

export default useStore;
