import Input from "./Input"
import Messages from "./Messages"

const Chat = () => {
  return (
    <div className="md:min-w-[450px] flex flex-col">
      <div className="bg-slate-500 px-4 py-2 mb-2">
        <span className="text-gray-900 font-bold">Username</span>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chat
