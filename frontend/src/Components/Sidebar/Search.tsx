import { IoMdSearch } from "react-icons/io";

const Search = () => {
  return (
    <form className="flex h-12 bg-gray-800 rounded-full pl-4">
      <input
        type="text"
        className="flex-grow bg-transparent placeholder-slate-500 text-box"
        placeholder="Search..."
      />
      <button type="submit" className="flex items-center justify-center w-10 h-10 my-auto mx-1 text-xl bg-blue-500 rounded-full text-white">
        <IoMdSearch />
      </button>
    </form>
  );
};

export default Search;
