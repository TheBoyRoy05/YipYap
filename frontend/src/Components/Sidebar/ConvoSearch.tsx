import { useRef, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import useSearch from "../../Hooks/useSearch";
import { IoArrowBack } from "react-icons/io5";
import useConversation from "../../Store/useConversation";

const ConvoSearch = () => {
  const { search } = useSearch();
  const [text, setText] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { setConversations } = useConversation();

  const handleButtonClick = () => {
    if (inputRef.current) {
      if (focused) inputRef.current.blur();
      else inputRef.current.focus();
      setFocused((prev) => !prev);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    search(e.target.value, setConversations);
  }

  return (
    <form className="flex w-72 h-12 bg-gray-800 rounded-2xl px-3 text-lg">
      <button
        type="button"
        className="flex items-center justify-center w-8 h-8 my-auto text-2xl text-white"
        onClick={handleButtonClick}
      >
        {focused ? <IoArrowBack /> : <IoMdSearch />}
      </button>
      <input
        type="text"
        className="flex-grow bg-transparent placeholder-slate-500 text-box p-2"
        placeholder="Search..."
        value={text}
        ref={inputRef}
        onChange={handleChange}
      />
    </form>
  );
};

export default ConvoSearch;
