import { create } from "zustand";
import { StoreType, emptyUser, MessageType, UserType } from "../Utils/Types";

const useStore = create<StoreType>((set) => ({
  authUser: emptyUser,
  receiver: emptyUser,
  messages: [],
  conversations: [emptyUser],
  setAuthUser: (authUser: UserType) => set({ authUser }),
  setReceiver: (receiver: UserType) => set({ receiver }),
  setMessages: (messages: MessageType[]) => set({ messages }),
  setConversations: (conversations: UserType[]) => set({ conversations })
}));

export default useStore;
