import { useState, useEffect } from "react";
import { searchMyVideos } from "../../redux/myVideos";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import VideoTile from "../VideoTile";
import "./MyVideosPage.css";

function MyVideosPage() {
  const {
    user: sessionUser,
    isLoading: sessionLoading,
    error: sessionError,
  } = useSelector((state) => state.session);
  const {
    searchResults: myVideos = [],
    isLoading: myVideosLoading,
    error: myVideosError,
  } = useSelector((state) => state.myVideos);
  const {
    video,
    notes,
    highlights,
    isLoading: videoDetailsLoading,
    error: videoDetailsError,
  } = useSelector((state) => state.videoDetails);

  const dispatch = useDispatch();
  const nav = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [tags, setTags] = useState("");
  const [sortBy, setSortBy] = useState("recently_viewed");
  const [page, setPage] = useState(null);

  if (!sessionLoading && !sessionUser)
    return <Navigate to="/login" replace={true} />;

  useEffect(() => {
    if (sessionUser) {
      dispatch(searchMyVideos({ keyword, tags, sortBy, page }));
    }
  }, [dispatch, sessionUser, sortBy, keyword, tags, page]);

  return (
    <div id="my-videos-page">
      <div id="controls">
        <label>
          Sort by
          <br />
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
      {!sessionLoading && !sessionUser.videoCount && (
        <div className="no-video-results">
          <h1>You have no videos. How about adding some...</h1>
        </div>
      )}
      {!sessionLoading &&
      !myVideosLoading &&
      sessionUser.videoCount &&
      !myVideos.length ? (
        <div className="no-video-results">
          <h1>No videos match your search...</h1>
        </div>
      ) : null}
      <div className="video-results">
        {!sessionLoading && !myVideosLoading && sessionUser.videoCount
          ? myVideos.map((video) => <VideoTile key={video.id} video={video} />)
          : null}
      </div>
    </div>
  );
}

export default MyVideosPage;
