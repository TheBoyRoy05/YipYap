/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import toast from "react-hot-toast";
import useSocket from "../../Store/useSocket";
import useFriends from "../../Store/useFriends";
import useConversation from "../../Store/useConversation";
import {
  ConversationType,
  IncomingFriendRequestType,
  OutgoingFriendRequestType,
} from "../../Utils/Types";

interface AcceptFriendRequestType {
  request: OutgoingFriendRequestType;
  conversation: ConversationType;
}

const useListenRequest = () => {
  const { socket } = useSocket();
  const { setRequests, setFriends } = useFriends();
  const { setMyConversations } = useConversation();
  
  const removeRequest = (request: { _id: string }) => {
    setRequests((prev) => ({
      incoming: prev.incoming.filter((req) => req._id !== request._id),
      outgoing: prev.outgoing.filter((req) => req._id !== request._id),
    }));
  };
  
  useEffect(() => {
    socket?.on("newFriendRequest", (request: IncomingFriendRequestType) => {
      setRequests((prev) => ({
        ...prev,
        incoming: [...prev.incoming, request],
      }));
      toast(`${request.sender.fullName} sent you a friend request!`);
    });

    socket?.on("acceptFriendRequest", ({ request, conversation }: AcceptFriendRequestType) => {
      removeRequest(request);
      setFriends(prev => [request.receiver, ...prev]);
      setMyConversations((prev) => [conversation, ...prev]);
      toast.success(`${request.receiver.fullName} accepted your friend request!`);
    });

    socket?.on("declineFriendRequest", (request: OutgoingFriendRequestType) => {
      removeRequest(request);
      toast.error(`${request.receiver.fullName} declined your friend request!`);
    });

    socket?.on("cancelFriendRequest", (request: IncomingFriendRequestType) => {
      removeRequest(request);
      toast.error(`${request.sender.fullName} canceled their friend request!`);
    });

    return () => {
      if (socket) {
        socket.off("newFriendRequest");
        socket.off("acceptFriendRequest");
        socket.off("declineFriendRequest");
        socket.off("cancelFriendRequest");
      }
    };
  }, [socket]);
};

export default useListenRequest;
