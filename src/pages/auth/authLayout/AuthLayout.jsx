import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../../../components/authNavbar/Navbar.jsx";
import Footer from "../../../components/authFooter/Footer.jsx";
import useAuthRedirection from "../../../hooks/Auth.jsx";
import { LoginIcon } from "../../../components/icons/Icons.jsx";
import logoutHandler from "../../../functions/LogoutHandler.js";
import { Tooltip } from "antd";

const AuthLayout = () => {
  const navigate = useNavigate();
  useAuthRedirection();
  return (
    <div className="w-screen bg-gradient-to-b from-sky-50 via-blue-50 to-white">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="outlet ">
        <Outlet />
        <Tooltip className="!hidden lg!flex" color="blue" title={"Logout"} open>
          <div
            onClick={() => logoutHandler(navigate)}
            className="w-12 h-12 cursor-pointer shadow-md fixed bottom-[48px] right-[48px] !flex !items-center !justify-center !gap-2
  !px-6 !py-5 !rounded-full
  !font-semibold !text-base
  !text-white
  !bg-gradient-to-r !from-sky-400 !to-blue-600
  hover:!opacity-90
  !transition-all !duration-200 !ease-in-out
  !shadow-md hover:!shadow-lg hover:!scale-95 active:!scale-90 slide-down "
          >
            <LoginIcon />
          </div>
        </Tooltip>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default AuthLayout;
