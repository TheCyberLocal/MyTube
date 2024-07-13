import { clearMyVideos } from "./myVideos";
import { clearVideoDetails } from "./videoDetails";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";
const SET_LOADING = "session/setLoading";
const SET_ERROR = "session/setError";

const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

const setLoading = (isLoading) => ({
  type: SET_LOADING,
  payload: isLoading,
});

const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

const processFetch = (fetchFunc) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetchFunc();

    if (response.ok) {
      const data = await response.json();
      dispatch(setUser(data));
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

export const thunkAuthenticate = () =>
  processFetch(async () => {
    return await fetch("/api/auth/");
  });

export const thunkLogin = (credentials) =>
  processFetch(async () => {
    return await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
  });

export const thunkSignup = (user) =>
  processFetch(async () => {
    return await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
  });

export const thunkUpdateUser = (userId, user) =>
  processFetch(async () => {
    return await fetch(`/api/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
  });

export const thunkLogout = () =>
  processFetch(async (dispatch) => {
    await fetch("/api/auth/logout", { method: "POST" });
    dispatch(removeUser());
    dispatch(clearMyVideos());
    dispatch(clearVideoDetails());
  });

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null, error: null };
    case SET_LOADING:
      return { ...state, isLoading: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

export default sessionReducer;
