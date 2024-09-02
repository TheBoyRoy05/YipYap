import { create } from "zustand";
import { UserType } from "../Hooks/useGetUsers";

interface MessageType {
  _id: string;
  __v: number;
  senderID: UserType;
  receiverID: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

interface ConversationType {
  receiverID: string;
  messages: MessageType[];
  setReceiverID: (convoID: string) => void;
  setMessages: (messages: MessageType[]) => void;
}

const useConversation = create<ConversationType>((set) => ({
  receiverID: "",
  messages: [],
  setReceiverID: (receiverID: string) => set({ receiverID }),
  setMessages: (messages: MessageType[]) => set({ messages }),
}));

export default useConversation;
