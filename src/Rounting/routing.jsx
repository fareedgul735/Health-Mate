import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthLayout from "../pages/auth/authLayout/AuthLayout.jsx";
import NonAuthLayout from "../pages/nonAuth/nonAuthLayout/NonAuthLayout.jsx";
import Login from "../pages/nonAuth/login/Login.jsx";
import Signup from "../pages/nonAuth/signup/Signup.jsx";
import ForgetPassword from "../pages/nonAuth/forgetPassword/ForgetPassword.jsx";
import NotFound from "../NotFound.jsx";
import ViewReport from "../pages/auth/viewReport/ViewReport.jsx";
import AddMinalVitals from "../pages/auth/addMinalVitals/AddMinalVitals.jsx";
import TimeLineView from "../pages/auth/timeLineView/TimeLineView.jsx";
import Dashboard from "../pages/auth/dashboard/DashboardLayout.jsx";
import UploadReport from "../pages/auth/uploadReport/UploadReports.jsx";
import LandingPage from "../pages/nonAuth/landing/Landing.jsx";
import NonAutherized from "../pages/nonAuth/nonAutherized/NonAutherized.jsx";
import Family from "../pages/auth/family/Family.jsx";
import AuthSuccess from "../pages/auth/authSuccess/AuthSuccess.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NonAuthLayout />,
    children: [
      { index: true, element: <Navigate to={"health_mate"} replace /> },
      { path: "health_mate", element: <LandingPage /> },
    ],
  },
  {
    path: "/",
    element: <NonAutherized />,
    children: [
      { index: true, element: <Navigate to={"login"} replace /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "forgottenPassword", element: <ForgetPassword /> },
      { path: "/auth/success", element: <AuthSuccess /> },
    ],
  },

  {
    element: <AuthLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      { path: "uploadReports", element: <UploadReport /> },
      { path: "viewReports", element: <ViewReport /> },
      { path: "addMinalVitals", element: <AddMinalVitals /> },
      { path: "timeLineView", element: <TimeLineView /> },
      { path: "family", element: <Family /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default router;
