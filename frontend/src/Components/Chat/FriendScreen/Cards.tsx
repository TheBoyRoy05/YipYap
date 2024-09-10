import useGetUsers from "../../../Hooks/useGetUsers";
import Card from "./Card";

const Cards = () => {
  const { loading, users } = useGetUsers();

  return (
    <div className="flex-grow overflow-y-auto dark-scrollbar grid grid-cols-5 content-stretch px-12 gap-10 gap-y-10">
      {loading ? (
        <div className="h-full flex items-center justify-center">
          <span className="loading loading-bars loading-lg" />
        </div>
      ) : (
        users.map((user, index) => <Card key={index} user={user} />)
      )}
    </div>
  );
};

export default Cards;
