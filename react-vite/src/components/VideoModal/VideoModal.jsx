import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useTranslation } from "../../context/Lang";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MultiSelect } from "react-multi-select-component";
import { getTags } from "../../utils";
import { updateVideoThunk, createVideoThunk } from "../../redux/videoDetails";

function VideoModal({ type, video = null }) {
  const { user } = useSelector((state) => state.session);

  const nav = useNavigate();
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const { t } = useTranslation();
  const [errors, setErrors] = useState({});
  const [videoURL, setVideoURL] = useState(video?.url ?? "");
  const [videoTitle, setVideoTitle] = useState(video?.title ?? "");
  const [videoDesc, setVideoDesc] = useState(video?.description ?? "");
  const [videoTags, setVideoTags] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchAndTranslateTags = async () => {
      const translatedTags = await getTags(user?.language);
      setOptions(translatedTags);

      if (video) {
        const existingTags = video.tags.map((tag) =>
          translatedTags.find((t) => t.value === tag.id),
        );
        setVideoTags(existingTags);
      }
    };
    fetchAndTranslateTags();
  }, [user?.language, video]);

  useEffect(() => {
    if (videoURL === "" || videoTitle != "") return;

    const urlFormat1 = videoURL.split("=").at(-1);
    const urlFormat2 = videoURL.split("/").at(-1);
    const YouTubeId =
      urlFormat1.length < urlFormat2.length ? urlFormat1 : urlFormat2;

    fetch(
      `https://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=${YouTubeId}`,
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
    if (!videoURL) newErrors.url = t("url_required");
    if (!videoTitle || videoTitle.length > 255)
      newErrors.title = t("invalid_title");
    if (!videoDesc) newErrors.description = t("description_required");
    if (!videoTags.length) newErrors.tags = t("tags_required");

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
    } else if (type === "update") {
      setErrors({});
      await dispatch(
        updateVideoThunk(video.id, {
          title: videoTitle,
          description: videoDesc,
          tags: videoTags.map((e) => e.value),
        }),
      );
      closeModal();
      window.location.reload();
    } else if (type === "add") {
      setErrors({});
      await dispatch(
        createVideoThunk({
          url: videoURL,
          title: videoTitle,
          description: videoDesc,
          tags: videoTags.map((e) => e.value),
        }),
      );
      closeModal();
      nav("my-videos");
      window.location.reload();
    }
  };

  return (
    <div id="main-container">
      <h1>{t(`${type}_video`)}</h1>
      <form>
        {type === "add" ? (
          <>
            <div className="input-container">
              <input
                type="text"
                value={videoURL}
                onChange={(e) => setVideoURL(e.target.value)}
                required
                placeholder=""
              />
              <label className="moving-label">{t("youtube_url")}</label>
            </div>
            <div className="error-container">
              {errors.url && <p className="error">{errors.url}</p>}
            </div>
          </>
        ) : null}
        <div className="input-container">
          <input
            type="text"
            value={videoTitle}
            onChange={(e) => setVideoTitle(e.target.value)}
            required
            placeholder=""
          />
          <label className="moving-label">{t("title")}</label>
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
          <label className="moving-label">{t("description")}</label>
        </div>
        <div className="error-container">
          {errors.description && <p className="error">{errors.description}</p>}
        </div>
        <div className="multi-selector">
          <label className="static-label">{t("tags")}</label>
          <MultiSelect
            options={options}
            value={videoTags}
            onChange={setVideoTags}
            labelledBy="Select"
            hasSelectAll={false}
            overrideStrings={{
              selectSomeItems: t("select"),
            }}
          />
        </div>
        <div className="error-container">
          {errors.tags && <p className="error">{errors.tags}</p>}
        </div>
        <div className="button-container">
          <button onClick={handleSubmit}>{t("save")}</button>
          <button onClick={closeModal}>{t("cancel")}</button>
        </div>
      </form>
    </div>
  );
}

export default VideoModal;
