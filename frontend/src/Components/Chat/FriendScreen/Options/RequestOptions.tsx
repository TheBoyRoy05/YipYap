import { FaCheck, FaTimes } from "react-icons/fa";

const RequestOptions = () => {
  return (
    <div className="flex justify-evenly text-2xl my-4 min-w-36">
      <button className="btn btn-circle bg-green-500 hover:bg-green-600 text-white text-xl">
        <FaCheck />
      </button>
      <button className="btn btn-circle bg-red-500 hover:bg-red-600 text-white text-xl">
        <FaTimes />
      </button>
    </div>
  );
}

export default RequestOptions