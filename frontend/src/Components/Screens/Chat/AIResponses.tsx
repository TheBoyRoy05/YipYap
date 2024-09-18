import { useEffect, useState } from "react";
import useConversation from "../../../Store/useConversation";
import { IoSparkles } from "react-icons/io5";
import { FaChevronUp } from "react-icons/fa";
import useGetResponses from "../../../Hooks/useGetResponses";

const AIResponses = () => {
  const { loading, getResponses } = useGetResponses();
  const { lastMessageTime, setMessageText } = useConversation();

  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [firstClick, setFirstClick] = useState(true);
  const [responses, setResponses] = useState<string[]>([]);

  const style = expanded ? "max-h-[300px] pt-3 pb-8" : visible ? "max-h-14 pt-2 pb-6" : "max-h-0";

  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() - lastMessageTime > 3 * 1000) {
        if (!visible) setFirstClick(true);
        setVisible(true);
      } else {
        setVisible(false);
        setExpanded(false);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [lastMessageTime, visible]);

  const handleOpenClose = async () => {
    setExpanded((prev) => !prev);
    if (firstClick) setResponses(await getResponses());
    setFirstClick(false);
  };

  const handleSelect = (text: string) => {
    setMessageText(text);
  };

  return (
    <div
      className={`mx-4 mb-[-1.25rem] bg-gray-700 px-5 rounded-t-3xl my-transition overflow-hidden ${style}`}
    >
      <button
        className="text-white font-medium flex items-center gap-x-4 mb-2 w-full"
        onClick={handleOpenClose}
      >
        <IoSparkles />
        <span className="flex-1 text-left">{"Don't know what to say? YipYap suggests..."}</span>
        {<FaChevronUp className={`${expanded ? "rotate-180" : ""} my-transition`} />}
      </button>
      {loading ? (
        <div className="h-full flex items-center justify-center">
          <span className="loading loading-dots loading-lg" />
        </div>
      ) : (
        <div className="flex gap-2">
          {responses.map((suggestedResponse, index) => (
            suggestedResponse && <button
              className={`bg-gray-800 p-4 flex-1 my-transition text-center rounded-lg ${
                !expanded && "opacity-0"
              }`}
              onClick={() => handleSelect(suggestedResponse)}
              key={index}
            >
              <span className="text-gray-200">{suggestedResponse}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AIResponses;
