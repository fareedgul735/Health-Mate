import { useState } from "react";
import { Drawer } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { CustomButton } from "../button/Button.jsx";
import { LoginIcon, LogoIcon } from "../icons/Icons.jsx";
import logoutHandler from "../../functions/LogoutHandler.js";
import { Links, NavLinks } from "../../lib/constants.jsx";
import { FaBars } from "react-icons/fa";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <>
      <div className="w-screen p-[12px] flex justify-between items-center md:p-4 lg:p-5">
        <div className="flex items-center space-x-2 slide-up">
          <div className="w-8 h-8 bg-gradient-to-r from-sky-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
            <LogoIcon />
          </div>
          <h1 className="font-bold text-xl text-gray-800">
            HealthMate{" "}
            <span className="text-sky-600 text-sm">Sehat ka Smart Dost</span>
          </h1>
        </div>

        <div className="hidden lg:flex gap-[12px] text-blue-700">
          {NavLinks.map((val, index) => (
            <NavLink
              to={val.path}
              key={index}
              className={({ isActive }) =>
                `relative pb-1 transition-colors duration-300 ${
                  isActive
                    ? "text-black font-semibold"
                    : "text-blue-700 hover:text-gray-800"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {val.name}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-black transition-all duration-300 ${
                      isActive ? "w-full" : "w-0"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </div>

        <CustomButton
          icon={<FaBars />}
          onClick={showDrawer}
          className="flex items-center justify-center text-2xl text-gray-700 lg:!hidden"
        />
      </div>

      <Drawer
        width={250}
        onClose={onClose}
        open={open}
        placement="left"
        title={
          <div className="flex items-center justify-between space-x-2 slide-up">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sky-700 font-bold">
              <LogoIcon />
            </div>
            <h1 className="font-bold text-[14px]text-gray-800">
              HealthMate{" "}
              <span className="text-sky-600 text-[12px]">
                Sehat ka Smart Dost
              </span>
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

        <div className="mt-6">
          <CustomButton
            value={"logout"}
            icon={<LoginIcon />}
            onClick={() => logoutHandler(navigate)}
            className="flex items-center gap-2 p-[12px] text-red-600 hover:bg-red-100 rounded-lg transition w-full"
          />
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
