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
  sender: string;
  conversation: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export interface ConversationType {
  _id: string;
  __v: number;
  name: string;
  profilePic: string;
  participants: UserType[];
  messages: MessageType[];
}

export interface IncomingFriendRequestType {
  _id: string;
  __v: number;
  sender: UserType;
  receiver: string;
}

export interface OutgoingFriendRequestType {
  _id: string;
  __v: number;
  sender: string;
  receiver: UserType;
}

export interface FriendRequestsType {
  incoming: IncomingFriendRequestType[];
  outgoing: OutgoingFriendRequestType[];
}

export const emptyUser = {
  _id: "",
  __v: 0,
  fullName: "",
  gender: "",
  profilePic: "",
  username: "",
};

export const emptyConversation = {
  _id: "",
  __v: 0,
  name: "",
  profilePic: "",
  participants: [],
  messages: [],
};

export const emptyFriendRequests = {
  incoming: <IncomingFriendRequestType[]>[],
  outgoing: <OutgoingFriendRequestType[]>[],
};
