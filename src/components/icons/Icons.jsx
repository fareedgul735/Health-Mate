import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { BiLogIn } from "react-icons/bi";
import { FaHeartbeat } from "react-icons/fa";

const LoginIcon = () => {
  return (
    <div>
      <BiLogIn size={18} />
    </div>
  );
};
const LeftArrow = () => {
  return (
    <div>
      <ArrowLeftOutlined />
    </div>
  );
};
const RightArrow = () => {
  return (
    <div>
      <ArrowRightOutlined />
    </div>
  );
};

export const LogoIcon = () => {
  return (
    <div>
      <FaHeartbeat />
    </div>
  );
};

export { LoginIcon, LeftArrow, RightArrow };
