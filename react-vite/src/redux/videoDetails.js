const SET_VIDEO_DETAIL = "videoDetails/setVideoDetails";
const SET_LOADING = "videoDetails/setLoading";
const SET_ERROR = "videoDetails/setError";

export const setVideoDetails = (detail) => ({
  type: SET_VIDEO_DETAIL,
  payload: detail,
});

export const setLoading = (isLoading) => ({
  type: SET_LOADING,
  payload: isLoading,
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});
