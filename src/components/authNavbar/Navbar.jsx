import { useState } from "react";
import { Drawer } from "antd";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CustomButton } from "../button/Button.jsx";
import { LoginIcon, LogoIcon } from "../icons/Icons.jsx";
import logoutHandler from "../../functions/LogoutHandler.js";
import { Links } from "../../lib/constants.jsx";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <>
      <div className="w-screen  p-3 flex justify-between items-center md:p-4 lg:p-5">
        <div className="flex items-center space-x-2 slide-up">
          <div className="w-8 h-8 bg-gradient-to-r from-sky-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
            <LogoIcon />
          </div>
          <h1 className="font-bold text-xl text-gray-800">
            HealthMate{" "}
            <span className="text-sky-600 text-sm">Sehat ka Smart Dost</span>
          </h1>
        </div>

        <div className="flex gap-[12px] text-blue-700 md:none">
          {Links.map((val, index) => (
            <Link to={val.path} key={index}>
              {val.name}
            </Link>
          ))}
        </div>

        {/* <CustomButton
          icon={<FaBars />}
          onClick={showDrawer}
          className="flex items-center justify-center text-2xl text-gray-700 lg:hidden"
        /> */}
      </div>

      <Drawer
        width={250}
        onClose={onClose}
        open={open}
        placement="left"
        title={
          <div className="flex items-center space-x-2 slide-up">
            <div className="w-8 h-8 bg-gradient-to-r from-sky-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              <LogoIcon />
            </div>
            <h1 className="font-bold text-xl text-gray-800">
              HealthMate{" "}
              <span className="text-sky-600 text-sm">Sehat ka Smart Dost</span>
            </h1>
          </div>
        }
        className="custom-drawer"
      >
        <div className="flex flex-col gap-3">
          <p className="text-gray-500 text-sm font-medium uppercase">Menu</p>

          {Links.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-base">{item.name}</span>
            </NavLink>
          ))}
        </div>

        <CustomButton
          value={"logout"}
          icon={<LoginIcon />}
          onClick={() => logoutHandler(navigate)}
          className="flex items-center gap-2 p-[12px] text-red-600 hover:bg-red-100 rounded-lg transition"
        />
      </Drawer>
    </>
  );
};

export default Navbar;
