import { useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../../Store/useConversation";

const useCreateConversation = () => {
  const [loading, setLoading] = useState(false);
  const { setConversation } = useConversation();

  const createConversation = async (participants: string[]) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("jwt");
      const res = await fetch(`/api/conversation/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ participants }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setConversation(data);
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { loading, createConversation };
};

export default useCreateConversation;
