import { useState } from "react";
import toast from "react-hot-toast";
import useStore from "../../Store/useStore";

interface LoginProps {
  username: string;
  password: string;
}

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useStore();

  const login = async (props: LoginProps) => {
    const success = handleInputErrors(props);
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(props)
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      localStorage.setItem("jwt", data.token);
      localStorage.setItem("chat-user", JSON.stringify(data.user));

      setAuthUser(data.user);
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

function handleInputErrors(props: LoginProps) {
  const { username, password } = props;

  const checkExists = (name: string, value: string) => {
    if (!value) {
      toast.error(`Please fill in ${name}`);
      return false;
    }
  };

  checkExists("Username", username);
  checkExists("Password", password);
  return true;
}

export default useLogin;
