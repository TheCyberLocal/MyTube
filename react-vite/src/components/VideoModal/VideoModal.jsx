import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useEffect, useState } from "react";

function VideoModal({ type, video = null }) {
  const nav = useNavigate();
  const { closeModal } = useModal();
  const [errors, setErrors] = useState({});
  const [videoURL, setVideoURL] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDesc, setVideoDesc] = useState("");
  const [videoTags, setVideoTags] = useState("");

  useEffect(() => {
    const urlFormat1 = videoURL.split("=").at(-1);
    const urlFormat2 = videoURL.split("/").at(-1);
    const YouTubeId =
      urlFormat1.length < urlFormat2.length ? urlFormat1 : urlFormat2;

    fetch(
      `https://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=${YouTubeId}`
    )
      .then((res) => res.json())
      .then((res) => {
        setVideoTitle(res.title);
        const { url, ...noErrorURL } = errors;
        setErrors(noErrorURL);
      })
      .catch(() => {
        setVideoTitle("");
        setErrors({ ...errors, url: "Video does not exist" });
      });
  }, [videoURL]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkSignup({
        username,
        name,
        email,
        password,
        confirm_password: confirmPassword,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse.errors);
    } else {
      nav("/my-videos");
    }
  };

  return (
    <div id="main-container">
      <h1>{type} Video</h1>
      <form>
        <div className="input-container">
          <input
            type="text"
            value={videoURL}
            onChange={(e) => setVideoURL(e.target.value)}
            required
            placeholder=""
          />
          <label className="moving-label">YouTube URL</label>
        </div>
        <div className="error-container">
          {errors.url && <p className="error">{errors.url}</p>}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={videoTitle}
            onChange={(e) => setVideoTitle(e.target.value)}
            required
            placeholder=""
          />
          <label className="moving-label">Title</label>
        </div>
        <div className="error-container">
          {errors.title && <p className="error">{errors.title}</p>}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={videoDesc}
            onChange={(e) => setVideoDesc(e.target.value)}
            required
            placeholder=""
          />
          <label className="moving-label">Description</label>
        </div>
        <div className="error-container">
          {errors.description && (
            <p className="error">{errors.description[0]}</p>
          )}
        </div>
        <div className="button-container">
          <button onClick={handleSubmit}>Save</button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default VideoModal;
