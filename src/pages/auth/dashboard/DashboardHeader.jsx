import { Row, Col, Avatar, Space, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import CustomInput from "../../../components/input/Input.jsx";
import { CustomButton } from "../../../components/button/Button.jsx";
import { Link } from "react-router-dom";

const DashboardHeader = ({ onSearch = () => {} }) => {
  const username = "Ali Khan";

  return (
    <header className="w-full sticky z-[10] top-[0px] bg-white shadow-sm px-4 py-3">
      <Row align="middle" justify="space-between" className="max-w-7xl mx-auto">
        <Col>
          <div className="flex items-center gap-3">
            <span className="text-bold text-[18px]">HealthMate</span>— Your
            personal health companion
          </div>
        </Col>

        <Col>
          <div className="flex items-center gap-3">
            <div className="w-64">
              <CustomInput
                placeholder="Search reports, vitals..."
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>

            <Space size={8}>
              <CustomButton
                value={
                  <span>
                    <Link to={"/uploadReports"} className="!text-white">
                      Upload Reports
                    </Link>
                  </span>
                }
                icon={<UploadOutlined />}
              />
              <CustomButton
                value={
                  <span>
                    <Link to={"/addMinalVitals"} className="!text-white">
                      Add Vitals
                    </Link>
                  </span>
                }
              />
            </Space>

            <div className="flex items-center gap-2 ml-2">
              <Avatar
                size="small"
                style={{
                  backgroundColor: "#ecfdf5",
                  color: "#047857",
                  fontWeight: 700,
                }}
              >
                A
              </Avatar>
              <div className="text-sm">
                <div className="font-medium">{username}</div>
                <div className="text-xs text-slate-500">Member</div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </header>
  );
};

export default DashboardHeader;
