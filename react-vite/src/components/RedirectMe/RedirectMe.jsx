import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RedirectMe() {
  const nav = useNavigate();

  useEffect(() => {
    nav("/my-videos");
  }, [nav]);

  return null;
}

export default RedirectMe;
