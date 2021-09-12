import * as Types from "./types";
// import axios from "axios";
import { getAllFavoritesFromDB, updateDBFavorites } from "../../firebase";
import ApolloClient, { gql } from "apollo-boost";
import { initialState } from ".";

// export const action =  () => (dispatch, getState) => {}

const cliente = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
});

export const getCharacters = () => async (dispatch, getState) => {
  dispatch({
    type: Types.GET_CHARACTER_FETCH,
  });

  const query = gql`
    query($page: Int) {
      characters(page: $page) {
        info {
          count
          pages
          next
          prev
        }
        results {
          id
          name
          image
        }
      }
    }
  `;

  const { infoChars } = getState().characters;

  try {
    const { data, error } = await cliente.query({
      query,
      variables: {
        page: infoChars.next || 1,
      },
    });

    if (error) {
      return dispatch({
        payload: error || "Error Server!",
        type: Types.GET_CHARACTER_ERROR,
      });
    } else {
      return dispatch({
        payload: {
          chars: data?.characters?.results || [],
          info: data?.characters?.info || initialState.infoChars,
        },
        type: Types.GET_CHARACTER_SUCCESS,
      });
    }
  } catch (error) {
    return dispatch({
      payload: error?.response?.message || "Error Server!",
      type: Types.GET_CHARACTER_ERROR,
    });
  }

  // CON AXIOS....
  // const url = "https://rickandmortyapi.com/api/character";
  // try {
  //   const { data } = await axios.get(url);
  //   return dispatch({
  //     payload: data?.results || [],
  //     type: Types.GET_CHARACTER_SUCCESS,
  //   });
  // } catch (error) {
  //   return dispatch({
  //     payload: error?.response?.message || "Error Server!",
  //     type: Types.GET_CHARACTER_ERROR,
  //   });
  // }
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
  const { favoriteChars = [] } = getState().characters;

  const isIncludeChar = favoriteChars.find((c) => c.id === char.id);

  if (!isIncludeChar) {
    favoriteChars.push(char);
  }

  // add to favorite firebase
  updateDBFavorites(favoriteChars, currentUser.uid);
  dispatch({
    payload: favoriteChars,
    type: Types.ADD_TO_FAVORITE,
  });
};

export const deleteFromFavoriteCharacter = (char) => (dispatch, getState) => {
  const { currentUser } = getState().user;
  const { favoriteChars = [] } = getState().characters;

  const newFavorites = favoriteChars.filter((f) => f.id !== char.id);
  // update favorite firebase
  updateDBFavorites(newFavorites, currentUser.uid);
  dispatch({
    payload: newFavorites,
    type: Types.DELETE_FROM_FAVORITE,
  });
};

export const deleteCharacter = (chars = []) => (dispatch) => {
  if (!chars.length > 0) {
    dispatch(getCharacters());
  }

  return dispatch({
    payload: chars,
    type: Types.DELETE_CHARACTER,
  });
};
