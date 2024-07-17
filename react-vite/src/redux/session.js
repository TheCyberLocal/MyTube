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
      dispatch(setError(null));
    } else if (response.status < 500) {
      const errorMessages = await response.json();
      dispatch(setError(errorMessages));
      dispatch(setLoading(false));
      return errorMessages;
    } else {
      dispatch(setError("Something went wrong. Please try again"));
    }
  } catch (error) {
    dispatch(setError(error.toString()));
    dispatch(setLoading(false));
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
    return await fetch("/api/auth/signup", {
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

export const thunkUpdatePassword = (userId, body) =>
  processFetch(async () => {
    return await fetch(`/api/users/${userId}/password`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  });

export const thunkDeleteUser = (userId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch(`/api/users/${userId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      dispatch(removeUser());
      dispatch(clearMyVideos());
      dispatch(clearVideoDetails());
      dispatch(setError(null));
    } else {
      const errorMessages = await response.json();
      dispatch(setError(errorMessages));
    }
  } catch (err) {
    dispatch(setError("Failed to delete account"));
  }
  dispatch(setLoading(false));
};

export const thunkLogout = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch("/api/auth/logout", { method: "POST" });
    if (response.ok) {
      dispatch(removeUser());
      dispatch(clearMyVideos());
      dispatch(clearVideoDetails());
      dispatch(setError(null));
    } else {
      const errorMessages = await response.json();
      dispatch(setError(errorMessages));
    }
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
