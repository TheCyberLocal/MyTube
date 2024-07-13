const SET_SEARCH_RESULTS = "myVideos/setSearchResults";
const SET_LOADING = "myVideos/setLoading";
const SET_ERROR = "myVideos/setError";
const CLEAR_STATE = "myVideos/clearState";

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

export const clearMyVideos = () => ({
  type: CLEAR_STATE,
});

const initialState = {
  searchResults: [],
  isLoading: false,
  error: null,
};

const processFetch = (fetchFunc) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetchFunc();
    if (response.ok) {
      const data = await response.json();
      dispatch(setSearchResults(data));
      dispatch(setError(null));
    } else if (response.status < 500) {
      const errorMessages = await response.json();
      dispatch(setError(errorMessages));
      dispatch(setLoading(false));
      return errorMessages;
    } else {
      dispatch(setError("Something went wrong. Please try again"));
    }
  } catch (err) {
    dispatch(setError("Something went wrong. Please try again"));
  }
  dispatch(setLoading(false));
};

export const searchMyVideos = (options) =>
  processFetch(() => {
    const { keyword, tags, sortBy, page } = options;
    let search_url = `/api/my-videos`;
    let search_params = [];
    if (keyword) {
      search_params.push(`keyword=${keyword}`);
    }
    if (tags) {
      search_params.push(`tags=${tags}`);
    }
    if (sortBy) {
      search_params.push(`sortBy=${sortBy}`);
    }
    if (page) {
      search_params.push(`page=${page}`);
    }
    if (search_params.length) {
      search_url += `?${search_params.join("&")}`;
    }
    return fetch(search_url);
  });

function myVideosReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SEARCH_RESULTS:
      return { ...state, searchResults: action.payload };
    case SET_LOADING:
      return { ...state, isLoading: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    case CLEAR_STATE:
      return { ...state, searchResults: [], error: null };
    default:
      return state;
  }
}

export default myVideosReducer;
