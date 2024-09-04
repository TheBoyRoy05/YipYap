import { IoMdSearch } from "react-icons/io";

const Search = () => {
  return (
    <form className="flex h-14 bg-gray-800 rounded-full pl-4">
      <input
        type="text"
        className="flex-grow bg-transparent placeholder-slate-500 text-box"
        placeholder="Search..."
      />
      <button type="submit" className="flex items-center justify-center w-8 h-8 my-auto mx-2 text-lg bg-blue-500 rounded-full text-white">
        <IoMdSearch />
      </button>
    </form>
  );
};

export default Search;
