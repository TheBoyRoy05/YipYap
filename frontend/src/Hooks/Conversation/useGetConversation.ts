import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../../Store/useConversation.ts";

const useGetConversation = (conversationID: string) => {
  const [loading, setLoading] = useState(false);
  const { conversation, setConversation } = useConversation();

  useEffect(() => {
    const getConversation = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("jwt");
        const res = await fetch(`/api/conversation/${conversationID}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const conversation = await res.json();
        if (conversation.error) throw new Error(conversation.error);
        
        setConversation(conversation);
      } catch (error) {
        console.error(error);
        toast.error(error instanceof Error ? error.message : "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    getConversation();
  }, [conversationID, setConversation]);

  return { loading, conversation };
};

export default useGetConversation;
