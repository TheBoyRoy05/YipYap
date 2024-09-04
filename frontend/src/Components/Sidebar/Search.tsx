import { useRef, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import useStore from "../../Store/useStore";
import { UserType } from "../../Utils/Types";

const Search = () => {
  const [search, setSearch] = useState("");
  const { conversations, setConversations } = useStore();
  const initialConversations = useRef(JSON.parse(JSON.stringify(conversations)));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setConversations(
      initialConversations.current.filter((c: UserType) =>
        c.username.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  return (
    <form className="flex h-14 bg-gray-800 rounded-full pl-4">
      <input
        type="text"
        className="flex-grow bg-transparent placeholder-slate-500 text-box"
        placeholder="Search..."
        value={search}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="flex items-center justify-center w-8 h-8 my-auto mx-2 text-lg bg-blue-500 rounded-full text-white"
      >
        <IoMdSearch />
      </button>
    </form>
  );
};

export default Search;
