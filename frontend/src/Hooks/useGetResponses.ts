import { useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../Store/useConversation";

const useGetResponses = () => {
  const [loading, setLoading] = useState(false);
  const { messages } = useConversation();

  const getResponses = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("jwt");
      const res = await fetch(`/api/AI/responses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ messages: messages.map((message) => message.message) }),
      });

      const responses = await res.json();
      if (responses.error) throw new Error(responses.error);

      return responses;
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { loading, getResponses };
};

export default useGetResponses;
