import { useCallback } from "react";
import { shallowEqual } from "react-redux";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  addToFavoriteCharacter,
  deleteFromFavoriteCharacter,
  deleteCharacter,
  getAllFavorites,
} from "../redux/chars/actions";

const useCharacters = () => {
  const state = useSelector((state) => state.characters, shallowEqual);
  const { chars = [] } = state;

  const current = chars?.length ? chars[0] : null;

  const dispatch = useDispatch();

  const nextChar = useCallback(async () => {
    chars.shift();
    dispatch(deleteCharacter([...chars]));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, chars]);

  const getFavoritesCharacters = useCallback(() => {
    dispatch(getAllFavorites());
  }, [dispatch]);

  const addToFavorite = useCallback(
    (char) => {
      dispatch(addToFavoriteCharacter(char));
      nextChar();
    },
    [dispatch, nextChar]
  );

  const deleteFromFavorite = useCallback(
    (char) => {
      dispatch(deleteFromFavoriteCharacter(char));
    },
    [dispatch]
  );

  return {
    ...state,
    current,
    nextChar,
    addToFavorite,
    deleteFromFavorite,
    getFavoritesCharacters,
  };
};

export default useCharacters;
