import { FiGrid } from "react-icons/fi";
import { MdFormatListBulleted } from "react-icons/md";
import useFriends from "../../../Store/useFriends";

const LayoutSelect = () => {
  const { layout, setLayout } = useFriends();
  const btnClass = "btn flex-grow join-item p-0 text-2xl hover:bg-blue-400 hover:text-white border-none";

  return (
    <div className="flex w-40 justify-center mr-20 join">
      <button
        type="button"
        className={`${btnClass} ${layout === "grid" ? "bg-blue-500 text-white" : "bg-gray-800 text-gray-400"}`}
        onClick={() => setLayout("grid")}
      >
        <FiGrid />
      </button>
      <div className="h-full mx-0.5" />
      <button
        type="button"
        className={`${btnClass} ${layout === "list" ? "bg-blue-500 text-white" : "bg-gray-800 text-gray-400"}`}
        onClick={() => setLayout("list")}
      >
        <MdFormatListBulleted />
      </button>
    </div>
  );
}

export default LayoutSelect