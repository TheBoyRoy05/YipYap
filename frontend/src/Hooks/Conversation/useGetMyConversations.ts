import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../../Store/useConversation.ts";

const useGetMyConversations = () => {
  const [loading, setLoading] = useState(false);
  const { setMyConversations } = useConversation();

  useEffect(() => {
    const getMyConversations = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("jwt");
        const res = await fetch(`/api/conversation/my-conversations`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const conversations = await res.json();
        if (conversations.error) throw new Error(conversations.error);
        
        setMyConversations(conversations);
      } catch (error) {
        console.error(error);
        toast.error(error instanceof Error ? error.message : "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    getMyConversations();
  }, [setMyConversations]);

  return { loading };
};

export default useGetMyConversations;
