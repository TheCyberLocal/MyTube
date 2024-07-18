import { useState, useEffect, useRef } from "react";
import { searchMyVideos } from "../../redux/myVideos";
import { clearVideoDetails } from "../../redux/videoDetails";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import VideoTile from "../VideoTile";
import { MultiSelect } from "react-multi-select-component";
import { setCookie, getCookie, getTags } from "../../utils";
import "./MyVideosPage.css";

function MyVideosPage() {
  const { isLoading: myVideosLoading } = useSelector((state) => state.myVideos);
  const { user, isLoading: sessionLoading } = useSelector(
    (state) => state.session
  );

  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const [options, setOptions] = useState([]);
  const [sortBy, setSortBy] = useState("recently_viewed");
  const [tags, setTags] = useState([]);
  const [page, setPage] = useState(1);
  const [allSearchResults, setAllSearchResults] = useState([]);
  const bottomRef = useRef(null);
  const [isBottomVisible, setIsBottomVisible] = useState(false);
  const [lastLogTime, setLastLogTime] = useState(0);
  const [endOfPage, setEndOfPage] = useState(false);

  useEffect(() => {
    const savedSortBy = getCookie("sortBy");
    if (savedSortBy) setSortBy(savedSortBy);
    getTags().then((res) => setOptions(res));
  }, []);

  useEffect(() => {
    dispatch(clearVideoDetails());
  }, [dispatch]);

  useEffect(() => {
    dispatch(searchMyVideos({ keyword, tags, sortBy, page })).then(
      (results) => {
        if (
          results.length < 10 &&
          !sessionLoading &&
          !myVideosLoading &&
          user.videoCount
        ) {
          setEndOfPage(true);
        }
        setAllSearchResults([...allSearchResults, ...results]);
      }
    );
  }, [dispatch, user, sortBy, keyword, tags, page]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsBottomVisible(true);
      } else {
        setIsBottomVisible(false);
      }
    });

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => {
      if (bottomRef.current) {
        observer.unobserve(bottomRef.current);
      }
    };
  }, [bottomRef]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isBottomVisible) {
        const currentTime = Date.now();
        if (currentTime - lastLogTime >= 2000) {
          setPage((page) => page + 1);
          setLastLogTime(currentTime);
        }
      }
    }, 250);

    if (endOfPage) clearInterval(interval);

    return () => clearInterval(interval);
  }, [isBottomVisible, lastLogTime, endOfPage]);

  const handleSortChange = (e) => {
    const selectedSort = e.target.value;
    setSortBy(selectedSort);
    setCookie("sortBy", selectedSort, 365);
  };

  if (!sessionLoading && !user) return <Navigate to="/login" replace={true} />;

  return (
    <>
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
              overrideStrings={{
                selectSomeItems: "Select...",
                search: "Search",
              }}
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
        !allSearchResults.length ? (
          <div className="no-video-results">
            <h1>No videos match your search...</h1>
          </div>
        ) : null}
        <div className="video-results">
          {!sessionLoading && !myVideosLoading && user.videoCount
            ? allSearchResults.map((video) => (
                <VideoTile key={video.id} video={video} />
              ))
            : null}
        </div>
        {endOfPage && (
          <div
            id="end-of-page"
            onClick={() => window.open("https://youtube.com")}
          >
            You've run out of videos. Let's add some more...
          </div>
        )}
      </div>
      <div ref={bottomRef}></div>
    </>
  );
}

export default MyVideosPage;
