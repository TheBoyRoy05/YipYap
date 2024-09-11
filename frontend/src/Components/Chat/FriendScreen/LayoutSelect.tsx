import { FiGrid } from "react-icons/fi";
import { MdFormatListBulleted } from "react-icons/md";
import useFriends from "../../../Store/useFriends";

const LayoutSelect = () => {
  const { layout, setLayout } = useFriends();

  return (
    <div className="flex w-40 justify-center mr-20">
      <button
        type="button"
        className={`btn ${layout == "grid" ? "bg-blue-500 text-white" : ""} flex-grow rounded-tr-none rounded-br-none p-0 text-2xl hover:bg-blue-400 hover:text-white`}
        onClick={() => setLayout("grid")}
      >
        <FiGrid />
      </button>
      <div className="border-r border-r-gray-500" />
      <button
        type="button"
        className={`btn ${layout == "list" ? "bg-blue-500 text-white" : ""} flex-grow rounded-tl-none rounded-bl-none p-0 text-2xl hover:bg-blue-400 hover:text-white`}
        onClick={() => setLayout("list")}
      >
        <MdFormatListBulleted />
      </button>
    </div>
  );
}

export default LayoutSelect