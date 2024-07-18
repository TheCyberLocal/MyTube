import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  const nav = useNavigate();

  return (
    <div id="landing-page">
      <div className="content">
        <img onClick={() => nav("/login")} src="../../site-button.png" alt="" />
        <p>
          Your ultimate platform for organizing and learning from YouTube
          videos.
        </p>
        <p>
          Easily save, organize, and annotate your favorite videos for better
          learning and reference.
        </p>
        <p>
          Start your journey by signing up or logging in to access your
          personalized video library.
        </p>
      </div>
    </div>
  );
}

export default LandingPage;
