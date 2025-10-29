import { Button } from "antd";

const baseButtonStyles = `
  !flex !items-center !justify-center !gap-2
  !px-6 !py-5 !rounded-full
  !font-semibold !text-base
  !text-white
  !bg-gradient-to-r !from-sky-400 !to-blue-600
  hover:!opacity-90
  !transition-all !duration-200 !ease-in-out
  !shadow-md hover:!shadow-lg
  hover:!scale-95 active:!scale-90
`;

export const CustomButton = ({
  className = "",
  icon,
  value,
  onClick,
  htmlType,
  size,
  style,
}) => {
  return (
    <Button
      type="text"
      htmlType={htmlType}
      onClick={onClick}
      className={`${baseButtonStyles} ${className}`}
      size={size}
      style={style}
    >
      {icon}
      {value}
    </Button>
  );
};

const outlinedButtonStyles = `
  !flex !items-center !justify-center !gap-2
  !px-6 !py-3 !rounded-full
  !font-semibold !text-base
  !border !border-sky-400
  !text-sky-700
  hover:!bg-blue-50
  !transition-all !duration-200 !ease-in-out
`;

export const CustomButtonTwin = ({
  className = "",
  icon,
  value,
  onClick,
  htmlType,
}) => {
  return (
    <Button
      type="text"
      htmlType={htmlType}
      onClick={onClick}
      className={`${outlinedButtonStyles} ${className}`}
    >
      {icon}
      {value}
    </Button>
  );
};
