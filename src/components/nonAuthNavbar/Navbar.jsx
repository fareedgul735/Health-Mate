import { Link } from "react-router-dom";
import { CustomButton } from "../button/Button.jsx";
import { LogoIcon } from "../icons/Icons.jsx";

const Navbar = () => {
  return (
    <nav className="w-full flex justify-between items-center py-6 px-6 md:px-20">
      <div className="flex items-center space-x-2 slide-up">
        <div className="w-8 h-8 bg-gradient-to-r from-sky-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
          <LogoIcon />
        </div>
        <h1 className="font-bold text-xl text-gray-800">
          HealthMate{" "}
          <span className="text-sky-600 text-sm">Sehat ka Smart Dost</span>
        </h1>
      </div>
      <div className="flex space-x-3">
        <Link to={"login"}>
          <CustomButton
            value={"Signin"}
            className="hover:!scale-95 active:!scale-90 slide-up"
          />
        </Link>
        <Link to={"signup"}>
          <CustomButton
            value={" Create account"}
            className="hover:!scale-95 active:!scale-90 slide-down"
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
