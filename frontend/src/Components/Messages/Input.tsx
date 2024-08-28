import { FaFileUpload } from "react-icons/fa";
import { IoSend } from "react-icons/io5";

const Input = () => {
  return (
    <form action="">
      <div className="flex mx-4 mb-4 h-12 bg-gray-800 rounded-full">
        <button className="flex items-center justify-center w-8 h-8 my-auto mx-3 bg-gray-400 rounded-full text-gray-700">
          <FaFileUpload />
        </button>
        <input
          type="text"
          className="flex-grow bg-transparent placeholder-slate-500 text-box"
          placeholder="Message"
        />
        <button
          type="submit"
          className="flex items-center justify-center w-8 h-8 my-auto mx-3 bg-blue-500 rounded-full text-white"
        >
          <IoSend />
        </button>
      </div>
    </form>
  );
};

export default Input;
