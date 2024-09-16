import { useState } from "react";
import toast from "react-hot-toast";
import useFriends from "../../Store/useFriends";
import useConversation from "../../Store/useConversation";

const useHandleRequest = () => {
  const [loading, setLoading] = useState(false);
  const { setRequests } = useFriends();
  const { setMyConversations } = useConversation();
  type ActionType = "accept" | "decline" | "cancel";

  const handleFriendRequest = async (requestID: string, action: ActionType) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("jwt");
      const res = await fetch(`/api/friends/requests/handle/${requestID}?action=${action}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const conversation = await res.json();
      if (conversation.error) throw new Error(conversation.error);

      setRequests((prev) => ({
        incoming: prev.incoming.filter((incomingRequest) => incomingRequest._id != requestID),
        outgoing: prev.outgoing.filter((outgoingRequest) => outgoingRequest._id != requestID),
      }));

      if (action == "accept") {
        setMyConversations((prev) => [conversation, ...prev]);
      }

      const word = action == "accept" ? "accepted" : action == "decline" ? "declined" : "canceled";
      toast.success(`Friend request ${word}!`);
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleFriendRequest };
};

export default useHandleRequest;
