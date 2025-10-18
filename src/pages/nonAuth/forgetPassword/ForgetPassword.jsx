import { Form, message } from "antd";
import { ForgetPasswordSteps } from "../../../lib/constants";
import { useState } from "react";
import { CustomButton } from "../../../components/button/Button";
import { Link, useNavigate } from "react-router-dom";
import {
  resetPassword,
  sendForgetPasswordOtp,
  verifyOtp,
} from "../../../utils/helpers/helpers";

const ForgetPassword = () => {
  const [form] = Form.useForm();
  const [steps, setSteps] = useState(0);
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [otpVerified, setOtpVerified] = useState(false);
  const [apiMessage, contextHolder] = message.useMessage();
  const currentStep = ForgetPasswordSteps[steps];

  const handleNext = async () => {
    try {
      await form.validateFields([currentStep.name]);
      const values = form.getFieldsValue(true);

      if (currentStep.name === "email") {
        try {
          setIsLoading(true);
          await sendForgetPasswordOtp(values.email);
          setOtpSent(true);
          apiMessage.success("OTP sent successfully!");
          setSteps(steps + 1);
        } catch (err) {
          apiMessage.error(err.response?.data?.msg || "Failed to send OTP");
        } finally {
          setIsLoading(false);
        }
        return;
      }

      if (currentStep.name === "otp") {
        if (!otpSent) {
          apiMessage.warning("Please send OTP first!");
          return;
        }

        try {
          setIsLoading(true);
          const res = await verifyOtp(values.email, values.otp);

          if (res?.data?.msg?.toLowerCase().includes("verified")) {
            apiMessage.success("OTP verified successfully!");
            setOtpVerified(true);
            setSteps(steps + 1);
          } else {
            setOtpVerified(false);
            apiMessage.error("Invalid OTP. Please try again!");
          }
        } catch (err) {
          console.log("OTP verification error:", err);
          setOtpVerified(false);
          apiMessage.error(err.response?.data?.msg || "Invalid or expired OTP");
        } finally {
          setIsLoading(false);
        }
        return;
      }

      if (
        currentStep.name === "password" ||
        currentStep.name === "confirmPassword"
      ) {
        if (!otpVerified) {
          apiMessage.warning("Please verify OTP first!");
          return;
        }

        const { email, password, confirmPassword } = values;

        try {
          setIsLoading(true);
          const res = await resetPassword({ email, password, confirmPassword });
          apiMessage.success(res.data?.msg || "Password reset successfully!");
          form.resetFields();
          navigate("/login");
        } catch (err) {
          apiMessage.error(
            err.response?.data?.msg || "Failed to reset password"
          );
        } finally {
          setIsLoading(false);
        }
        return;
      }
    } catch (err) {
      console.log("Validation error:", err);
    }
  };

  return (
    <div>
      {contextHolder}
      <div className="headings">
        <h1>Forgotten Password DummyWeb</h1>
      </div>
      <Form form={form} onFinish={handleNext}>
        <Form.Item
          name={currentStep.name}
          label={currentStep.label}
          validateFirst
          validateTrigger="onChange"
          rules={currentStep.rules}
        >
          <currentStep.component placeholder={currentStep.label} />
        </Form.Item>
        <Form.Item>
          <CustomButton
            htmlType={"button"}
            onClick={handleNext}
            value={"Send Login Link"}
          />
        </Form.Item>
      </Form>

      <div className="redirect">
        <span>
          Back to <Link to={"/login"}>Login</Link>
        </span>
      </div>
    </div>
  );
};

export default ForgetPassword;
