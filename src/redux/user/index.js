// reducer
import * as Types from "./types";

const initialState = {
  loggedIn: false,
  isFetching: false,
  errors: null,
  currentUser: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.RESTORE_SESSION:
      return {
        ...initialState,
        currentUser: action?.payload.currentUser,
        loggedIn: Boolean(action?.payload?.isValidSession),
      };
    case Types.END_SESSION:
      return {
        ...initialState,
      };
    case Types.LOGIN_GOOGLE_FETCH:
      return {
        ...state,
        isFetching: true,
        errors: null,
      };
    case Types.LOGIN_GOOGLE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        currentUser: action.payload,
        loggedIn: true,
      };
    case Types.LOGIN_GOOGLE_ERROR:
      return {
        ...state,
        isFetching: false,
        errors: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
