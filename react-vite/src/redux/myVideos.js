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

export const searchMyVideos = (options) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
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
    const response = await fetch(search_url);
    const data = await response.json();
    dispatch(setSearchResults(data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.toString()));
    dispatch(setLoading(false));
  }
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
