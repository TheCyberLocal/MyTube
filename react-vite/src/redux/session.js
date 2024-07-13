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

export const thunkAuthenticate = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch("/api/auth/");
    if (response.ok) {
      const data = await response.json();
      if (data.errors) {
        dispatch(setError(data.errors));
        dispatch(setLoading(false));
        return;
      }
      dispatch(setUser(data));
    } else {
      dispatch(setError("Failed to authenticate"));
    }
  } catch (err) {
    dispatch(setError("Failed to authenticate"));
  }
  dispatch(setLoading(false));
};

export const thunkLogin = (credentials) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

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

export const thunkSignup = (user) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

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

export const thunkUpdateUser = (userId, user) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch(`/api/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

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

export const thunkLogout = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await fetch("/api/auth/logout", { method: "POST" });
    dispatch(removeUser());
    dispatch(clearMyVideos());
    dispatch(clearVideoDetails());
  } catch (err) {
    dispatch(setError("Failed to logout"));
  }
  dispatch(setLoading(false));
};

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload, error: null };
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
