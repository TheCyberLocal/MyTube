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

export const fetchVideoDetail = (videoId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch(`/api/videos/${videoId}`);
    const data = await response.json();
    dispatch(setVideoDetail(data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.toString()));
    dispatch(setLoading(false));
  }
};

const initialState = {
  video: null,
  notes: [],
  highlights: [],
  isLoading: false,
  error: null,
};

function videoDetailReducer(state = initialState, action) {
  switch (action.type) {
    case SET_VIDEO_DETAIL:
      return { ...state, ...action.payload };
    case SET_LOADING:
      return { ...state, isLoading: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

export default videoDetailReducer;
