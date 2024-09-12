import Siderbar from "../Sidebar/Siderbar";
import MainScreen from "../Chat/MainScreen";

const Home = () => {
  return (
    <div className="flex w-[1600px] h-[900px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <Siderbar />
      <MainScreen />
    </div>
  );
};

export default Home;
