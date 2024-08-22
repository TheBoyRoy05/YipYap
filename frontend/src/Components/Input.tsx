interface InputProps {
  name: string;
  type: string;
}

const Input = ({ name, type }: InputProps) => {
  const format = (name: string) => name.replace(" ", "_");
  const capitalize = (name: string) => {
    name = name.includes(" ") ? name.split(" ")[1] : name;
    return name[0].toUpperCase() + name.slice(1)
  };
  
  return (
    <div>
      <label htmlFor={format(name)} className="label p-2">
        <span className="text-base label-text">{capitalize(name)}</span>
      </label>
      <input
        id={format(name)} 
        type={type}
        placeholder={`Enter ${capitalize(name)}`}
        className="w-full input input-bordered h-10"
      />
    </div>
  );
};

export default Input;
