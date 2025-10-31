import { useEffect, useState } from "react";
import { Card, Table, Tag, Dropdown, Menu, Tooltip } from "antd";
import { Eye, Download, FileText, MoreVertical } from "lucide-react";
import { CustomButton } from "../../../components/button/Button.jsx";
import { Link } from "react-router-dom";
import { getReportsWithAiSummary } from "../../../utils/helpers/helpers.js";

const ViewReport = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const response = await getReportsWithAiSummary();
        if (response?.success) {
          setReports(response?.tableData || []);
        }
      } catch (err) {
        console.error("Error fetching reports:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const menu = (record) => (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <Tooltip title="View report details">
              <span className="flex items-center gap-2">
                <Eye className="w-4 h-4" /> View Details
              </span>
            </Tooltip>
          ),
          onClick: () => {
            console.log("View report:", record);
          },
        },
        {
          key: "2",
          label: (
            <Tooltip title="Download the report file">
              <span className="flex items-center gap-2">
                <Download className="w-4 h-4" /> Download Report
              </span>
            </Tooltip>
          ),
          onClick: () => {
            if (record?.fileUrl) {
              window.open(record.fileUrl, "_blank");
            } else {
              console.warn("No file URL found for report:", record);
            }
          },
        },
      ]}
    />
  );

  const columns = [
    {
      title: "Report Name",
      dataIndex: "title",
      key: "title",
      render: (text) => (
        <span className="font-medium text-gray-800 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-500" /> {text}
        </span>
      ),
    },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Doctor", dataIndex: "doctor", key: "doctor" },
    {
      title: "Lab/Hospital",
      dataIndex: "lab",
      key: "lab",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => <Tag color="blue">{type || "Unknown"}</Tag>,
    },
    {
      title: "Flag",
      dataIndex: "flag",
      key: "flag",
      render: (flag) => (
        <Tag color={flag === "Normal" ? "green" : "orange"}>
          {flag || "N/A"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Dropdown overlay={menu(record)} trigger={["click"]}>
          <MoreVertical className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-800 transition" />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl flex items-center gap-[8px] font-bold text-gray-800">
            <FileText /> View Uploaded Reports
          </h1>
          <Link to={"/uploadReports"}>
            <CustomButton
              className="lg!flex !hidden"
              value="Upload New Report"
              icon={<FileText className="w-4 h-4" />}
            />
          </Link>
        </div>

        <Card
          title="All Reports"
          className="rounded-2xl shadow-lg border-none bg-white/80 backdrop-blur-sm"
        >
          <Table
            loading={loading}
            dataSource={reports}
            columns={columns}
            bordered={true}
            pagination={{ position: ["bottomCenter"], pageSize: 8 }}
            size="middle"
            scroll={{ x: "max-content" }}
          />
        </Card>
      </div>
    </div>
  );
};

export default ViewReport;
