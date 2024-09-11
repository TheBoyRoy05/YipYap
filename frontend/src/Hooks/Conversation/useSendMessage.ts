import { useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../../Store/useConversation";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { conversation, setConversation } = useConversation();

  const sendMessage = async (messageStr: string) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("jwt");
      const res = await fetch(`/api/send-message/${conversation._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ messageStr }),
      });

      const message = await res.json();
      if (message.error) throw new Error(message.error);

      setConversation((prevConvo) => ({
        ...prevConvo,
        messages: [...prevConvo.messages, message],
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
