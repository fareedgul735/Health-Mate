import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../../../components/input/Input";
import PasswordInput from "../../../components/input/PasswordInput";
import { Form, message } from "antd";
import { CustomButton } from "../../../components/button/Button";
import { UserSignin } from "../../../utils/helpers/helpers";
import { useState } from "react";
import Loading from "../../../components/loader/Loading";
import { LoginIcon } from "../../../components/icons/Icons";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [apiMessage, contextHolder] = message.useMessage();

  const onLoginSuccessFully = async (payload) => {
    try {
      setIsLoading(true);
      const response = await UserSignin(payload);
      form.resetFields();
      navigate("/dashboard");
      return response;
    } catch (err) {
      console.log(err);
      apiMessage.error("Invalid Credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-[24px] md:p-8 w-full max-w-md mx-auto">
      {contextHolder}
      <h2 className="font-bold text-[20px] mb-4">Login in HealthCare</h2>
      <Form form={form} onFinish={onLoginSuccessFully}>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Email is required" },
            {
              type: "email",
              message: "Please enter a valid email address",
            },
          ]}
        >
          <CustomInput label="Email" type="email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Password is required" }]}
        >
          <PasswordInput label="Password" type="password" />
        </Form.Item>

        <Form.Item>
          <CustomButton
            className="w-full"
            icon={isLoading ? "" : <LoginIcon />}
            value={isLoading ? <Loading /> : "Login"}
            htmlType="submit"
          />
        </Form.Item>
      </Form>

      <div className="wrapper  mt-12 flex flex-col justify-center items-center gap-[12px] p-[12px]">
        <Link
          to={"/forgottenPassword"}
          className="text-blue-800 hover:underline hover:text-blue-400 hover:cursor-pointer"
        >
          Forgotten Your Password?
        </Link>
        <p className="space-x-1">
          <span>Don’t have an account ?</span>
          <Link
            to="/signup"
            className="text-blue-800 hover:underline hover:text-blue-400"
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
