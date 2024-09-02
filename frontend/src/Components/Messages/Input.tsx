import { useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../Hooks/useSendMessage";
import useConversation from "../../Store/useConversation";
import { useAuthContext } from "../../Context/AuthContext";

const Input = () => {
  const [message, setMessage] = useState("");
  const { authUser } = useAuthContext();
  const { receiver } = useConversation();
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    sendMessage({ senderID: authUser._id, receiverID: receiver._id, message });
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex mx-4 mb-4 h-12 bg-gray-800 rounded-full">
        <button
          type="button"
          className="flex items-center justify-center w-8 h-8 my-auto mx-3 bg-gray-400 rounded-full text-gray-700"
        >
          <FaFileUpload />
        </button>
        <input
          type="text"
          className="flex-grow bg-transparent placeholder-slate-500 text-box"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="flex items-center justify-center w-8 h-8 my-auto mx-3 bg-blue-500 rounded-full text-white"
        >
          {loading ? <span className="loading loading-spinner" /> : <IoSend />}
        </button>
      </div>
    </form>
  );
};

export default Input;
