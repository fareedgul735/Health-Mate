import { useEffect, useState, useRef } from "react";
import { Card, Table, Tag, Dropdown, Menu, Tooltip, Modal } from "antd";
import { Download, FileText, MoreVertical } from "lucide-react";
import { CustomButton } from "../../../components/button/Button.jsx";
import { Link } from "react-router-dom";
import html2canvas from "html2canvas-oklch";
import jsPDF from "jspdf";
import { getReportsWithAiSummary } from "../../../utils/helpers/helpers.js";

const ViewReport = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [aiData, setAiData] = useState([]);
  const printRef = useRef();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const response = await getReportsWithAiSummary();
        if (response?.success) {
          setReports(response?.tableData || []);
          setAiData(response?.aiValue || []);
        }
      } catch (err) {
        console.error("Error fetching reports:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const handleOpen = (record) => {
    setSelectedReport(record);
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    setSelectedReport(null);
  };

  const handleDownload = async () => {
    const element = printRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 190;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 10;

    pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`${selectedReport.title || "report"}_summary.pdf`);
  };

  const menu = (record) => (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <Tooltip title="View report details + AI response">
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4" /> View Details + Download 
              </span>
            </Tooltip>
          ),
          onClick: () => handleOpen(record),
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

  const selectedAiData = aiData.find(
    (item) => item.reportId === selectedReport?.key
  );

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

      <Modal
        open={open}
        onCancel={handleCancel}
        title="AI Report Summary"
        centered
        width={900}
        footer={[
          <CustomButton
            key="download"
            icon={<Download className="w-4 h-4" />}
            value="Download Summary"
            onClick={handleDownload}
          />,
        ]}
      >
        {selectedReport && (
          <div ref={printRef} className="p-4 space-y-4">
            <h2 className="text-xl font-bold">{selectedReport.title}</h2>
            <p className="text-gray-500">
              Doctor: {selectedReport.doctor || "N/A"} | Date:{" "}
              {selectedReport.date}
            </p>

            {selectedAiData ? (
              <div className="border rounded-lg p-4 bg-white shadow">
                <h3 className="font-semibold mb-2">AI Summary</h3>
                <p>{selectedAiData.aiResponseData?.summary || "No summary"}</p>

                {selectedAiData.aiResponseData?.keyFindings && (
                  <>
                    <h3 className="font-semibold mt-4">Key Findings</h3>
                    <ul className="list-disc pl-5">
                      {selectedAiData.aiResponseData.keyFindings.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            ) : (
              <p>No AI data available</p>
            )}

            {selectedAiData?.files?.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Attached Files</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedAiData.files.map((file, i) => (
                    <img
                      key={i}
                      src={file.url}
                      alt="report file"
                      className="rounded-lg shadow border"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ViewReport;
