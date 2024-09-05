import { create } from "zustand";
import { emptyUser, MessageType, UserType } from "../Utils/Types";

interface StoreType {
  authUser: UserType;
  receiver: UserType;
  messages: MessageType[];
  conversations: UserType[];
  setAuthUser: (authUser: UserType) => void;
  setReceiver: (receiver: UserType) => void;
  setMessages: (messages: MessageType[]) => void;
  setConversations: (conversation: UserType[]) => void;
}

const useStore = create<StoreType>((set) => ({
  authUser: emptyUser,
  receiver: emptyUser,
  messages: [],
  conversations: [],
  setAuthUser: (authUser: UserType) => set({ authUser }),
  setReceiver: (receiver: UserType) => set({ receiver }),
  setMessages: (messages: MessageType[]) => set({ messages }),
  setConversations: (conversations: UserType[]) => set({ conversations })
}));

export default useStore;
