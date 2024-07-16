import { thunkAuthenticate } from "./session";

const SET_VIDEO_DETAILS = "videoDetails/setVideoDetails";
const SET_LOADING = "videoDetails/setLoading";
const SET_ERROR = "videoDetails/setError";
const CLEAR_STATE = "videoDetails/clearState";
const SET_NOTE = "videoDetails/setNote";
const DELETE_NOTE = "videoDetails/deleteNote";
const SET_VIDEO = "videoDetails/setVideo";
const DELETE_VIDEO = "videoDetails/deleteVideo";

export const setVideoDetails = (detail) => ({
  type: SET_VIDEO_DETAILS,
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

export const clearVideoDetails = () => ({
  type: CLEAR_STATE,
});

export const setNote = (note) => ({
  type: SET_NOTE,
  payload: note,
});

export const deleteNote = (noteId) => ({
  type: DELETE_NOTE,
  payload: noteId,
});

export const deleteVideo = (videoId) => ({
  type: DELETE_VIDEO,
  payload: videoId,
});

export const fetchVideoDetails = (videoId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch(`/api/videos/${videoId}`);
    const data = await response.json();
    dispatch(setVideoDetails(data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.toString()));
    dispatch(setLoading(false));
  }
};

export const updateNoteThunk = (noteId, note) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch(`/api/notes/${noteId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    });
    const data = await response.json();
    dispatch(setNote(data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.toString()));
    dispatch(setLoading(false));
  }
};

export const deleteNoteThunk = (noteId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await fetch(`/api/notes/${noteId}`, {
      method: "DELETE",
    });
    dispatch(deleteNote(noteId));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.toString()));
    dispatch(setLoading(false));
  }
};

export const deleteVideoThunk = (videoId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await fetch(`/api/videos/${videoId}`, {
      method: "DELETE",
    });
    dispatch(thunkAuthenticate());
    dispatch(fetchVideoDetails());
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

function videoDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_VIDEO_DETAILS: {
      const { notes, highlights, ...video } = action.payload;
      return { ...state, video, notes, highlights };
    }
    case SET_LOADING:
      return { ...state, isLoading: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    case CLEAR_STATE: {
      return {
        ...state,
        video: null,
        notes: [],
        highlights: [],
        isLoading: false,
        error: null,
      };
    }
    case SET_NOTE: {
      const { notes, ...restState } = state;
      const newNotes = notes.map((note) =>
        note.id === action.payload.id ? action.payload : note
      );
      return { ...restState, notes: newNotes };
    }
    case DELETE_NOTE: {
      const { notes, ...restState } = state;
      const newNotes = notes.filter((note) => note.id !== action.payload);
      return { ...restState, notes: newNotes };
    }
    default:
      return state;
  }
}

export default videoDetailsReducer;
