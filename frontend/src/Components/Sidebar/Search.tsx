import { IoMdSearch } from "react-icons/io";

const Search = () => {
  return (
    <form className="flex items-center gap-2">
      <input
        type="text"
        className="input input-bordered rounded-full"
        placeholder="Search..."
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white text-xl">
        <IoMdSearch />
      </button>
    </form>
  );
};

export default Search;
