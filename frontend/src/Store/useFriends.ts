import { create } from "zustand";

interface FriendsType {
  showFriendsPage: boolean;
  toggleFriendsPage: () => void;
  setShowFriendsPage: (showFriendsPage: boolean) => void;
}

const useFriends = create<FriendsType>((set) => ({
  showFriendsPage: false,
  toggleFriendsPage: () =>
    set((state) => ({ showFriendsPage: !state.showFriendsPage })),
  setShowFriendsPage: (showFriendsPage: boolean) => set({ showFriendsPage }),
}));

export default useFriends;