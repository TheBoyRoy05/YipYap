import { useState } from "react";
import toast from "react-hot-toast";
import { FriendRequestsType } from "../../Utils/Types";
import useFriends from "../../Store/useFriends";

const useSendRequest = () => {
  const [loading, setLoading] = useState(false);
  const { setRequests } = useFriends();

  const sendFriendRequest = async (username: string) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("jwt");
      const res = await fetch(`/api/friends/send-request?username=${username}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const request = await res.json();
      if (request.error) throw new Error(request.error);
      setRequests((prev: FriendRequestsType) => ({
        ...prev,
        outgoing: [...prev.outgoing, request],
      }));
      toast.success("Friend request sent!");
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendFriendRequest };
};

export default useSendRequest;
