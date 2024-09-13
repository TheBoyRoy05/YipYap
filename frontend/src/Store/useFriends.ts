import { create } from "zustand";
import { emptyFriendRequests, FriendRequestsType, UserType } from "../Utils/Types";
import { createSetter } from "../Utils/Functions";

interface FriendsType {
  friends: UserType[];
  searchText: string;
  addingFriends: boolean;
  layout: "grid" | "list";
  showFriendsPage: boolean;
  requests: FriendRequestsType;
  setFriends: (friends: UserType[] | ((prev: UserType[]) => UserType[])) => void;
  setSearchText: (searchText: string | ((prev: string) => string)) => void;
  setAddingFriends: (addingFriends: boolean | ((prev: boolean) => boolean)) => void;
  setShowFriendsPage: (showFriendsPage: boolean | ((prev: boolean) => boolean)) => void;
  setLayout: (layout: "grid" | "list" | ((prev: "grid" | "list") => "grid" | "list")) => void;
  setRequests: (
    requests: FriendRequestsType | ((prev: FriendRequestsType) => FriendRequestsType)
  ) => void;
}

const useFriends = create<FriendsType>((set) => ({
  friends: [],
  layout: "grid",
  searchText: "",
  addingFriends: false,
  showFriendsPage: true,
  requests: emptyFriendRequests,
  setLayout: createSetter<FriendsType>(set)("layout"),
  setFriends: createSetter<FriendsType>(set)("friends"),
  setRequests: createSetter<FriendsType>(set)("requests"),
  setSearchText: createSetter<FriendsType>(set)("searchText"),
  setAddingFriends: createSetter<FriendsType>(set)("addingFriends"),
  setShowFriendsPage: createSetter<FriendsType>(set)("showFriendsPage"),
}));

export default useFriends;
