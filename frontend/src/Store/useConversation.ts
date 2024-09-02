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
    fullName: "",
    username: "",
    profilePic: "",
  },
  messages: [],
  setReceiver: (receiver: ReceiverType) => set({ receiver }),
  setMessages: (messages: MessageType[]) => set({ messages }),
}));

export default useConversation;
