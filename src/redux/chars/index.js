// reducer
import * as Types from "./types";
import * as TypesUser from "../user/types";

export const initialState = {
  isFetching: true,
  chars: [],
  errors: null,
  // favorites data
  favoriteChars: [],
  isFetchingFavorites: true,
  errorsFavorite: null,
  // pagination chars
  infoChars: {
    count: 0,
    pages: 0,
    next: 1,
    prev: null, // or number,
  },
};

const charsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TypesUser.END_SESSION:
      return {
        ...initialState,
      };
    case Types.GET_FAVORITES_FETCH:
      return {
        ...state,
        isFetchingFavorites: true,
        errorsFavorite: null,
      };
    case Types.GET_FAVORITES_SUCCESS:
      return {
        ...state,
        isFetchingFavorites: false,
        favoriteChars: action.payload,
      };
    case Types.GET_FAVORITES_ERROR:
      return {
        ...state,
        isFetchingFavorites: false,
        errorsFavorite: action.payload,
      };
    case Types.DELETE_CHARACTER:
      return {
        ...state,
        chars: action.payload,
      };
    case Types.DELETE_FROM_FAVORITE:
      return {
        ...state,
        favoriteChars: action.payload,
      };
    case Types.ADD_TO_FAVORITE:
      return {
        ...state,
        favoriteChars: action.payload,
      };
    case Types.GET_CHARACTER_FETCH:
      return {
        ...state,
        isFetching: true,
        errors: null,
      };
    case Types.GET_CHARACTER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        chars: action.payload.chars,
        infoChars: action.payload.info,
      };
    case Types.GET_CHARACTER_ERROR:
      return {
        ...state,
        isFetching: false,
        errors: action.payload,
      };

    default:
      return state;
  }
};

export default charsReducer;
