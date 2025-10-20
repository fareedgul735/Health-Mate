import { Form, message } from "antd";
import { ForgetPasswordSteps } from "../../../lib/constants";
import { useState } from "react";
import {
  CustomButton,
  CustomButtonTwin,
} from "../../../components/button/Button";
import { Link, useNavigate } from "react-router-dom";
import {
  resetPassword,
  sendForgetPasswordOtp,
  verifyOtp,
} from "../../../utils/helpers/helpers";
import Loading from "../../../components/loader/Loading";
import {
  LeftArrow,
  LoginIcon,
  RightArrow,
} from "../../../components/icons/Icons";

const ForgetPassword = () => {
  const [form] = Form.useForm();
  const [steps, setSteps] = useState(0);
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [otpVerified, setOtpVerified] = useState(false);
  const [tempPass, setTempPass] = useState("");
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

      if (currentStep.name === "password") {
        setTempPass(values.password);
        setSteps(steps + 1);
        return;
      }
      if (!otpVerified) {
        apiMessage.warning("Please verify OTP first!");
        return;
      }
      if (currentStep.name === "confirmPassword") {
        const { email, confirmPassword } = values;
        const password = tempPass;

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

  const handlePrevious = () => {
    if (steps > 0) setSteps(steps - 1);
  };

  return (
    <div className="w-full min-h-screen p-[12px] gap-[22px] flex flex-col justify-center items-center">
      {contextHolder}
      <div className="form p-6 md:p-8 w-screen max-w-md mx-auto">
        <h2 className="font-bold text-2xl text-gray-800 mb-6 text-center">
          Forgot Password in Health Mate
        </h2>

        <Form form={form} onFinish={handleNext} layout="vertical">
          <div className="space-y-10">
            <Form.Item
              name={currentStep.name}
              label={currentStep.label}
              validateFirst
              validateTrigger="onChange"
              rules={currentStep.rules}
            >
              <currentStep.component placeholder={currentStep.label} />
            </Form.Item>

            <div
              className={`flex ${
                steps > 0 ? "justify-between" : "justify-end"
              } mt-6`}
            >
              {steps > 0 && (
                <CustomButtonTwin
                  icon={<LeftArrow />}
                  value="Back"
                  onClick={handlePrevious}
                />
              )}
              <CustomButton
                htmlType="button"
                icon={
                  isLoading ? (
                    ""
                  ) : steps < ForgetPasswordSteps.length - 1 ? (
                    <RightArrow />
                  ) : (
                    <LoginIcon />
                  )
                }
                value={
                  isLoading ? (
                    <Loading />
                  ) : steps === 0 ? (
                    "Send OTP"
                  ) : steps === 1 ? (
                    "Verify OTP"
                  ) : steps === 2 ? (
                    "Next"
                  ) : (
                    "Reset Password"
                  )
                }
                onClick={handleNext}
              />
            </div>
          </div>
        </Form>

        <div className="wrapper mt-12 flex flex-col justify-center items-center gap-3 text-sm">
          <p>
            <span>Back to ?</span>{" "}
            <Link
              to="/login"
              className="text-blue-700 font-medium hover:text-blue-500 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
