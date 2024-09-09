import Siderbar from "../Components/Sidebar/Siderbar";
import ChatScreen from "../Components/Chat/ChatScreen";

const Home = () => {
  return (
    <div className="flex w-10/12 h-full rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <Siderbar />
      <ChatScreen />
    </div>
  );
};

export default Home;
