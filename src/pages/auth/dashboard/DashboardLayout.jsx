import { useEffect, useState } from "react";
import { Plus, UserCircle } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, Table, Tag, Tooltip as AntTooltip, Modal, Spin } from "antd";
import { CustomButton } from "../../../components/button/Button.jsx";
import CustomInput from "../../../components/input/Input.jsx";
import { Link } from "react-router-dom";
import Loading from "../../../components/loader/Loading.jsx";
import { EyeOutlined, LoadingOutlined } from "@ant-design/icons";
import {
  getReportsWithAiSummary,
  getuserName,
} from "../../../utils/helpers/helpers.js";
import PdfViewer from "../../../components/pdf/PdfViewer.jsx";

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [reportsData, setReportsData] = useState([]);
  const [reports, setReports] = useState([]);
  const [aiData, setAiData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReportId, setSelectedReportId] = useState(null);

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

    const fetchReportsDetails = async () => {
      try {
        setLoading(true);
        const response = await getReportsWithAiSummary();
        if (response?.success) {
          const formattedData = response?.chartData?.map((item) => ({
            date: new Date(item.date).toLocaleDateString(),
            systolic: Number(item.Systolic ?? item.systolic),
            diastolic: Number(item.Diastolic ?? item.diastolic),
            sugar: Number(item.Sugar ?? item.sugar),
          }));

          setReportsData(formattedData);
          setReports(response?.tableData);
          setAiData(response?.aiValue || []);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReportsDetails();
  }, []);
  console.log(aiData, "aiData");

  const filteredReports = reports.filter((item) =>
    item.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const showModal = (reportId) => {
    setSelectedReportId(reportId);
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    setSelectedReportId(null);
  };

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
      render: (_, record) => (
        <AntTooltip color="blue" title="View" placement="bottom">
          <CustomButton
            onClick={() => showModal(record.key)}
            type="none"
            className="view-btn"
            icon={<EyeOutlined />}
          />
        </AntTooltip>
      ),
    },
  ];

  const selectedAiData = aiData?.filter(
    (item) => item?.reportId === selectedReportId
  );

  return (
    <div className="min-h-screen flex flex-col gap-3 bg-gradient-to-br from-[#e0f2ff] to-[#f8fbff] p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <UserCircle className="w-10 h-10 text-blue-600" />
          <div>
            <h2 className="text-xl flex gap-2 font-semibold text-gray-800">
              Hi,{" "}
              {loading ? (
                <Spin
                  indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />}
                  className="mb-4"
                />
              ) : (
                userData?.userName || "User"
              )}
            </h2>
          </div>
        </div>
        <Link to={"/family"}>
          <CustomButton
            className="hover:!scale-95 active:!scale-90 slide-down !hidden lg:!flex"
            icon={<Plus className="w-4 h-4" />}
            value={"Add Family Member"}
          />
        </Link>
      </div>

      <Card className="rounded-2xl shadow-md bg-white mb-6">
        <div className="p-4">
          <h3 className="font-semibold text-gray-700 mb-2">Vitals Trend</h3>
          <p className="text-sm text-gray-500 mb-4">
            Systolic / Diastolic BP and Fasting Sugar
          </p>

          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={reportsData}>
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" domain={[0, "dataMax + 100"]} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="systolic"
                  name="Systolic BP"
                  stroke="#22c55e"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="diastolic"
                  name="Diastolic BP"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="sugar"
                  name="Sugar Level"
                  stroke="#ef4444"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>

      <Card className="rounded-2xl shadow-md bg-white">
        <div className="p-4">
          <div className="flex pt-4 pb-4 justify-between items-start gap-3">
            <div className="input w-full max-w-sm">
              <CustomInput
                placeholder="Search Reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <Link to="/uploadReports">
                <CustomButton
                  className="hover:!scale-95 active:!scale-90 slide-down !hidden lg:!flex"
                  value="Add New Report"
                  icon={<Plus className="w-4 h-4" />}
                />
              </Link>
            </div>
          </div>

          <Table
            loading={loading}
            columns={columns}
            dataSource={filteredReports}
            bordered
            pagination={{ position: ["bottomCenter"], pageSize: 8 }}
            size="middle"
            scroll={{ x: "max-content" }}
            rowKey={(record) => record._id || record.title}
          />
        </div>
      </Card>

      <Modal
        title="AI Response"
        open={open}
        onCancel={handleCancel}
        footer={null}
        centered
        width={1000}
        destroyOnClose
      >
        {selectedAiData && selectedAiData.length > 0 ? (
          selectedAiData.map((data, index) => (
            <div
              key={index}
              className="space-y-4 border rounded-lg p-6 bg-white shadow mb-6"
            >
              {data.aiResponseData?.summary && (
                <div>
                  <h3 className="font-semibold text-lg mb-2">Summary</h3>
                  <p>{data.aiResponseData.summary}</p>
                </div>
              )}

              {data.aiResponseData?.keyFindings && (
                <div>
                  <h3 className="font-semibold text-lg mb-2">Key Findings</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {data.aiResponseData.keyFindings.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {data.aiResponseData?.riskFactors && (
                <div>
                  <h3 className="font-semibold text-lg mb-2">Risk Factors</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {data.aiResponseData.riskFactors.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {data.aiResponseData?.recommendations && (
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    Recommendations
                  </h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {data.aiResponseData.recommendations.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {data.aiResponseData?.urgencyLevel && (
                <div>
                  <h3 className="font-semibold text-lg mb-2">Urgency Level</h3>
                  <p className="capitalize">
                    {data.aiResponseData.urgencyLevel}
                  </p>
                </div>
              )}

              {data.files && data.files.length > 0 && (
                <div>
                  <h3 className="font-semibold text-lg mb-2">Attached Files</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.files.map((file, i) => {
                      const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(
                        file.url
                      );
                      const isPDF = /\.pdf$/i.test(file.url);

                      return (
                        <div
                          key={i}
                          className="border rounded-lg overflow-hidden shadow-sm bg-gray-50 p-2"
                        >
                          {isImage && (
                            <img
                              src={file.url}
                              alt={file.name || `File ${i + 1}`}
                              className="w-full h-64 object-contain rounded-lg"
                            />
                          )}

                          {isPDF && <PdfViewer url={file.url} />}

                          {!isImage && !isPDF && (
                            <p className="text-gray-600 text-sm">
                              Unsupported file type:{" "}
                              <a
                                href={file.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline"
                              >
                                {file.name || `Download File`}
                              </a>
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-6">
            No AI response available.
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Dashboard;
