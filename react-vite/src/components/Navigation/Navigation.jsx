import { useSelector } from "react-redux";
import "./Navigation.css";

function Navigation() {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div>
      {!sessionUser && <h1>Welcome to MyTube</h1>}
    </div>
  );
}

export default Navigation;
