import { useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../../Store/useConversation";
import { emptyUser } from "../../Utils/Types";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useConversation();

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
