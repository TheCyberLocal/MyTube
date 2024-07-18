import { useNavigate } from "react-router-dom";
import "./VideoTile.css";

function VideoTile({ video }) {
  const nav = useNavigate();

  return (
    <div
      key={video.id}
      className="video-tile fade-in"
      onClick={() => nav(`/videos/${video.id}`)}
    >
      <div className="image-container">
        <img
          src={`https://img.youtube.com/vi/${video.url}/hqdefault.jpg`}
          srcSet={`https://img.youtube.com/vi/${video.url}/maxresdefault.jpg 4x,
           https://img.youtube.com/vi/${video.url}/hqdefault.jpg 3x,
           https://img.youtube.com/vi/${video.url}/mqdefault.jpg 2x,
           https://img.youtube.com/vi/${video.url}/default.jpg 1x`}
          alt="YouTube Video Thumbnail"
        />
      </div>
      <div className="title">{video.title}</div>
    </div>
  );
}

export default VideoTile;
