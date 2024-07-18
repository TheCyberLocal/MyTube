import { useState, useEffect } from "react";
import { searchMyVideos } from "../../redux/myVideos";
import { clearVideoDetails } from "../../redux/videoDetails";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import VideoTile from "../VideoTile";
import { MultiSelect } from "react-multi-select-component";
import { setCookie, getCookie, getTags } from "../../utils";
import "./MyVideosPage.css";

function MyVideosPage() {
  const { user, isLoading: sessionLoading } = useSelector(
    (state) => state.session
  );
  const { searchResults = [], isLoading: myVideosLoading } = useSelector(
    (state) => state.myVideos
  );

  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const [options, setOptions] = useState([]);
  const [sortBy, setSortBy] = useState("recently_viewed");
  const [tags, setTags] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const savedSortBy = getCookie("sortBy");
    if (savedSortBy) setSortBy(savedSortBy);
    getTags().then((res) => setOptions(res));
  }, []);

  useEffect(() => {
    dispatch(clearVideoDetails());
  }, [dispatch]);

  useEffect(() => {
    dispatch(searchMyVideos({ keyword, tags, sortBy, page }));
  }, [dispatch, user, sortBy, keyword, tags, page]);

  const handleSortChange = (e) => {
    const selectedSort = e.target.value;
    setSortBy(selectedSort);
    setCookie("sortBy", selectedSort, 365);
  };

  if (!sessionLoading && !user) return <Navigate to="/login" replace={true} />;

  return (
    <div id="my-videos-page">
      <div id="controls">
        <label>
          Sort by
          <br />
          <select value={sortBy} onChange={handleSortChange}>
            <option value="recently_viewed">Recently Viewed</option>
            <option value="alphabetical">Alphabetical</option>
            <option value="newest">Newest</option>
          </select>
        </label>
        <label>
          Keyword or Phrase
          <br />
          <input
            type="text"
            placeholder="Keyword or Phrase"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </label>
        <label>
          Tags
          <MultiSelect
            className="multi-selector"
            options={options}
            value={tags}
            onChange={setTags}
            labelledBy="Select"
            hasSelectAll={false}
          />
        </label>
      </div>
      {!sessionLoading && !user.videoCount && (
        <div className="no-video-results">
          <h1>You have no videos. How about adding some...</h1>
        </div>
      )}
      {!sessionLoading &&
      !myVideosLoading &&
      user.videoCount &&
      !searchResults.length ? (
        <div className="no-video-results">
          <h1>No videos match your search...</h1>
        </div>
      ) : null}
      <div className="video-results">
        {!sessionLoading && !myVideosLoading && user.videoCount
          ? searchResults.map((video) => (
              <VideoTile key={video.id} video={video} />
            ))
          : null}
      </div>
    </div>
  );
}

export default MyVideosPage;
