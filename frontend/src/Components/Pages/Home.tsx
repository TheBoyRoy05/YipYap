import Siderbar from "../Sidebar/Siderbar";
import ScreenControl from "../Screens/ScreenControl";

const Home = () => {
  return (
    <div className="flex w-[1600px] h-[900px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <Siderbar />
      <ScreenControl />
    </div>
  );
};

export default Home;
