import { useState } from "react";
import { message } from "antd";
import { UploadOutlined, SendOutlined } from "@ant-design/icons";
import UploadModal from "./UploadModal";
import { CustomButton } from "../../../components/button/Button";
import CustomInput from "../../../components/input/Input";

const UploadReport = () => {
  const [modalOpen, setModalOpen] = useState(true);
  const [reportData, setReportData] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [file, setFile] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

  const handleModalSubmit = (values) => {
    setReportData({
      date: values.date?.format("YYYY-MM-DD"),
      type: values.type,
    });
    setModalOpen(false);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      messageApi.success(`${selectedFile.name} selected`);
    }
  };

  const handleSend = async () => {
    if (!inputValue && !file) {
      messageApi.error(
        "Please type a message or attach a report file before submitting!"
      );
      return;
    }

    const formData = new FormData();

    if (file) {
      formData.append("file", file);
    }

    formData.append("data", JSON.stringify({ inputValue, reportData }));

    try {
      const res = await fetch("http://localhost:5000/api/reports/analyze", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      console.log("AI Response:", result);

      if (!res.ok || !result.success) {
        messageApi.error(result.error || "AI or DB operation failed!");
        return;
      }

      messageApi.success("✅ Uploaded & analyzed successfully!");
    } catch (err) {
      console.error("❌ Upload error:", err);
      messageApi.error("Upload failed — please try again!");
    }

    setInputValue("");
    setFile(null);
  };

  return (
    <>
      {modalOpen && <UploadModal onSubmit={handleModalSubmit} />}
      <div className="flex flex-col w-full max-w-3xl mx-auto min-h-screen bg-gray-50 rounded-2xl shadow-md mt-10">
        {contextHolder}
        <div className="flex justify-between items-center border-b p-4 bg-white rounded-t-2xl">
          <div className="text-gray-700 font-medium">📅 {reportData?.date}</div>
          <div className="text-gray-700 font-medium">📄 {reportData?.type}</div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
          <p className="text-sm">No file or message yet</p>
        </div>
        <span>{file?.name}</span>

        <div className="flex items-center gap-2 p-4 border-t bg-white rounded-b-2xl">
          <label className="w-10 h-10 flex items-center justify-center rounded-full border hover:bg-gray-100 transition cursor-pointer">
            <UploadOutlined />
            <input
              type="file"
              accept=".pdf,image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          <CustomInput
            placeholder="Type your message or upload a file..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 h-10 rounded-full"
          />

          <CustomButton
            value={<SendOutlined />}
            onClick={handleSend}
            className="!w-10 !h-10 !rounded-full !p-0 !bg-blue-600 hover:!bg-blue-700"
          />
        </div>
      </div>
    </>
  );
};

export default UploadReport;
