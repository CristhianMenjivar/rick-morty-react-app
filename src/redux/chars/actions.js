import * as Types from "./types";
import axios from "axios";
import { getAllFavoritesFromDB, updateDBFavorites } from "../../firebase";

// export const action =  () => (dispatch, getState) => {}

export const getCharacters = () => async (dispatch, _getState) => {
  const url = "https://rickandmortyapi.com/api/character";

  dispatch({
    type: Types.GET_CHARACTER_FETCH,
  });

  try {
    const { data } = await axios.get(url);
    return dispatch({
      payload: data?.results || [],
      type: Types.GET_CHARACTER_SUCCESS,
    });
  } catch (error) {
    return dispatch({
      payload: error?.response?.message || "Error Server!",
      type: Types.GET_CHARACTER_ERROR,
    });
  }
};

export const setCurrentChar = (char) => {
  return {
    payload: char,
    type: Types.SET_CURRENT_CHAR,
  };
};

export const getAllFavorites = (uid) => async (dispatch) => {
  dispatch({
    type: Types.GET_FAVORITES_FETCH,
  });

  const res = await getAllFavoritesFromDB(uid);
  if (res?.favorites) {
    return dispatch({
      type: Types.GET_FAVORITES_SUCCESS,
      payload: res?.favorites,
    });
  } else console.log(res);
  return dispatch({
    type: Types.GET_FAVORITES_ERROR,
    payload: res.error,
  });
};

export const addToFavoriteCharacter = (char) => (dispatch, getState) => {
  const { currentUser } = getState().user;
  const { favoriteChars = [], chars = [] } = getState().characters;

  const isIncludeChar = favoriteChars.find((c) => c.id === char.id);

  if (!isIncludeChar) {
    favoriteChars.push(char);
  }

  const newChars = chars.filter((c) => c.id !== char.id);
  // add to favorite firebase
  updateDBFavorites(favoriteChars, currentUser.uid);
  dispatch({
    payload: { favoriteChars, chars: newChars },
    type: Types.ADD_TO_FAVORITE,
  });
};

export const deleteFromFavoriteCharacter = (char) => {
  return {
    payload: char,
    type: Types.DELETE_FROM_FAVORITE,
  };
};
