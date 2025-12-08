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
import Loading from "../../../components/loader/Loading";
import { FaCheckCircle, FaShieldAlt } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

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
    <div className="min-w-screen p-[12px] gap-[122px] flex-col lg:flex-row flex justify-center items-center">
      {contextHolder}

      <div className="information-signup lg:w-[50%] w-[100%] slide-right">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Create your account
          </h2>
          <p className="text-gray-600 mt-1">
            One place for reports, vitals, and AI insights.{" "}
            <span className="text-sky-600 font-medium">Bilkul asaan.</span>
          </p>
        </div>

        <ul className="space-y-4 mb-8">
          <li className="flex items-start gap-3">
            <FaCheckCircle className="w-5 h-5 text-sky-500 mt-[2px]" />
            <span className="text-gray-700">
              Upload PDFs & photos of reports — Gemini explains in{" "}
              <b>EN + Roman Urdu.</b>
            </span>
          </li>
          <li className="flex items-start gap-3">
            <FaCheckCircle className="w-5 h-5 text-sky-500 mt-[2px]" />
            <span className="text-gray-700">
              Track manual <b>Vitals</b> (BP, Sugar, Weight) with reminders.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <FaCheckCircle className="w-5 h-5 text-sky-500 mt-[2px]" />
            <span className="text-gray-700">
              <b>Privacy-first:</b> encrypted storage, signed links for doctors.
            </span>
          </li>
        </ul>

        <div className="border border-pink-100 bg-pink-50 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-3 shadow-sm">
          <div className="flex items-center gap-2 text-pink-600 font-semibold">
            <FaShieldAlt className="w-5 h-5" />
            We respect your privacy
          </div>
          <p className="text-gray-600 text-sm sm:ml-4">
            HealthMate shares nothing without your permission. You own your
            data.
          </p>
        </div>
      </div>
      <div className="form lg:w-[30%] w-[100%] slide-left">
        <Form form={form} onFinish={handleNext} layout="vertical">
          <div className="space-y-10">
            <Form.Item
              name={currentStep.name}
              label={currentStep.label}
              validateFirst
              validateTrigger="onChange"
              rules={currentStep.rules}
            >
              <currentStep.component
                className={"slide-left"}
                placeholder={currentStep.label}
              />
            </Form.Item>

            <div
              className={`flex ${
                step > 0 ? "justify-between" : "justify-end"
              } mt-6`}
            >
              {step > 0 && (
                <CustomButtonTwin
                  className="hover:!scale-95 active:!scale-90"
                  icon={<LeftArrow />}
                  value="Back"
                  onClick={handlePrev}
                />
              )}
              <CustomButton
                className="hover:!scale-95 active:!scale-90"
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
        <CustomButton
          className="w-full mt-6"
          value={"Continue With Google"}
          onClick={() =>
            (window.location.href =
              "http://localhost:5000/api/authorized/google")
          }
          icon={
            <span className="w-6 h-6 bg-white rounded-full flex justify-center items-center">
              <FcGoogle />
            </span>
          }
        />

        <div className="wrapper mt-12 flex flex-col justify-center items-center gap-3 text-sm">
          <p>
            <span>Already have an account?</span>{" "}
            <Link
              to="/login"
              className="text-[16px] text-blue-700  hover:text-blue-500 hover:underline"
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
