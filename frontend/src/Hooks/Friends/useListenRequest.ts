/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import useSocket from "../../Store/useSocket";
import { ConversationType, FriendRequestType, IncomingFriendRequestType } from "../../Utils/Types";
import useFriends from "../../Store/useFriends";
import useConversation from "../../Store/useConversation";

interface AcceptFriendRequestType {
  request: FriendRequestType;
  conversation: ConversationType;
}

const useListenRequest = () => {
  const { socket } = useSocket();
  const { setRequests } = useFriends();
  const { setMyConversations } = useConversation();

  useEffect(() => {
    socket?.on("newFriendRequest", (request: IncomingFriendRequestType) => {
      setRequests((prev) => ({
        ...prev,
        incoming: [...prev.incoming, request],
      }));
    });

    socket?.on("acceptFriendRequest", ({ request, conversation }: AcceptFriendRequestType) => {
      setRequests((prev) => ({
        ...prev,
        outgoing: prev.outgoing.filter((req) => req._id !== request._id),
      }));
      setMyConversations((prev) => [conversation, ...prev]);
    });

    return () => {
      if (socket) {
        socket.off("newFriendRequest");
        socket.off("acceptFriendRequest");
      }
    };
  }, [socket]);
};

export default useListenRequest;
