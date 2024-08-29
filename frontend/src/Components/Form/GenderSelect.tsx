import { FaFemale, FaMale } from "react-icons/fa";

interface GenderSelectProps {
  gender: string;
  setGender: React.Dispatch<React.SetStateAction<string>>;
}

const GenderSelect = ({ gender, setGender }: GenderSelectProps) => {
  return (
    <div className="flex w-full justify-center mt-4">
      <button
        type="button"
        className={`btn ${gender == "male" ? "bg-sky-500 text-white" : ""} flex-grow rounded-tr-none rounded-br-none p-0 text-xl hover:bg-sky-400 hover:text-white`}
        onClick={() => setGender("male")}
      >
        <FaMale />
      </button>
      <div className="border-r border-r-gray-500" />
      <button
        type="button"
        className={`btn ${gender == "female" ? "bg-pink-500 text-white" : ""} flex-grow rounded-tl-none rounded-bl-none p-0 text-xl hover:bg-pink-400 hover:text-white`}
        onClick={() => setGender("female")}
      >
        <FaFemale />
      </button>
    </div>
  );
};

export default GenderSelect;
