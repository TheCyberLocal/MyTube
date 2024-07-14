import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import LandingPage from "../components/LandingPage";
import MyVideosPage from "../components/MyVideosPage";
import BlankPage from "../components/BlankPage/BlankPage";
import Layout from "./Layout";
import ProfilePage from "../components/ProfilePage/ProfilePage";
import HelpPage from "../components/HelpPage";
import { Navigate } from "react-router-dom";
import VideoDetailsPage from "../components/VideoDetailsPage";

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
        path: "/help",
        element: <BlankPage content={<HelpPage />} />,
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
      {
        path: "/videos/:id",
        element: <VideoDetailsPage />,
      },
    ],
  },
]);
