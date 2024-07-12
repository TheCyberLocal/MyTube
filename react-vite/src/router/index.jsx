import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import LandingPage from "../components/LandingPage";
import MyVideosPage from "../components/MyVideosPage";
import BlankPage from "../components/BlankPage/BlankPage";
import RedirectMe from "../components/RedirectMe/RedirectMe";
import Layout from "./Layout";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "*",
        element: <RedirectMe />,
      },
      {
        path: "/",
        element: <LandingPage />,
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
