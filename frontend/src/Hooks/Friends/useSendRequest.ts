import { useState } from "react";
import toast from "react-hot-toast";

const useSendRequest = () => {
  const [loading, setLoading] = useState(false);

  const sendFriendRequest = async (username: string) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("jwt");
      const res = await fetch(`/api/friends/requests/send?username=${username}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const request = await res.json();
      if (request.error) throw new Error(request.error);
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
