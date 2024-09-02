import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export interface UserType {
  _id: string;
  __v: number;
  fullName: string;
  gender: string;
  profilePic: string;
  username: string;
}

const useGetUsers = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        if (data.error) throw new Error(data.error);

        setUsers(data);
      } catch (error) {
        console.error(error);
        toast.error(
          error instanceof Error
            ? error.message
            : "An unexpected error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  return { loading, users };
};

export default useGetUsers;
