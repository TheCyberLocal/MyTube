const SET_SEARCH_RESULTS = "myVideos/setSearchResults";
const SET_LOADING = "myVideos/setLoading";
const SET_ERROR = "myVideos/setError";

export const setSearchResults = (results) => ({
  type: SET_SEARCH_RESULTS,
  payload: results,
});

export const setLoading = (isLoading) => ({
  type: SET_LOADING,
  payload: isLoading,
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

const initialState = {
  searchResults: [],
  isLoading: false,
  error: null,
};


function myVideosReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SEARCH_RESULTS:
      return { ...state, searchResults: action.payload };
    case SET_LOADING:
      return { ...state, isLoading: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

export default myVideosReducer;
