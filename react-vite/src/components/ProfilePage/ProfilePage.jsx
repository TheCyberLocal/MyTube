import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";

function ProfilePage() {
  const sessionUser = useSelector((state) => state.session.user);
  const navigate = useNavigate();

  if (!sessionUser) {
    navigate("/login");
  }

  return null;
}

export default ProfilePage;
