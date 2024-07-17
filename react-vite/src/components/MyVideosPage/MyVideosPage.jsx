import { useState, useEffect } from "react";
import { searchMyVideos } from "../../redux/myVideos";
import { clearVideoDetails } from "../../redux/videoDetails";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import VideoTile from "../VideoTile";
// import { MultiSelect } from "react-multi-select-component";
import { setCookie, getCookie } from "../../utils";
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
  const [tags, setTags] = useState("");
  const [sortBy, setSortBy] = useState("recently_viewed");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const savedSortBy = getCookie("sortBy");
    if (savedSortBy) {
      setSortBy(savedSortBy);
    }
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

  // const options = [
  //   { label: "Grapes 🍇", value: "grapes" },
  //   { label: "Mango 🥭", value: "mango" },
  //   { label: "Strawberry 🍓", value: "strawberry", disabled: true },
  // ];

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
          {/* <MultiSelect
            options={options}
            value={selected}
            onChange={setSelected}
            labelledBy="Select"
          /> */}
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
