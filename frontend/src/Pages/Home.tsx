import Siderbar from "../Components/Sidebar/Siderbar";

const Home = () => {
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <Siderbar />
      {/* <Messages /> */}
    </div>
  );
};

export default Home;
