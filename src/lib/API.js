export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api"
    : "https://heatlh-mate-bk.vercel.app/api";

export const SignupUser = `${BASE_URL}/auth/signup`;

export const SigninUser = `${BASE_URL}/auth/login`;

export const SendOtp = `${BASE_URL}/security/sendOtp`;

export const otpVerify = `${BASE_URL}/security/verifyOtp`;

export const sendOtpForgetPassword = `${BASE_URL}/auth/forgetPassword`;

export const ResetPassword = `${BASE_URL}/auth/resetPassword`;

export const GetUserName = `${BASE_URL}/data/userInfo`;

export const UploadReportAi = `${BASE_URL}/upload/analyzeReport`;

export const getReprtsWithAi = `${BASE_URL}/get/reports`;
