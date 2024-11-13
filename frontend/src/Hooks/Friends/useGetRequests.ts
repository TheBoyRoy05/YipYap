import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useFriends from "../../Store/useFriends";

const useGetRequests = () => {
  const [loading, setLoading] = useState(false);
  const {requests, setRequests} = useFriends();

  useEffect(() => {
    const getFriends = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("jwt");
        const res = await fetch(`/api/friends/get-requests/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const friendRequests = await res.json();
        if (friendRequests.error) throw new Error(friendRequests.error);

        setRequests(friendRequests);
      } catch (error) {
        console.error(error);
        toast.error(error instanceof Error ? error.message : "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    getFriends();
  }, [setRequests]);

  return { loading, requests };
};

export default useGetRequests;
