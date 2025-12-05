import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/loader/Loading";

const AuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/dashboard");
    }
  }, []);

  return (
    <p className="flex justify-center items-center">
      <Loading size="large" />
    </p>
  );
};

export default AuthSuccess;
