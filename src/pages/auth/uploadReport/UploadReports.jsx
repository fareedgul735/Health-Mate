import { Form, Input, DatePicker, Upload, Card, Divider, message } from "antd";
import { UploadOutlined, SendOutlined } from "@ant-design/icons";
import { CustomButton } from "../../../components/button/Button.jsx";
import CustomInput from "../../../components/input/Input.jsx";
import { uploadReportAiInfo } from "../../../utils/helpers/helpers.js";

const { TextArea } = Input;

const UploadReports = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const handleSend = async () => {
    try {
      const values = await form.validateFields();
      const res = await uploadReportAiInfo(values);
      console.log(res);
      messageApi.success("Report validated successfully! Sending to AI...");
      form.resetFields();
    } catch (errorInfo) {
      messageApi.error("Please fill all required fields before sending!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 p-8">
      {contextHolder}
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          <UploadOutlined /> Upload Medical Report
        </h1>

        <Card className="rounded-2xl shadow-lg border-none bg-white/80 backdrop-blur-sm">
          <Form form={form} layout="vertical">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Form.Item name="title" label="Title (optional)">
                <CustomInput placeholder="e.g., Ultrasound Abdomen" />
              </Form.Item>

              <Form.Item
                name="testName"
                label="Test name"
                rules={[{ required: true, message: "Test name is required!" }]}
              >
                <CustomInput placeholder="Ultrasound / X-ray / CBC / ABG" />
              </Form.Item>

              <Form.Item
                name="files"
                label="Files (optional, multiple)"
                className="md:col-span-2"
              >
                <Upload multiple beforeUpload={() => false}>
                  <CustomButton
                    value={"Choose Files"}
                    icon={<UploadOutlined />}
                  />
                </Upload>
              </Form.Item>

              <Form.Item
                name="hospital"
                label="Hospital / Lab"
                rules={[
                  { required: true, message: "Hospital / Lab is required!" },
                ]}
              >
                <CustomInput placeholder="e.g., Aga Khan" />
              </Form.Item>

              <Form.Item
                name="doctor"
                label="Doctor"
                rules={[
                  { required: true, message: "Doctor name is required!" },
                ]}
              >
                <CustomInput placeholder="e.g., Dr. Ahmed" />
              </Form.Item>

              <Form.Item
                name="date"
                label="Date"
                rules={[{ required: true, message: "Date is required!" }]}
              >
                <DatePicker className="w-full" />
              </Form.Item>

              <Form.Item
                name="price"
                label="Price (Rs)"
                rules={[{ required: true, message: "Price is required!" }]}
              >
                <CustomInput placeholder="e.g., 3500" />
              </Form.Item>

              <Form.Item
                name="notes"
                label="Additional notes"
                className="md:col-span-2"
              >
                <TextArea rows={3} placeholder="Symptoms, instructions, etc." />
              </Form.Item>
            </div>

            <Divider className="!my-8 text-pink-500">
              Add Manual Vitals (Optional)
            </Divider>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <Form.Item name="systolic" label="BP Systolic (mmHg)">
                <CustomInput placeholder="BP Systolic (mmHg)" />
              </Form.Item>
              <Form.Item name="diastolic" label="BP Diastolic (mmHg)">
                <CustomInput placeholder="BP Diastolic (mmHg)" />
              </Form.Item>
              <Form.Item name="temperature" label="Temperature (°F)">
                <CustomInput placeholder="Temperature (°F)" />
              </Form.Item>
              <Form.Item name="sugar" label="Fasting Sugar (mg/dL)">
                <CustomInput placeholder="Fasting Sugar (mg/dL)" />
              </Form.Item>
              <Form.Item name="height" label="Height (cm)">
                <CustomInput placeholder="Height (cm)" />
              </Form.Item>
              <Form.Item name="weight" label="Weight (kg)">
                <CustomInput placeholder="Weight (kg)" />
              </Form.Item>
            </div>

            <Divider className="!my-8 text-pink-500">Ask HealthMate AI</Divider>

            <Form.Item
              name="aiPrompt"
              label="Describe your issue"
              rules={[
                { required: true, message: "Please describe your issue." },
              ]}
            >
              <CustomInput
                placeholder="e.g., I have dizziness and high BP readings"
                className="py-3 rounded-full"
              />
            </Form.Item>

            <div className="flex justify-end mt-10">
              <CustomButton
                icon={<SendOutlined />}
                value="Send to AI"
                className="bg-gradient-to-r from-sky-400 to-blue-600 text-white px-6 py-2 rounded-full hover:scale-95 transition"
                onClick={handleSend}
              />
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default UploadReports;
