import { Outlet } from "react-router-dom";
import Navbar from "../../../components/nonAuthNavbar/Navbar";
import Footer from "../../../components/nonAuthFooter/Footer.jsx";

import useNonAuthRedirect from "../../../hooks/NonAuth.jsx";

const NonAuthLayout = () => {
  useNonAuthRedirect();
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-blue-50 to-white w-screen flex flex-col">
      <div className="w-full h-[82px] flex items-center justify-between px-4 ">
        <Navbar />
      </div>
      <div className="flex flex-1 items-center">
        <div className="w-screen">
          <Outlet />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};
export default NonAuthLayout;
