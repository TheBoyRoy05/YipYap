import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../../Store/useConversation.ts";
import { MessageType } from "../../Utils/Types.ts";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { conversation, setConversation, messages, setMessages } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("jwt");
        const res = await fetch(`/api/conversation/messages/${conversation._id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const messages = await res.json();
        if (messages.error) throw new Error(messages.error);

        setConversation((prevConversation) => ({
          ...prevConversation,
          lastReadMessageID: messages.length > 0 ? messages[messages.length - 1]._id : "",
          messages: messages.map((message: MessageType) => message._id),
        }));

        setMessages(messages);
      } catch (error) {
        console.error(error);
        toast.error(error instanceof Error ? error.message : "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, [setConversation, conversation._id, setMessages]);

  return { loading, messages };
};

export default useGetMessages;
