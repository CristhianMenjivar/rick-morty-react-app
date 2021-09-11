// reducer
import * as Types from "./types";
import * as TypesUser from "../user/types";

const initialState = {
  isFetching: true,
  chars: [],
  current: {}, // personaje
  errors: null,
  // favorites data
  favoriteChars: [],
  isFetchingFavorites: true,
  errorsFavorite: null,
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
    case Types.DELETE_FROM_FAVORITE:
      return {
        ...state,
        favoriteChars: state.favoriteChars.filter(
          (f) => f.id !== action.payload.id
        ),
      };
    case Types.ADD_TO_FAVORITE:
      return {
        ...state,
        favoriteChars: action.payload.favoriteChars,
        chars: action.payload.chars,
        current: action.payload?.chars[0] || null,
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
        chars: action.payload,
        current: action.payload[0] || {},
      };
    case Types.GET_CHARACTER_ERROR:
      return {
        ...state,
        isFetching: false,
        errors: action.payload,
      };
    case Types.SET_CURRENT_CHAR:
      return {
        ...state,
        current: action.payload,
      };

    default:
      return state;
  }
};

export default charsReducer;
