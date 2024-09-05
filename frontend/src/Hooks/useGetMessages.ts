import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useStore from "../Store/useStore.ts";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, receiver } = useStore();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/messages/${receiver._id}`);
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setMessages(data);
      } catch (error) {
        console.error(error);
        toast.error(
          error instanceof Error ? error.message : "An unexpected error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    if (receiver._id) getMessages();
  }, [receiver._id, setMessages])

  return { loading, messages };
};

export default useGetMessages;
