import { useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../../Store/useConversation";
import { emptyConversation, emptyUser } from "../../Utils/Types";
import useFriends from "../../Store/useFriends";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser, setConversation } = useConversation();
  const { setShowFriendsPage, setAddingFriends } = useFriends();

  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      localStorage.removeItem("jwt");
      localStorage.removeItem("chat-user");

      setAuthUser(emptyUser);
      setConversation(emptyConversation);
      setShowFriendsPage(false);
      setAddingFriends(false);
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};

export default useLogout;
