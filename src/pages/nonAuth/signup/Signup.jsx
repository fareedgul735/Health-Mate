import { Link, useNavigate } from "react-router-dom";

import {
  CustomButton,
  CustomButtonTwin,
} from "../../../components/button/Button";
import { Form, message } from "antd";
import { useState } from "react";
import { STEPS } from "../../../lib/constants";
import { sendOtp, UserSignup, verifyOtp } from "../../../utils/helpers/helpers";
import {
  LeftArrow,
  LoginIcon,
  RightArrow,
} from "../../../components/icons/Icons";
import Steper from "../../../components/steps/Steps";
import Loading from "../../../components/loader/Loading";

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const [step, setStep] = useState(0);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [apiMessage, contextHolder] = message.useMessage();

  const currentStep = STEPS[step];

  const handleNext = async () => {
    try {
      await form.validateFields([currentStep.name]);
      const values = form.getFieldsValue(true);

      if (currentStep.name === "email") {
        try {
          setIsLoading(true);
          await sendOtp(values.email);
          setOtpSent(true);
          apiMessage.success("OTP Sent");
          setStep(step + 1);
          return;
        } catch (err) {
          apiMessage.error(err.response?.data?.msg || "Failed to send OTP");
          return;
        } finally {
          setIsLoading(false);
        }
      }

      if (currentStep.name === "otp") {
        if (!otpSent) {
          apiMessage.warning("Please send OTP first!");
          return;
        }
        try {
          setIsLoading(true);
          const res = await verifyOtp(values.email, values.otp);
          apiMessage.success("OTP Verified");
          setOtpVerified(true);
          setStep(step + 1);
          return res;
        } catch (err) {
          console.log(err);
          setOtpVerified(false);
          apiMessage.error("Invalid or expired OTP");
          return;
        } finally {
          setIsLoading(false);
        }
      }
      if (step === STEPS.length - 1) {
        if (!otpVerified) {
          apiMessage.warning("Please verify OTP first!");
          return;
        }
        const { otp, ...data } = values;
        try {
          setIsLoading(true);
          const res = await UserSignup(data);
          localStorage.setItem("token", res.data.token);
          navigate("/dashboard");
        } catch (err) {
          apiMessage.error(err.response?.data?.msg || "Signup failed");
        } finally {
          setIsLoading(false);
        }
        return;
      }

      setStep(step + 1);
    } catch (err) {
      console.log("Validation error:", err);
    }
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };
  return (
    <div className="w-full min-h-screen p-[12px] gap-[22px] flex flex-col justify-center items-center">
      {contextHolder}
      <div>
        <Steper step={step} />
      </div>
      <div className="form p-6 md:p-8 w-full max-w-md mx-auto">
        <h2 className="font-bold text-2xl text-gray-800 mb-6 text-center">
          Signup in DummyLogo
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
                step > 0 ? "justify-between" : "justify-end"
              } mt-6`}
            >
              {step > 0 && (
                <CustomButtonTwin
                  icon={<LeftArrow />}
                  value="Back"
                  onClick={handlePrev}
                />
              )}
              <CustomButton
                htmlType="button"
                icon={
                  isLoading ? (
                    ""
                  ) : step < STEPS.length - 1 ? (
                    <RightArrow />
                  ) : (
                    <LoginIcon />
                  )
                }
                value={
                  isLoading ? (
                    <Loading />
                  ) : step < STEPS.length - 1 ? (
                    "Next"
                  ) : (
                    "Signup"
                  )
                }
                onClick={handleNext}
              />
            </div>
          </div>
        </Form>

        <div className="wrapper mt-12 flex flex-col justify-center items-center gap-3 text-sm">
          <p>
            <span>Already have an account?</span>{" "}
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

export default Signup;
