export const emptyUser = {
  _id: "",
  __v: 0,
  fullName: "",
  gender: "",
  profilePic: "",
  username: ""
}

export interface UserType {
  _id: string;
  __v: number;
  fullName: string;
  gender: string;
  profilePic: string;
  username: string;
}

export interface MessageType {
  _id: string;
  __v: number;
  senderID: string;
  receiverID: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export interface StoreType {
  authUser: UserType;
  receiver: UserType;
  messages: MessageType[];
  conversations: UserType[];
  setAuthUser: (authUser: UserType) => void;
  setReceiver: (receiver: UserType) => void;
  setMessages: (messages: MessageType[]) => void;
  setConversations: (conversation: UserType[]) => void;
}