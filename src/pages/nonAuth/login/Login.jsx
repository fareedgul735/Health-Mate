import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../../../components/input/Input";
import PasswordInput from "../../../components/input/PasswordInput";
import { Form, message } from "antd";
import { CustomButton } from "../../../components/button/Button";
import { UserSignin } from "../../../utils/helpers/helpers";
import { useState } from "react";
import Loading from "../../../components/loader/Loading";
import { LoginIcon } from "../../../components/icons/Icons";
import { CheckCircle } from "lucide-react";

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
    <div className="w-screen flex flex-col">
      {contextHolder}
      <div className="form w-screen flex-col lg:flex-row flex gap-[122px] justify-center items-center">
        <div className="information-login w-full md:w-[40%] p-[12px] slide-right">
          <div className="text">
            <h1 className="text-[24px] md:text-[28px] font-bold text-gray-800">
              Welcome Back
            </h1>
            <span className="text-gray-600 text-sm md:text-base">
              Sign in to manage your reports, vitals & AI insights.
            </span>
          </div>

          <div className="box-info bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-2xl border border-blue-100 p-5 flex flex-col gap-2">
            <b className="flex items-center gap-3 text-sky-600 text-base font-semibold">
              <CheckCircle className="w-5 h-5 text-sky-500" />
              Your Data Stays Yours!
            </b>
            <p className="text-gray-600 text-sm">
              Encrypted storage ensures your health records are secure and only
              accessible by authorized doctors.
            </p>
          </div>
        </div>
        <div className="lg:w-[40%] w-[100%] p-[12px] slide-left">
          <Form form={form} onFinish={onLoginSuccessFully} layout="vertical">
            <Form.Item
              className={"slide-left"}
              label="Email"
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
              className={"slide-left"}
              label="Password"
              name="password"
              rules={[{ required: true, message: "Password is required" }]}
            >
              <PasswordInput label="Password" type="password" />
            </Form.Item>

            <Form.Item>
              <CustomButton
                className="w-full hover:!scale-95 active:!scale-90"
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
      </div>
    </div>
  );
};

export default Login;
