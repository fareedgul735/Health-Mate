import { useEffect, useState } from "react";
import { Plus, UserCircle } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Button, Card, Table, Tag, Tooltip } from "antd";

import { CustomButton } from "../../../components/button/Button.jsx";
import CustomInput from "../../../components/input/Input.jsx";
import { Link } from "react-router-dom";
import Loading from "../../../components/loader/Loading.jsx";
import { EyeOutlined } from "@ant-design/icons";
import {
  getReportsWithAiSummary,
  getuserName,
} from "../../../utils/helpers/helpers.js";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});

  const [reportsData, setReportsData] = useState([]);
  const [reports, setReports] = useState([]);

  const loadUser = async () => {
    try {
      setLoading(true);
      const data = await getuserName();
      setUserData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadUser();
    const fetchReports = async () => {
      try {
        const response = await getReportsWithAiSummary();
        if (response?.success) {
          const formattedData = response?.chartData?.map((item) => ({
            date: item.date,
            systolic: item.Systolic,
            diastolic: item.Diastolic,
            sugar: item.Sugar,
          }));
          setReportsData(formattedData);
          setReports(response?.tableData);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <span className="font-medium">{text}</span>,
    },
    {
      title: "Lab/Hospital",
      dataIndex: "lab",
      key: "lab",
    },
    {
      title: "Doctor",
      dataIndex: "doctor",
      key: "doctor",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Flag",
      dataIndex: "flag",
      key: "flag",
      render: (flag) =>
        flag === "Normal" ? (
          <Tag color="green">{flag}</Tag>
        ) : (
          <Tag color="orange">{flag}</Tag>
        ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, record) => {
        return (
          <div className="actions-btn">
            <Tooltip color="blue" title="View" placement="bottom">
              <Link>
                <Button
                  type="none"
                  className="view-btn"
                  icon={<EyeOutlined />}
                />
              </Link>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  return (
    <div className="min-h-screen flex gap-[12px] flex-col bg-gradient-to-br from-[#e0f2ff] to-[#f8fbff] p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <UserCircle className="w-10 h-10 text-blue-600" />
          <div>
            <h2 className="text-xl flex gap-[6px] font-semibold text-gray-800">
              Hi,{loading ? <Loading /> : userData?.userName}
            </h2>
          </div>
        </div>
        <Link to={"/family"}>
          <CustomButton
            className="hover:!scale-95 active:!scale-90 slide-down"
            icon={<Plus className="w-4 h-4" />}
            value={"Add Family Member"}
          />
        </Link>
      </div>

      <Card className="rounded-2xl shadow-md bg-white mb-6">
        <div className="p-4">
          <h3 className="font-semibold text-gray-700 mb-2">Vitals trend</h3>
          <p className="text-sm text-gray-500 mb-4">
            Systolic / Diastolic BP and Fasting Sugar
          </p>

          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={reportsData}>
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="systolic"
                  name="Systolic BP"
                  stroke="#22c55e"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="diastolic"
                  name="Diastolic BP"
                  stroke="#f59e0b"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="sugar"
                  name="Sugar Level"
                  stroke="#ef4444"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>

      <Card className="rounded-2xl shadow-md bg-white">
        <div className="p-4">
          <div className="flex pt-[18px] pb-[18px] justify-between items-start gap-[12px]">
            <div className="input">
              <CustomInput placeholder={"Search Reports..."} />
            </div>
            <div>
              <Link to={"/uploadReports"}>
                <CustomButton
                  className="hover:!scale-95 active:!scale-90 slide-down"
                  value={"Add New Report"}
                  icon={<Plus className="w-4 h-4" />}
                />
              </Link>
            </div>
          </div>
          <div className="table-wrapper">
            <Table
              loading={loading}
              columns={columns}
              dataSource={reports}
              bordered={true}
              pagination={{ position: ["bottomCenter"], pageSize: 8 }}
              size="middle"
              scroll={{ x: "max-content" }}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
