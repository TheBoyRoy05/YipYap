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
  const { setRequests } = useFriends();
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
      toast(`${request.senderID.fullName} sent you a friend request!`);
    });

    socket?.on("acceptFriendRequest", ({ request, conversation }: AcceptFriendRequestType) => {
      removeRequest(request);
      setMyConversations((prev) => [conversation, ...prev]);
      toast.success(`${request.receiverID.fullName} accepted your friend request!`);
    });

    socket?.on("declineFriendRequest", (request: OutgoingFriendRequestType) => {
      removeRequest(request);
      toast.error(`${request.receiverID.fullName} declined your friend request!`);
    });

    socket?.on("cancelFriendRequest", (request: IncomingFriendRequestType) => {
      removeRequest(request);
      toast.error(`${request.senderID.fullName} canceled their friend request!`);
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
