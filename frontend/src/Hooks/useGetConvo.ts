import { useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../Store/useConversation";

const useGetConvo = () => {
  const [loading, setLoading] = useState(false);
  const { setMessages } = useConversation();

  const getConvo = async (receiverID: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/messages/${receiverID}`);
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

  return { loading, getConvo };
};

export default useGetConvo;
