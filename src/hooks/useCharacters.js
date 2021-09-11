import { useCallback } from "react";
import { shallowEqual } from "react-redux";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  // getCharacters,
  setCurrentChar,
  addToFavoriteCharacter,
  deleteFromFavoriteCharacter,
  getAllFavorites,
} from "../redux/chars/actions";

const useCharacters = () => {
  const state = useSelector((state) => state.characters, shallowEqual);

  const dispatch = useDispatch();

  //  const getAllCharacters = useCallback(() => {
  //    dispatch(getCharacters());
  //  }, [dispatch]);

  const getFavoritesCharacters = useCallback(() => {
    dispatch(getAllFavorites());
  }, [dispatch]);

  const addToFavorite = useCallback(
    (char) => {
      dispatch(addToFavoriteCharacter(char));
    },
    [dispatch]
  );

  const deleteFromFavorite = useCallback(
    (char) => {
      dispatch(deleteFromFavoriteCharacter(char));
    },
    [dispatch]
  );

  const nextChar = async () => {
    const { chars = [] } = state;
    const currentIndex = chars.findIndex((c) => c.id === state.current?.id);
    if (!chars.length > 0)
      return {
        status: false,
      };

    const nextChar = chars[currentIndex + 1];
    if (!nextChar) {
      await dispatch(setCurrentChar(null));
      return {
        status: false,
      };
    }

    await dispatch(setCurrentChar(nextChar));

    return {
      status: true,
    };
  };

  return {
    ...state,
    nextChar,
    addToFavorite,
    deleteFromFavorite,
    getFavoritesCharacters,
  };
};

export default useCharacters;
