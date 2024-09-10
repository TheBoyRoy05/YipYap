import Siderbar from "../Components/Sidebar/Siderbar";
import Chat from "../Components/Chat/Chat";

const Home = () => {
  return (
    <div className="flex w-10/12 h-full rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <Siderbar />
      <Chat />
    </div>
  );
};

export default Home;
