import { create } from "zustand";

export interface MessageType {
  _id: string;
  __v: number;
  senderID: string;
  receiverID: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

interface ReceiverType {
  _id: string;
  username: string;
  profilePic: string;
}

interface ConversationType {
  receiver: ReceiverType;
  messages: MessageType[];
  setReceiver: (receiver: ReceiverType) => void;
  setMessages: (messages: MessageType[]) => void;
}

const useConversation = create<ConversationType>((set) => ({
  receiver: {
    _id: "",
    username: "",
    profilePic: "",
  },
  messages: [],
  setReceiver: (receiver: ReceiverType) => set({ receiver }),
  setMessages: (messages: MessageType[]) => set({ messages }),
}));

export default useConversation;
