import { create } from "zustand";
import { UserType } from "../Utils/Types";

interface FriendsType {
  showFriendsPage: boolean;
  toggleFriendsPage: () => void;
  setShowFriendsPage: (showFriendsPage: boolean) => void;
  friends: UserType[];
  setFriends: (friends: UserType[]) => void;
}

const useFriends = create<FriendsType>((set) => ({
  showFriendsPage: false,
  toggleFriendsPage: () =>
    set((state) => ({ showFriendsPage: !state.showFriendsPage })),
  setShowFriendsPage: (showFriendsPage: boolean) => set({ showFriendsPage }),
  friends: [],
  setFriends: (friends: UserType[]) => set({ friends }),
}));

export default useFriends;