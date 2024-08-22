interface LinkProps {
  href: string;
  text: string;
  linkText: string;
}

const Link = ({ href, text, linkText }: LinkProps) => {
  return (
    <div className="text-sm mt-4 ml-1 block text-center">
      <p>
        {text}
        <a href={href} className="hover:underline text-blue-500">
          {linkText}
        </a>
      </p>
    </div>
  );
};

export default Link;
