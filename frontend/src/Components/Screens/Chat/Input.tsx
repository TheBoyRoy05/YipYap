import { FaFileUpload } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../../Hooks/Conversation/useSendMessage";
import useConversation from "../../../Store/useConversation";

const Input = () => {
  const { loading, sendMessage } = useSendMessage();
  const { setLastMessageTime, messageText, setMessageText } = useConversation();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!messageText) return;
    setLastMessageTime(Date.now());
    await sendMessage(messageText);
    setMessageText("");
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
          className="flex-grow bg-transparent placeholder-slate-500 text-box text-white"
          placeholder="Message"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
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
