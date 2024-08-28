interface MessageProps {
  first: boolean;
}

const Message = ({ first }: MessageProps) => {
  return first ? (
    <div className="flex items-center hover:bg-gray-700">
      <div className="avatar">
        <div className="w-10 m-2 rounded-full">
          <img
            src="https://avatar.iran.liara.run/public/boy?"
            alt="user avatar"
          />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex text-sm mt-1">
          <p className="text-white mr-2">Username</p>
          <span>Date and Time</span>
        </div>
        <p className="text-gray-300">This is a message</p>
      </div>
    </div>
  ) : (
    <div className="flex items-center hover:bg-gray-700 group">
      <span className="w-14 text-sm text-center invisible group-hover:visible">
        Time
      </span>
      <p className="text-gray-300">This is another message</p>
    </div>
  );
};

export default Message;
