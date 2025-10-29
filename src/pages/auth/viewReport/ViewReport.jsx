import { Card, Table, Tag, Dropdown, Menu } from "antd";
import { Eye, Download, FileText, MoreVertical } from "lucide-react";
import { CustomButton } from "../../../components/button/Button.jsx";
import { Link } from "react-router-dom";

const ViewReport = () => {
  const reports = [
    {
      key: 1,
      reportName: "Blood Test Report",
      date: "2025-10-25",
      doctor: "Dr. Sarah Khan",
      type: "Pathology",
      status: "Reviewed",
    },
    {
      key: 2,
      reportName: "X-Ray Chest",
      date: "2025-10-26",
      doctor: "Dr. Ahmed Ali",
      type: "Radiology",
      status: "Pending Review",
    },
    {
      key: 3,
      reportName: "ECG Report",
      date: "2025-10-27",
      doctor: "Dr. Fatima Noor",
      type: "Cardiology",
      status: "Reviewed",
    },
  ];

  const menu = (
    <Menu
      items={[
        { key: "1", label: "View Details", icon: <Eye className="w-4 h-4" /> },
        {
          key: "2",
          label: "Download Report",
          icon: <Download className="w-4 h-4" />,
        },
      ]}
    />
  );

  const columns = [
    {
      title: "Report Name",
      dataIndex: "reportName",
      key: "reportName",
      render: (text) => (
        <span className="font-medium text-gray-800 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-500" /> {text}
        </span>
      ),
    },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Doctor", dataIndex: "doctor", key: "doctor" },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => <Tag color="blue">{type}</Tag>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Reviewed" ? "green" : "orange"}>{status}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Dropdown overlay={menu} trigger={["click"]}>
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
