import { useState } from "react";
import {
  Form,
  Input,
  DatePicker,
  Upload,
  message,
  Spin,
  Drawer,
  Divider,
  Tooltip,
} from "antd";
import {
  SendOutlined,
  LoadingOutlined,
  RobotOutlined,
  UserOutlined,
  CloseOutlined,
  FormOutlined,
  UploadOutlined,
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
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I'm HealthMate AI. I can help you analyze your medical reports. Please fill out the form and describe your issue.",
    },
  ]);
  const [showFormDrawer, setShowFormDrawer] = useState(false);

  const handleSend = async () => {
    if (loadingAi) return; 

    try {
      setLoadingAi(true);

      const values = await form.validateFields();

      const formData = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (value?._isAMomentObject) {
            formData.append(key, value.format("YYYY-MM-DD"));
          } else {
            formData.append(key, value);
          }
        }
      });

      formData.append(
        "aiPrompt",
        inputValue?.trim() || "Analyzing my medical report..."
      );

      selectedFiles.forEach((file) => {
        if (file?.originFileObj) {
          formData.append("files", file.originFileObj);
        }
      });

      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const res = await uploadReportAiInfo(formData);

      if (!res?.data?.success) {
        throw new Error(res?.data?.message || "AI failed");
      }

      const userMessage = {
        role: "user",
        content: inputValue || "Analyzing my medical report...",
        files:
          selectedFiles.length > 0 ? selectedFiles.map((f) => f.name) : null,
      };

      const ai = res.data.aiResponse;

      const aiMessage = {
        role: "assistant",
        content: `🤖 **AI Analysis Summary**\n\n${
          ai.summary
        }\n\n**Key Findings:**\n${
          ai.keyFindings?.map((f) => `• ${f}`).join("\n") || "None"
        }\n\n**Recommendations:**\n${
          ai.recommendations?.map((r) => `• ${r}`).join("\n") || "None"
        }\n\n🩺 Urgency: ${
          ai.urgencyLevel || "Not specified"
        }\n🔍 Confidence: ${(ai.confidence * 100).toFixed(0)}%`,
      };

      setMessages((prev) => [...prev, userMessage, aiMessage]);
      setAiResponse(ai);

      form.resetFields();
      setSelectedFiles([]);
      setInputValue("");

      messageApi.success("AI analyzed your report successfully!");
    } catch (error) {
      console.error("❌ Upload Error:", error);

      const backendMsg = error?.response?.data?.message || error.message;

      messageApi.error(backendMsg || "Something went wrong!");
    } finally {
      setLoadingAi(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const removeFile = (file) => {
    setSelectedFiles(selectedFiles.filter((f) => f.uid !== file.uid));
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-sky-50 to-blue-100">
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

      <div className="flex items-center justify-end py-4 px-4">
        <Tooltip
          title="Required Fields"
          color="red"
          placement="bottom"
          open={true}
        >
          <span>
            {" "}
            <CustomButton
              icon={<FormOutlined />}
              onClick={() => setShowFormDrawer(true)}
              className="bg-gradient-to-r from-sky-400 to-blue-600 text-white hover:from-sky-500 hover:to-blue-700"
              aria-label="Open form for required fields"
            />
          </span>
        </Tooltip>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex gap-4 ${
                msg.role === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-md ${
                  msg.role === "user"
                    ? "bg-gray-700"
                    : "bg-gradient-to-br from-blue-500 to-cyan-500"
                }`}
              >
                {msg.role === "user" ? (
                  <UserOutlined className="text-white" />
                ) : (
                  <RobotOutlined className="text-white" />
                )}
              </div>

              <div
                className={`flex-1 ${
                  msg.role === "user" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block max-w-[80%] px-4 py-3 rounded-2xl shadow-md ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                      : "bg-white border border-gray-200 text-gray-800"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  {msg.files && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {msg.files.map((file, i) => (
                        <span
                          key={i}
                          className="text-xs bg-white/20 px-2 py-1 rounded"
                        >
                          📎 {file}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {loadingAi && (
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-md">
                <RobotOutlined className="text-white" />
              </div>
              <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl shadow-md">
                <div className="flex gap-1">
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-gray-200 bg-white/90 backdrop-blur-sm px-6 py-4 shadow-lg">
        <div className="max-w-3xl mx-auto">
          {selectedFiles.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {selectedFiles.map((file) => (
                <div
                  key={file.uid}
                  className="flex items-center gap-2 bg-blue-50 border border-blue-200 px-3 py-1 rounded-lg text-sm shadow-sm"
                >
                  <span className="text-blue-600">📎 {file.name}</span>
                  <CloseOutlined
                    onClick={() => removeFile(file)}
                    className="text-blue-400 hover:text-blue-600 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-center gap-3">
            <Upload
              fileList={selectedFiles}
              onChange={({ fileList }) => setSelectedFiles(fileList)}
              beforeUpload={() => false}
              showUploadList={false}
              multiple
            >
              <CustomButton icon={<UploadOutlined />} className="h-12 mb-4" />
            </Upload>

            <div className="flex-1">
              <Form.Item name="aiPrompt" rules={baseRules} className="mb-0">
                <CustomInput
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Describe your issue (e.g., I have dizziness and high BP readings)..."
                  className="h-12"
                />
              </Form.Item>
            </div>

            <CustomButton
              type="primary"
              icon={<SendOutlined />}
              onClick={handleSend}
              disabled={!inputValue.trim() && selectedFiles.length === 0}
              className="h-12 mb-4 bg-gradient-to-r from-sky-400 to-blue-600 text-white rounded-full"
            />
          </div>

          <p className="text-xs text-gray-400 mt-2 text-center">
            HealthMate AI can make mistakes. Please verify important
            information.
          </p>
        </div>
      </div>

      <Drawer
        title="Medical Report Form"
        placement="right"
        onClose={() => setShowFormDrawer(false)}
        open={showFormDrawer}
        width={500}
        className="medical-form-drawer"
      >
        <Form form={form} layout="vertical" validateTrigger="onChange">
          <div className="space-y-4">
            <Form.Item
              name="title"
              label="Title"
              rules={baseRules}
              validateFirst
              validateTrigger="onChange"
            >
              <CustomInput placeholder="e.g., Ultrasound Abdomen" />
            </Form.Item>

            <Form.Item
              name="testName"
              label="Test name"
              rules={baseRules}
              validateFirst
              validateTrigger="onChange"
            >
              <CustomInput placeholder="Ultrasound / X-ray / CBC / ABG" />
            </Form.Item>

            <Form.Item
              name="hospital"
              label="Hospital / Lab"
              rules={baseRules}
              validateFirst
              validateTrigger="onChange"
            >
              <CustomInput placeholder="e.g., Aga Khan" />
            </Form.Item>

            <Form.Item
              name="doctor"
              label="Doctor"
              rules={baseRules}
              validateFirst
              validateTrigger="onChange"
            >
              <CustomInput placeholder="e.g., Dr. Ahmed" />
            </Form.Item>

            <Form.Item
              name="date"
              label="Date"
              rules={[{ required: true, message: "Date is required" }]}
              validateFirst
              validateTrigger="onChange"
            >
              <DatePicker className="w-full" />
            </Form.Item>

            <Form.Item
              name="price"
              label="Price (Rs)"
              rules={[
                { required: true, message: "Price is required" },
                {
                  validator: (_, value) =>
                    value && isNaN(value)
                      ? Promise.reject(new Error("Must be a number"))
                      : Promise.resolve(),
                },
              ]}
              validateFirst
              validateTrigger="onChange"
            >
              <CustomInput placeholder="e.g., 3500" type="number" />
            </Form.Item>

            <Form.Item name="notes" label="Additional notes (optional)">
              <TextArea rows={3} placeholder="Symptoms, instructions, etc." />
            </Form.Item>

            <Divider className="!my-6 text-pink-500">
              Add Manual Vitals (Optional)
            </Divider>

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
                      if (!isNaN(value)) return Promise.resolve();
                      if (value.length < 3)
                        return Promise.reject(
                          new Error("At least 3 characters or a valid number")
                        );
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <CustomInput type="number" placeholder={v.label} />
              </Form.Item>
            ))}

            <div className="pt-4">
              <CustomButton
                value="Done"
                onClick={() => setShowFormDrawer(false)}
                className="w-full bg-gradient-to-r from-sky-400 to-blue-600 text-white"
              />
            </div>
          </div>
        </Form>
      </Drawer>
    </div>
  );
};

export default UploadReports;
