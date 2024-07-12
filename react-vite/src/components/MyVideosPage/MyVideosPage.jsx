import { useState, useEffect } from "react";
import { searchMyVideos } from "../../redux/myVideos";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import VideoTile from "../VideoTile";
import "./MyVideosPage.css";

function MyVideosPage() {
  const sessionUser = useSelector((state) => state.session.user);
  const videos = useSelector((state) => state.myVideos.searchResults);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [tags, setTags] = useState("");
  const [sortBy, setSortBy] = useState("recently_viewed");
  const [page, setPage] = useState(null);

  if (!sessionUser) {
    nav("/login");
  }

  useEffect(() => {
    // Fetch videos based on sortBy, keyword, and tags
    // Replace with actual fetch call
    const fetchVideos = async () => {
      dispatch(searchMyVideos({ keyword, tags, sortBy, page }));
    };

    fetchVideos();
  }, [dispatch, sortBy, keyword, tags, page]);

  return (
    <div id="my-videos-page">
      <div id="controls">
        <label>
          Sort by
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="recently_viewed">Recently Viewed</option>
            <option value="alphabetical">Alphabetical</option>
            <option value="newest">Newest</option>
          </select>
        </label>
        <label>
          Keyword or Phrases
          <input
            type="text"
            placeholder="Keyword or Phrases"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </label>

        <label>
          Tags
          <input
            type="text"
            placeholder="Tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </label>
      </div>
      <div className="video-results">
        {videos.map((video) => (
          <VideoTile video={video} />
        ))}
      </div>
    </div>
  );
}

export default MyVideosPage;
