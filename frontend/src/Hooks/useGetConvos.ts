import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface ConvoType {
  _id: string;
  fullName: string;
  gender: string;
  profilePic: string;
  username: string;
  __v: number;
}

const useGetConvos = () => {
  const [loading, setLoading] = useState(false);
  const [convos, setConvos] = useState<ConvoType[]>([]);

  useEffect(() => {
    const getConvos = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/users");
        const data = await res.json();

        if (data.error) throw new Error(data.error);
        setConvos(data);
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

    getConvos();
  }, []);

  return { loading, convos };
};

export default useGetConvos;
