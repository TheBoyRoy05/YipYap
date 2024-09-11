import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useFriends from "../../Store/useFriends";

const useGetFriends = () => {
  const [loading, setLoading] = useState(false);
  const { friends, setFriends } = useFriends();

  useEffect(() => {
    const getFriends = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("jwt");
        const res = await fetch(`/api/friends/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const friends = await res.json();
        if (friends.error) throw new Error(friends.error);

        setFriends(friends);
      } catch (error) {
        console.error(error);
        toast.error(error instanceof Error ? error.message : "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    getFriends();
  }, [setFriends]);

  return { loading, friends };
};

export default useGetFriends;
