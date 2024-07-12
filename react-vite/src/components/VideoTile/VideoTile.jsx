import { useNavigate } from "react-router-dom";
import "./VideoTile.css";

function VideoTile({ video }) {
  const nav = useNavigate();

  return (
    <div
      key={video.id}
      className="video-item"
      onClick={() => nav(`/videos/${video.id}`)}
    >
      <img
        srcSet={`
      http://img.youtube.com/vi/${video.url}/maxresdefault.jpg 1280w,
      http://img.youtube.com/vi/${video.url}/hqdefault.jpg 960w,
      http://img.youtube.com/vi/${video.url}/mqdefault.jpg 640w,
      http://img.youtube.com/vi/${video.url}/default.jpg 320w
      `}
        alt="YouTube Video Thumbnail"
      />
      <div>{video.title}</div>
    </div>
  );
}

export default VideoTile;
