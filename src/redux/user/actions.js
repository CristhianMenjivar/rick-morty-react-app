import * as Types from "./types";
import initSessionWithGoogle, { logoutGoogleAccount } from "../../firebase";
import UserStorage from "../../helpers/userStorage";
import { getAllFavorites, getCharacters } from "../chars/actions";

// export const action =  () => (dispatch, getState) => {}

export const endSession = () => {
  UserStorage.destroySession();
  logoutGoogleAccount();
  return {
    type: Types.END_SESSION,
  };
};

export const startGoogleLogin = () => async (dispatch) => {
  dispatch({
    type: Types.LOGIN_GOOGLE_FETCH,
  });

  try {
    const session = await initSessionWithGoogle();
    UserStorage.saveSession(session);

    dispatch(getAllFavorites(session.uid));
    dispatch(getCharacters());

    return dispatch({
      type: Types.LOGIN_GOOGLE_SUCCESS,
      payload: session,
    });
  } catch (error) {
    return dispatch({
      type: Types.LOGIN_GOOGLE_ERROR,
      payload: error.message,
    });
  }
};

export const restoreSession = () => (dispatch) => {
  const session = UserStorage.getSession();

  if (session?.stsTokenManager && session?.uid) {
    dispatch(getAllFavorites(session.uid));
    dispatch(getCharacters());
    // validar token
    // console.log(session.stsTokenManager.expirationTime);

    return {
      type: Types.RESTORE_SESSION,
      payload: {
        currentUser: session,
        isValidSession: true, // se podría validar token
      },
    };
  } else
    return {
      type: Types.RESTORE_SESSION,
      payload: {
        currentUser: null,
        isValidSession: false,
      },
    };
};
