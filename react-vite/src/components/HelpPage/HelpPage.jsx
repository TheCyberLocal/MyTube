import "./HelpPage.css";
import { getTranslation as t } from "../../utils";
import { useSelector } from "react-redux";

function HelpPage() {
  const { language: lang } = useSelector((state) => state.session);

  return (
    <div id="help-page">
      <h1>{t(lang, "help_page_title")}</h1>
      <p>{t(lang, "help_page_welcome")}</p>

      <div className="segment">
        <h2>{t(lang, "help_page_users")}</h2>

        <div className="question-container">
          <h3>{t(lang, "help_page_users_q1")}</h3>
          <p>{t(lang, "help_page_users_a1")}</p>
        </div>

        <div className="question-container">
          <h3>{t(lang, "help_page_users_q2")}</h3>
          <p>{t(lang, "help_page_users_a2")}</p>
        </div>

        <div className="question-container">
          <h3>{t(lang, "help_page_users_q3")}</h3>
          <p>{t(lang, "help_page_users_a3")}</p>
        </div>

        <div className="question-container">
          <h3>{t(lang, "help_page_users_q4")}</h3>
          <p>{t(lang, "help_page_users_a4")}</p>
        </div>

        <div className="question-container">
          <h3>{t(lang, "help_page_users_q5")}</h3>
          <p>{t(lang, "help_page_users_a5")}</p>
        </div>
      </div>

      <div className="segment">
        <h2>{t(lang, "help_page_videos")}</h2>

        <div className="question-container">
          <h3>{t(lang, "help_page_videos_q1")}</h3>
          <p>{t(lang, "help_page_videos_a1")}</p>
        </div>

        <div className="question-container">
          <h3>{t(lang, "help_page_videos_q2")}</h3>
          <p>{t(lang, "help_page_videos_a2")}</p>
        </div>

        <div className="question-container">
          <h3>{t(lang, "help_page_videos_q3")}</h3>
          <p>{t(lang, "help_page_videos_a3")}</p>
        </div>

        <div className="question-container">
          <h3>{t(lang, "help_page_videos_q4")}</h3>
          <p>{t(lang, "help_page_videos_a4")}</p>
        </div>

        <div className="question-container">
          <h3>{t(lang, "help_page_videos_q5")}</h3>
          <p>{t(lang, "help_page_videos_a5")}</p>
        </div>

        <div className="question-container">
          <h3>{t(lang, "help_page_videos_q6")}</h3>
          <p>{t(lang, "help_page_videos_a6")}</p>
        </div>
      </div>

      <div className="segment">
        <h2>{t(lang, "help_page_notes")}</h2>

        <div className="question-container">
          <h3>{t(lang, "help_page_notes_q1")}</h3>
          <p>{t(lang, "help_page_notes_a1")}</p>
        </div>

        <div className="question-container">
          <h3>{t(lang, "help_page_notes_q2")}</h3>
          <p>{t(lang, "help_page_notes_a2")}</p>
        </div>

        <div className="question-container">
          <h3>{t(lang, "help_page_notes_q3")}</h3>
          <p>{t(lang, "help_page_notes_a3")}</p>
        </div>

        <div className="question-container">
          <h3>{t(lang, "help_page_notes_q4")}</h3>
          <p>{t(lang, "help_page_notes_a4")}</p>
        </div>
      </div>

      <div className="segment">
        <h2>{t(lang, "help_page_highlights")}</h2>

        <div className="question-container">
          <h3>{t(lang, "help_page_highlights_q1")}</h3>
          <p>{t(lang, "help_page_highlights_a1")}</p>
        </div>

        <div className="question-container">
          <h3>{t(lang, "help_page_highlights_q2")}</h3>
          <p>{t(lang, "help_page_highlights_a2")}</p>
        </div>

        <div className="question-container">
          <h3>{t(lang, "help_page_highlights_q3")}</h3>
          <p>{t(lang, "help_page_highlights_a3")}</p>
        </div>

        <div className="question-container">
          <h3>{t(lang, "help_page_highlights_q4")}</h3>
          <p>{t(lang, "help_page_highlights_a4")}</p>
        </div>
      </div>

      <p>{t(lang, "help_page_guide")}</p>

      <p>{t(lang, "help_page_happy_organizing")}</p>
    </div>
  );
}

export default HelpPage;
