import { useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../../Store/useConversation";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { conversation, setConversation } = useConversation();

  const sendMessage = async (message: string) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("jwt");
      const res = await fetch(`/api/conversation/send-message/${conversation._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message }),
      });

      const messageRes = await res.json();
      if (messageRes.error) throw new Error(messageRes.error);

      setConversation((prevConvo) => ({
        ...prevConvo,
        messages: [...prevConvo.messages, messageRes],
      }));
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
};

export default useSendMessage;
