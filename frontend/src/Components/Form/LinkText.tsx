import { Link } from "react-router-dom"

interface LinkProps {
  href: string;
  text: string;
  linkText: string;
}

const LinkText = ({ href, text, linkText }: LinkProps) => {
  return (
    <div className="text-sm mt-4 ml-1 block text-center">
      <p>
        {text}
        <Link to={href} className="hover:underline text-blue-500">
          {linkText}
        </Link>
      </p>
    </div>
  );
};

export default LinkText;
