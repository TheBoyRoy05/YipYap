interface InputProps {
  name: string;
  type: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const Input = ({ name, type, value, setValue }: InputProps) => {
  const format = (name: string) => name.replace(" ", "_");
  const capitalize = (name: string) => name[0].toUpperCase() + name.slice(1);
  const removeFirst = (name: string) =>
    (name = name.includes(" ") ? name.split(" ")[1] : name);

  return (
    <div>
      <label htmlFor={format(name)} className="label p-2">
        <span className="text-base label-text">{capitalize(name)}</span>
      </label>
      <input
        id={format(name)}
        type={type}
        placeholder={`Enter ${capitalize(removeFirst(name))}`}
        className="w-full input input-bordered h-10"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default Input;
