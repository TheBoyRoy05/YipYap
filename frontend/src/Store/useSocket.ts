import { create } from "zustand";
import { Socket } from "socket.io-client";

interface SocketType {
  socket: Socket | null;
  onlineUserIDs: string[];
  setSocket: (socket: Socket | null) => void;
  setOnlineUserIDs: (onlineUserIDs: string[]) => void;
}

const useSocket = create<SocketType>((set) => ({
  socket: null,
  onlineUserIDs: [],
  setSocket: (socket: Socket | null) => set({ socket }),
  setOnlineUserIDs: (onlineUserIDs: string[]) => set({ onlineUserIDs })
}));

export default useSocket;