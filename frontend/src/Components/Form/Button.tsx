interface ButtonProps {
  text: string;
  loading: boolean;
  click?: () => void;
}

const Button = ({ text, loading, click }: ButtonProps) => {
  return (
    <button className="btn btn-block btn-sm mt-4 bg-blue-500 hover:bg-blue-400 text-white border-none" onClick={click}>
      {loading ? <span className="loading loading-spinner"></span> : text}
    </button>
  );
};

export default Button;
