import { useEffect, useState } from "react";
import { Card, Button, Modal, Input, Form } from "antd";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import CustomInput from "../../../components/input/Input";
import { CustomButton } from "../../../components/button/Button";
import { getuserName } from "../../../utils/helpers/helpers";

const Family = () => {
  const [userData, setUserData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSave = (values) => {
    console.log("Family member data:", values);
    setIsModalOpen(false);
  };

  const loadUser = async () => {
    try {
      const data = await getuserName();
      setUserData(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f2ff] to-[#f8fbff] p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Family Members
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card
          hoverable
          className="rounded-2xl shadow-md border border-gray-100"
          style={{ textAlign: "center" }}
        >
          <UserOutlined
            style={{
              fontSize: "40px",
              color: "#3b82f6",
              marginBottom: "10px",
            }}
          />
          <h3 className="text-lg font-semibold">{userData?.userName}</h3>
          <p className="text-gray-500 text-sm">Self</p>
          <p className="text-gray-400 text-xs mt-1">
            Last activity: Oct 15, 2025
          </p>
        </Card>
        <Card
          hoverable
          onClick={handleOpenModal}
          style={{ textAlign: "center" }}
          className="flex flex-col justify-center items-center rounded-2xl shadow-md border border-dashed border-blue-300 hover:border-blue-500 cursor-pointer transition-all"
        >
          <PlusOutlined style={{ fontSize: "36px", color: "#2563eb" }} />
          <p className="text-blue-600 mt-2 font-medium">Add Family Member</p>
        </Card>
      </div>

      <Modal
        title="Add Family Member"
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
        centered
      >
        <Form layout="vertical" onFinish={handleSave}>
          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: "Please enter a name" }]}
          >
            <CustomInput placeholder={"Enter member name"} />
          </Form.Item>

          <Form.Item
            label="Relation"
            name="relation"
            rules={[{ required: true, message: "Please enter relation" }]}
          >
            <CustomInput placeholder={"e.g. Mother, Wife, Son"} />
          </Form.Item>

          <Form.Item label="Custom ID (optional)" name="customId">
            <CustomInput placeholder="Enter a custom ID (optional)" />
          </Form.Item>

          <div className="flex justify-between gap-3 mt-4">
            <CustomButton value={"Close"} onClick={handleCloseModal} />
            <CustomButton value={"Save"} htmlType={"submit"} />
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Family;
