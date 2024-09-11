import { useState } from "react";
import toast from "react-hot-toast";

const useHandleRequest = () => {
  const [loading, setLoading] = useState(false);
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

      const request = await res.json();
      if (request.error) throw new Error(request.error);
      if (request.message) toast.success(request.message);
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendFriendRequest: handleFriendRequest };
};

export default useHandleRequest;
