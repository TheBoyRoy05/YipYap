import { useState } from "react";
import toast from "react-hot-toast";

interface SendMessageProps {
  senderID: string;
  receiverID: string;
  message: string;
}

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);

  const sendMessage = async (props: SendMessageProps) => {
    const { receiverID } = props;

    setLoading(true);
    try {
      const res = await fetch(`/api/messages/send/${receiverID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(props),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);
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
