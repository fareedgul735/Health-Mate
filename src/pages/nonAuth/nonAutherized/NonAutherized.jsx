import { Outlet, useNavigate } from "react-router-dom";

import useNonAuthRedirect from "../../../hooks/NonAuth.jsx";
import { LogoIcon } from "../../../components/icons/Icons.jsx";

const NonAutherized = () => {
  const navigate = useNavigate();

  useNonAuthRedirect();
  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-b from-sky-50 via-blue-50 to-white flex flex-col">
      <div>
        <nav className="w-full flex justify-between items-center py-6 px-6 md:px-20 slide-up">
          <div
            onClick={() => navigate("health_mate")}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-sky-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              <LogoIcon />
            </div>
            <h1 className="font-bold text-xl text-gray-800">
              HealthMate{" "}
              <span className="text-sky-600 text-sm">Sehat ka Smart Dost</span>
            </h1>
          </div>
        </nav>
      </div>
      <div className="flex flex-1 items-center">
        <div className="w-screen">
          <Outlet />
        </div>
      </div>
      <div>
        <div className="footer">
          <div className="mb-10 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} HealthMate — Sehat ka Smart Dost
          </div>
        </div>
      </div>
    </div>
  );
};
export default NonAutherized;
