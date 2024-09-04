import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../../Context/AuthContext";

interface SignupProps {
  fullName: string;
  username: string;
  password: string;
  confirmPassword: string;
  gender: string;
}

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async (props: SignupProps) => {
    const success = handleInputErrors(props);
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(props),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

function handleInputErrors(props: SignupProps) {
  const { fullName, username, password, confirmPassword, gender } = props;

  const checkExists = (name: string, value: string) => {
    if (!value) {
      toast.error(`Please fill in ${name}`);
      return false;
    }
  };

  checkExists("Full Name", fullName);
  checkExists("Username", username);
  checkExists("Password", password);
  checkExists("Confirm Password", confirmPassword);
  checkExists("Gender", gender);

  if (password.length < 8) {
    toast.error("Password must be at least 8 characters long");
    return false;
  }

  if (password != confirmPassword) {
    toast.error("Passwords don't match");
    return false;
  }

  return true;
}

export default useSignup;
