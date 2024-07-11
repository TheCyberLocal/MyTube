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
