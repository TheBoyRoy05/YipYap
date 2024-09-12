import { create } from "zustand";
import { createSetter } from "../Utils/Functions";
import { UserType } from "../Utils/Types";

interface GroupChatType {
  popup: boolean;
  searchText: string;
  selectedFriends: UserType[];
  setPopup: (popup: boolean | ((prev: boolean) => boolean)) => void;
  setSearchText: (searchText: string | ((prev: string) => string)) => void;
  setSelectedFriends: (friends: UserType[] | ((prev: UserType[]) => UserType[])) => void;
}

const useGroupChat = create<GroupChatType>((set) => ({
  popup: false,
  searchText: "",
  selectedFriends: [],
  setPopup: createSetter<GroupChatType>(set)("popup"),
  setSearchText: createSetter<GroupChatType>(set)("searchText"),
  setSelectedFriends: createSetter<GroupChatType>(set)("selectedFriends"),
}));

export default useGroupChat;