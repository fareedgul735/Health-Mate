import axios from "axios";
import {
  getReprtsWithAi,
  GetUserName,
  otpVerify,
  ResetPassword,
  SendOtp,
  sendOtpForgetPassword,
  SigninUser,
  SignupUser,
  UploadReportAi,
} from "../../lib/API";

export const UserSignup = async (payload) => {
  try {
    const res = await axios.post(SignupUser, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.data?.token) {
      localStorage.setItem("token", res.data.token);
    }
    return res;
  } catch (err) {
    console.error("Login error:", err.response?.data || err.message);
    throw err;
  }
};

export const UserSignin = async (payload) => {
  try {
    const res = await axios.post(SigninUser, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.data?.token) {
      localStorage.setItem("token", res.data.token);
    }

    return res;
  } catch (err) {
    console.error("Login error:", err.response?.data || err.message);
    throw err;
  }
};

export const sendOtp = async (email) => {
  try {
    return await axios.post(
      SendOtp,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
};

export const verifyOtp = async (email, otp) => {
  try {
    const res = await axios.post(
      otpVerify,
      { email, otp },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res.data);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const sendForgetPasswordOtp = (email) => {
  try {
    const res = axios.post(
      sendOtpForgetPassword,
      {
        email,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const resetPassword = (data) => {
  try {
    const res = axios.post(ResetPassword, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const getuserName = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(GetUserName, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching username:", err);
    throw err;
  }
};

export const uploadReportAiInfo = async (data) => {
  try {
    const token = localStorage.getItem("token");

    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key !== "files") {
        let value = data[key];
        if (value?._isAMomentObject) value = value.format("YYYY-MM-DD");
        formData.append(key, value);
      }
    });

    if (data.files && data.files.length > 0) {
      data.files.forEach((fileObj) => {
        const file = fileObj.originFileObj || fileObj;
        if (file instanceof File) {
          formData.append("files", file);
        }
      });
    }

    const res = await axios.post(UploadReportAi, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const getReportsWithAiSummary = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(getReprtsWithAi, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.log("Error fetching reports:", err);
  }
};
