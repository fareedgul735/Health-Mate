export const BASE_URL = "http://heatlh-mate-bk-production.up.railway.app/api";

export const SignupUser = `${BASE_URL}/auth/signup`;

export const SigninUser = `${BASE_URL}/auth/login`;

export const SendOtp = `${BASE_URL}/security/sendOtp`;

export const otpVerify = `${BASE_URL}/security/verifyOtp`;

export const sendOtpForgetPassword = `${BASE_URL}/auth/forgetPassword`;

export const ResetPassword = `${BASE_URL}/auth/resetPassword`;

export const GetUserName = `${BASE_URL}/data/userInfo`;

export const UploadReportAi = `${BASE_URL}/upload/analyzeReport`;
