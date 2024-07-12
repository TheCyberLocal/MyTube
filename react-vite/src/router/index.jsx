import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import LandingPage from "../components/LandingPage";
import MyVideosPage from "../components/MyVideosPage";
import BlankPage from "../components/BlankPage/BlankPage";
import Layout from "./Layout";
import ProfilePage from "../components/ProfilePage/ProfilePage";
import { Navigate } from "react-router-dom";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "*",
        element: <Navigate to="/my-videos" replace={true} />,
      },
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/profile",
        element: <BlankPage content={<ProfilePage />} />,
      },
      {
        path: "/login",
        element: <BlankPage content={<LoginFormPage />} />,
      },
      {
        path: "/signup",
        element: <BlankPage content={<SignupFormPage />} />,
      },
      {
        path: "/my-videos",
        element: <MyVideosPage />,
      },
    ],
  },
]);
