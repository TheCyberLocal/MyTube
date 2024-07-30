import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaUser,
  FaBriefcase,
} from "react-icons/fa";
import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  function copyEmailToClipboard() {
    const email = "timdiscovers@gmail.com";
    navigator.clipboard
      .writeText(email)
      .then(() => {
        alert("Email copied to clipboard!");
      })
      .catch(() => {
        alert("Copy failed, please try again.");
      });
  }

  return (
    <footer>
      <div id="footer-copyright">
        © {currentYear} Timothy Macfarlane. All rights reserved.
      </div>
      <div id="footer-icons">
        <a
          href="https://thecyberlocal.github.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaUser size={24} />
        </a>
        <a
          href="https://docs.google.com/document/d/1LT2Iz5d83Csb5v13ttEb-NLPQ6O8Cr8O64vQ4Fcqw0k"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaBriefcase size={24} />
        </a>
        <a
          href="https://linkedin.com/in/tzm01"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin size={24} />
        </a>
        <a
          href="https://github.com/TheCyberLocal"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub size={24} />
        </a>
        <a href="#" onClick={() => copyEmailToClipboard()}>
          <FaEnvelope size={24} />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
