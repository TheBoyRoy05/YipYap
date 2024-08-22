interface ButtonProps {
  text: string;
}

const Button = ({ text }: ButtonProps) => {
  return (
    <button className="btn btn-block btn-sm mt-4 bg-blue-500 hover:bg-blue-400 text-white">
      {text}
    </button>
  );
};

export default Button;
