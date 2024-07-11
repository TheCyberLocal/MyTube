import { useState, useEffect } from "react";
import { searchMyVideos } from "../../redux/myVideos";
import { useDispatch } from "react-redux";

const MyVideosPage = () => {
  const videos = [];
  const dispatch = useDispatch();
  const [keywords, setKeywords] = useState("");
  const [tags, setTags] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    // Fetch videos based on sortBy, keywords, and tags
    // Replace with actual fetch call
    const fetchVideos = async () => {
      console.log("searched");
      dispatch(searchMyVideos({ keywords, tags, sortBy }));
    };

    fetchVideos();
  }, [dispatch, sortBy, keywords, tags]);

  return (
    <div className="video-component">
      <div className="controls">
        <label>
          Sort by
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="newest">Newest</option>
            <option value="recently_viewed">Recently Viewed</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </label>
        <label>
          Keywords or Phrases
          <input
            type="text"
            placeholder="Keywords or Phrases"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
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
          <div key={video.id} className="video-item">
            <img src={video.imageUrl} alt={video.title} />
            <div>{video.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyVideosPage;
