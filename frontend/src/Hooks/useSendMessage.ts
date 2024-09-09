import { useState } from "react";
import toast from "react-hot-toast";
import useStore from "../Store/useStore";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, receiver } = useStore();

  const sendMessage = async (message: string) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("jwt");
      const res = await fetch(`/api/messages/send/${receiver._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setMessages([...messages, data]);
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
};

export default useSendMessage;
