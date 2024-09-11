import { create } from "zustand";
import { UserType } from "../Utils/Types";
import { createSetter } from "../Utils/Functions";

interface FriendsType {
  friends: UserType[];
  showFriendsPage: boolean;
  setFriends: (friends: UserType[] | ((prev: UserType[]) => UserType[])) => void;
  setShowFriendsPage: (showFriendsPage: boolean | ((prev: boolean) => boolean)) => void;
}

const useFriends = create<FriendsType>((set) => ({
  friends: [],
  showFriendsPage: false,
  setFriends: createSetter<FriendsType>(set)("friends"),
  setShowFriendsPage: createSetter<FriendsType>(set)("showFriendsPage"),
}));

export default useFriends;