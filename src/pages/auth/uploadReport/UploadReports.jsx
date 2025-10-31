import { useState } from "react";
import {
  Form,
  Input,
  DatePicker,
  Upload,
  Card,
  Divider,
  message,
  Spin,
} from "antd";
import {
  UploadOutlined,
  SendOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { CustomButton } from "../../../components/button/Button.jsx";
import CustomInput from "../../../components/input/Input.jsx";
import { uploadReportAiInfo } from "../../../utils/helpers/helpers.js";

const { TextArea } = Input;

const baseRules = [
  { required: true, message: "This field is required" },
  { min: 3, message: "Must be at least 3 characters" },
];

const UploadReports = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [loadingAi, setLoadingAi] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);

  const handleSend = async () => {
    try {
      const values = await form.validateFields();
      setLoadingAi(true);
      setAiResponse(null);

      const res = await uploadReportAiInfo(values);
      console.log("AI RESPONSE:", res);

      if (res?.data?.aiResponse) {
        setAiResponse(res.data.aiResponse);
        messageApi.success("AI analyzed your report successfully!");
        form.resetFields();
      } else {
        messageApi.error("AI could not analyze your data. Try again.");
      }
    } catch (errorInfo) {
      messageApi.error("Please fill all required fields before sending!");
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 p-8">
      {contextHolder}

      {loadingAi && (
        <div className="absolute inset-0 flex flex-col items-center justify-center backdrop-blur-md bg-black/30 z-50 text-white text-lg font-semibold">
          <Spin
            indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />}
            className="mb-4"
          />
          🤖 AI Analyzing your report…
        </div>
      )}

      <div className="max-w-5xl flex flex-col gap-[12px] mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          <UploadOutlined /> Upload Medical Report
        </h1>

        <Card className="rounded-2xl shadow-lg border-none bg-white/80 backdrop-blur-sm">
          <Form form={form} layout="vertical" validateTrigger="onChange">
            {" "}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {" "}
              <Form.Item
                name="title"
                label="Title"
                rules={baseRules}
                validateFirst
                validateTrigger="onChange"
              >
                {" "}
                <CustomInput placeholder="e.g., Ultrasound Abdomen" />{" "}
              </Form.Item>{" "}
              <Form.Item
                name="testName"
                label="Test name"
                rules={baseRules}
                validateFirst
                validateTrigger="onChange"
              >
                {" "}
                <CustomInput placeholder="Ultrasound / X-ray / CBC / ABG" />{" "}
              </Form.Item>{" "}
              <Form.Item
                name="files"
                label="Files (optional, multiple)"
                className="md:col-span-2"
              >
                {" "}
                <Upload multiple beforeUpload={() => false}>
                  {" "}
                  <CustomButton
                    value={"Choose Files"}
                    icon={<UploadOutlined />}
                  />{" "}
                </Upload>{" "}
              </Form.Item>{" "}
              <Form.Item
                name="hospital"
                label="Hospital / Lab"
                rules={baseRules}
                validateFirst
                validateTrigger="onChange"
              >
                {" "}
                <CustomInput placeholder="e.g., Aga Khan" />{" "}
              </Form.Item>{" "}
              <Form.Item
                name="doctor"
                label="Doctor"
                rules={baseRules}
                validateFirst
                validateTrigger="onChange"
              >
                {" "}
                <CustomInput placeholder="e.g., Dr. Ahmed" />{" "}
              </Form.Item>{" "}
              <Form.Item
                name="date"
                label="Date"
                rules={[{ required: true, message: "Date is required" }]}
                validateFirst
                validateTrigger="onChange"
              >
                {" "}
                <DatePicker className="w-full" />{" "}
              </Form.Item>{" "}
              <Form.Item
                name="price"
                label="Price (Rs)"
                rules={[
                  { required: true, message: "Price is required" },
                  {
                    validator: (_, value) => {
                      if (!value) return Promise.resolve();
                      if (isNaN(value)) {
                        return Promise.reject(new Error("Must be a number"));
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
                validateFirst
                validateTrigger="onChange"
              >
                {" "}
                <CustomInput placeholder="e.g., 3500" type="number" />{" "}
              </Form.Item>{" "}
              <Form.Item
                name="notes"
                label="Additional notes (optional)"
                className="md:col-span-2"
              >
                {" "}
                <TextArea
                  rows={3}
                  placeholder="Symptoms, instructions, etc."
                />{" "}
              </Form.Item>{" "}
            </div>{" "}
            <Divider className="!my-8 text-pink-500">
              {" "}
              Add Manual Vitals (Optional){" "}
            </Divider>{" "}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {" "}
              {[
                { name: "systolic", label: "BP Systolic (mmHg)" },
                { name: "diastolic", label: "BP Diastolic (mmHg)" },
                { name: "temperature", label: "Temperature (°F)" },
                { name: "sugar", label: "Fasting Sugar (mg/dL)" },
                { name: "height", label: "Height (cm)" },
                { name: "weight", label: "Weight (kg)" },
              ].map((v) => (
                <Form.Item
                  key={v.name}
                  name={v.name}
                  label={v.label}
                  validateFirst
                  validateTrigger="onChange"
                  rules={[
                    {
                      validator: (_, value) => {
                        if (!value) return Promise.resolve();
                        if (value.length < 3 && isNaN(value)) {
                          return Promise.reject(
                            new Error("At least 3 characters or a valid number")
                          );
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  {" "}
                  <CustomInput type="number" placeholder={v.label} />{" "}
                </Form.Item>
              ))}{" "}
            </div>{" "}
            <Divider className="!my-8 text-pink-500">Ask HealthMate AI</Divider>{" "}
            <Form.Item
              name="aiPrompt"
              label="Describe your issue"
              rules={baseRules}
              validateFirst
              validateTrigger="onChange"
            >
              {" "}
              <CustomInput
                placeholder="e.g., I have dizziness and high BP readings"
                className="py-3 rounded-full"
              />{" "}
            </Form.Item>{" "}
            <div className="flex justify-end mt-10">
              {" "}
              <CustomButton
                icon={<SendOutlined />}
                value="Send to AI"
                className="bg-gradient-to-r from-sky-400 to-blue-600 text-white px-6 py-2 rounded-full hover:scale-95 transition"
                onClick={handleSend}
              />{" "}
            </div>{" "}
          </Form>
        </Card>

        {aiResponse && (
          <Card className="rounded-2xl shadow-lg border-none bg-white/90 backdrop-blur-sm mt-10 p-6">
            <h2 className="text-2xl font-bold text-sky-600 mb-4">
              🤖 AI Analysis Summary
            </h2>

            <p className="text-gray-700 mb-4">{aiResponse.summary}</p>

            {aiResponse.keyFindings?.length > 0 && (
              <>
                <h3 className="font-semibold text-gray-800 mt-4">
                  Key Findings:
                </h3>
                <ul className="list-disc ml-6 text-gray-600">
                  {aiResponse.keyFindings.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </>
            )}

            {aiResponse.recommendations?.length > 0 && (
              <>
                <h3 className="font-semibold text-gray-800 mt-4">
                  Recommendations:
                </h3>
                <ul className="list-disc ml-6 text-gray-600">
                  {aiResponse.recommendations.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </>
            )}

            <div className="mt-6 text-sm text-gray-500">
              <p>🩺 Urgency: {aiResponse.urgencyLevel || "Not specified"}</p>
              <p>🔍 Confidence: {(aiResponse.confidence * 100).toFixed(0)}%</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default UploadReports;
