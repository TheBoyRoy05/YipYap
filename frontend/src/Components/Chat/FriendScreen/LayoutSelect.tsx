import { FiGrid } from "react-icons/fi";
import { MdFormatListBulleted } from "react-icons/md";

interface LayoutSelectProps {
  layout: "grid" | "list";
  setLayout: React.Dispatch<React.SetStateAction<"grid" | "list">>;
}

const LayoutSelect = ({ layout, setLayout }: LayoutSelectProps) => {
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