import { thunkAuthenticate } from "./session";

const SET_VIDEO_DETAILS = "videoDetails/setVideoDetails";
const SET_LOADING = "videoDetails/setLoading";
const SET_ERROR = "videoDetails/setError";
const CLEAR_STATE = "videoDetails/clearState";

const CREATE_NOTE = "videoDetails/createNote";
const UPDATE_NOTE = "videoDetails/updateNote";
const DELETE_NOTE = "videoDetails/deleteNote";

const CREATE_HIGHLIGHT = "videoDetails/createHighlight";
const UPDATE_HIGHLIGHT = "videoDetails/updateHighlight";
const DELETE_HIGHLIGHT = "videoDetails/deleteHighlight";

const CREATE_VIDEO = "videoDetails/createVideo";
const UPDATE_VIDEO = "videoDetails/updateVideo";
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

export const updateNote = (note) => ({
  type: UPDATE_NOTE,
  payload: note,
});

export const deleteNote = (noteId) => ({
  type: DELETE_NOTE,
  payload: noteId,
});

export const createHighlight = (highlight) => ({
  type: CREATE_HIGHLIGHT,
  payload: highlight,
});

export const deleteHighlight = (highlightId) => ({
  type: DELETE_HIGHLIGHT,
  payload: highlightId,
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
    dispatch(updateNote(data));
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

export const createHighlightThunk = (highlight) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch(`/api/highlights`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(highlight),
    });
    const data = await response.json();
    dispatch(createHighlight(data));
  } catch (error) {
    dispatch(setError(error.toString()));
    dispatch(setLoading(false));
  }
};

export const deleteHighlightThunk = (highlightId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await fetch(`/api/highlights/${highlightId}`, {
      method: "DELETE",
    });
    dispatch(deleteHighlight(highlightId));
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
    case UPDATE_NOTE: {
      const { notes, ...restState } = state;
      const newNotes = notes.map((note) =>
        note.id === action.payload.id ? action.payload : note
      );
      return { ...restState, notes: newNotes };
    }
    case DELETE_HIGHLIGHT: {
      const { highlights, ...restState } = state;
      const newHighlights = highlights.filter(
        (highlight) => highlight.id !== action.payload
      );
      return { ...restState, highlights: newHighlights };
    }
    case DELETE_NOTE: {
      const { notes, ...restState } = state;
      const newNotes = notes.filter((note) => note.id !== action.payload);
      return { ...restState, notes: newNotes };
    }
    case CREATE_HIGHLIGHT: {
      const { highlights, ...restState } = state;
      return { ...restState, highlights: [...highlights, action.payload] };
    }
    default:
      return state;
  }
}

export default videoDetailsReducer;
