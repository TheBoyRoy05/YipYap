import { TiMessages } from "react-icons/ti";
import useConversation from "../../Store/useConversation";

const DefaultScreen = () => {
  const { authUser } = useConversation();

  return (
    <div className="flex flex-col items-center justify-center w-full h-full px-4 sm:text-lg md:text-xl text-gray-200 font-semibold gap-2">
      <p>{`Welcome ${authUser.fullName}`}</p>
      <p>Select a chat to start messaging</p>
      <TiMessages className="text-3xl md:text-6xl text-center" />
    </div>
  );
};

export default DefaultScreen;