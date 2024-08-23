const Conversation = () => {
  return (
    <div>
      <div className="flex gap-2 items-center hover:bg-sky-500 rounded-lg p-2 py-1 cursor-pointer">
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img
              src="https://avatar.iran.liara.run/public/boy?"
              alt="user avatar"
            />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <p className="text-gray-200">Username</p>
          <span className="text-sm text-gray-400">Status</span>
        </div>
        <div className="w-6 h-6 rounded-full bg-green-500 text-gray-50 text-xs font-bold flex justify-center items-center">
          1
        </div>
      </div>
    </div>
  );
};

export default Conversation;
