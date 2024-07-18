import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { MultiSelect } from "react-multi-select-component";
import { getTags } from "../../utils";
import { updateVideoThunk, createVideoThunk } from "../../redux/videoDetails";

function VideoModal({ type, video = null }) {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [errors, setErrors] = useState({});
  const [videoURL, setVideoURL] = useState(video?.url ?? "");
  const [videoTitle, setVideoTitle] = useState(video?.title ?? "");
  const [videoDesc, setVideoDesc] = useState(video?.description ?? "");
  const [videoTags, setVideoTags] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    getTags().then((res) => setOptions(res));
    if (video) {
      const videoTagIds = video.tags.map((e) => ({
        value: e.id,
        label: e.name,
      }));
      setVideoTags(videoTagIds);
    }
  }, []);

  useEffect(() => {
    if (videoURL === "" || videoTitle != "") return;

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
  }, [videoURL, setErrors, setVideoTitle]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const newErrors = {};
    if (!videoURL) newErrors.url = "This field is required";
    if (!videoTitle) newErrors.title = "This field is required";
    if (!videoDesc) newErrors.description = "This field is required";
    if (!videoTags.length) newErrors.tags = "This field is required";

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
    } else if (type === "Update") {
      setErrors({});
      const serverErrors = await dispatch(
        updateVideoThunk(video.id, {
          url: videoURL,
          title: videoTitle,
          description: videoDesc,
          tags: videoTags.map((e) => e.value),
        })
      );
      if (serverErrors) {
        setErrors(serverErrors);
      } else {
        closeModal();
        window.location.reload();
      }
    } else if (type === "Add") {
      setErrors({});
      const serverErrors = await dispatch(
        createVideoThunk({
          url: videoURL,
          title: videoTitle,
          description: videoDesc,
          tags: videoTags.map((e) => e.value),
        })
      );
      if (serverErrors) {
        setErrors(serverErrors);
      } else {
        closeModal();
        nav("my-videos");
        window.location.reload();
      }
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
          {errors.description && <p className="error">{errors.description}</p>}
        </div>
        <div className="multi-selector">
          <MultiSelect
            options={options}
            value={videoTags}
            onChange={setVideoTags}
            labelledBy="Select"
            hasSelectAll={false}
          />
        </div>
        <div className="error-container">
          {errors.tags && <p className="error">{errors.tags}</p>}
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
