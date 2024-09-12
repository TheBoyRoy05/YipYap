import { useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../../Store/useConversation";

const useCreateConversation = () => {
  const [loading, setLoading] = useState(false);
  const { setConversation, setMyConversations } = useConversation();

  const createConversation = async (participantIDs: string[]) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("jwt");
      const res = await fetch(`/api/conversation/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ participantIDs }),
      });

      const conversation = await res.json();
      if (conversation.error) throw new Error(conversation.error);

      setMyConversations((prevConversations) => [conversation, ...prevConversations]);
      setConversation(conversation);
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
