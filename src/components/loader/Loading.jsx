import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const indicator = (
  <LoadingOutlined style={{ fontSize: 14, color: "#fff" }} spin />
);

const Loading = ({ size = "small" }) => {
  return (
    <div className="flex justify-center items-center text-white">
      <Spin indicator={indicator} size={size} />
    </div>
  );
};

export default Loading;
