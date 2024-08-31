interface ButtonProps {
  text: string;
  click: () => {};
}

const Button = ({ text, click }: ButtonProps) => {
  return (
    <button className="btn btn-block btn-sm mt-4 bg-blue-500 hover:bg-blue-400 text-white" onClick={click}>
      {text}
    </button>
  );
};

export default Button;
