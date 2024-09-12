import Siderbar from "../Components/Sidebar/Siderbar";
import MainScreen from "../Components/Chat/MainScreen";

const Home = () => {
  return (
    <div className="flex w-[1600px] h-full rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <Siderbar />
      <MainScreen />
    </div>
  );
};

export default Home;
