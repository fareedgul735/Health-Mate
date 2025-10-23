import { Modal, Form, DatePicker, Select, message } from "antd";
import { CustomButton } from "../../../components/button/Button";

const UploadModal = ({ onSubmit }) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const handleFinish = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
    } catch {
      messageApi.error("Please complete all fields");
    }
  };

  return (
    <>
      {contextHolder}
      <Modal
        closeIcon={false}
        open={() => true}
        footer={null}
        centered
        width={450}
        className="rounded-2xl"
      >
        <h2 className="text-center text-xl font-semibold text-gray-700 mb-4">
          Report Date & Type
        </h2>

        <Form form={form} layout="vertical" className="flex flex-col gap-4">
          <Form.Item
            name="date"
            label="Report Date"
            rules={[{ required: true, message: "Select a date!" }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item
            name="type"
            label="Report Type"
            rules={[{ required: true, message: "Select report type!" }]}
          >
            <Select placeholder="Select Type">
              <Select.Option value="Blood Test">Blood Test</Select.Option>
              <Select.Option value="X-ray">X-ray</Select.Option>
              <Select.Option value="Urine Test">Urine Test</Select.Option>
              <Select.Option value="Ultrasound">Ultrasound</Select.Option>
              <Select.Option value="Other">Other</Select.Option>
            </Select>
          </Form.Item>

          <CustomButton
            value="Next"
            onClick={handleFinish}
            className="w-full"
          />
        </Form>
      </Modal>
    </>
  );
};

export default UploadModal;
