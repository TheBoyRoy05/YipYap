import { useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../../Store/useConversation";

const useReadConversation = () => {
  const [loading, setLoading] = useState(false);
  const { conversation } = useConversation();

  const readConversation = async (lastReadMessageID: string) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("jwt");
      const res = await fetch(`/api/conversation/read/${conversation._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ lastReadMessageID }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { loading, readConversation };
};

export default useReadConversation;
