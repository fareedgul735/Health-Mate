import { useState } from "react";
import { Form, Input, Button, DatePicker, Select, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UploadReport = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("date", values.date.format("YYYY-MM-DD"));
    formData.append("type", values.type);
    formData.append("notes", values.notes || "");

    if (values.file && values.file[0]?.originFileObj) {
      formData.append("file", values.file[0].originFileObj);
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.ok) {
        message.success("✅ Report uploaded successfully!");
      } else {
        message.warning("⚠️ Upload failed, please try again.");
      }
    } catch (err) {
      console.error(err);
      message.error("❌ Error while uploading report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-6">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Upload Medical Report
        </h1>

        <Form layout="vertical" onFinish={handleSubmit} className="space-y-3">
          <Form.Item
            label="Upload File (PDF / Image)"
            name="file"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
            rules={[{ required: true, message: "Please upload your file!" }]}
          >
            <Upload.Dragger
              name="file"
              accept=".pdf,image/*"
              beforeUpload={() => false}
              maxCount={1}
              className="p-4"
            >
              <p className="text-gray-500">
                <UploadOutlined className="text-blue-500 mr-2" /> Click or drag
                file to upload
              </p>
            </Upload.Dragger>
          </Form.Item>

          <Form.Item
            label="Report Date"
            name="date"
            rules={[{ required: true, message: "Please select a date!" }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item
            label="Report Type"
            name="type"
            rules={[
              { required: true, message: "Please select a report type!" },
            ]}
          >
            <Select placeholder="Select Type">
              <Select.Option value="Blood Test">Blood Test</Select.Option>
              <Select.Option value="Urine Test">Urine Test</Select.Option>
              <Select.Option value="X-ray">X-ray</Select.Option>
              <Select.Option value="Ultrasound">Ultrasound</Select.Option>
              <Select.Option value="Other">Other</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Notes (Optional)" name="notes">
            <Input.TextArea
              rows={2}
              placeholder="Any extra details (e.g. fasting test, morning sample)..."
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full"
            >
              {loading ? "Uploading..." : "Upload Report"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default UploadReport;
