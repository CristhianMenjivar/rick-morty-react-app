import { shallowEqual } from "react-redux";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { startGoogleLogin, endSession } from "../redux/user/actions";

const useUser = () => {
  const state = useSelector((state) => state.user, shallowEqual);

  const dispatch = useDispatch();

  const initGoogleLogin = () => {
    dispatch(startGoogleLogin());
  };

  const endSessionUser = () => {
    dispatch(endSession());
  };

  return {
    ...state,
    initGoogleLogin,
    endSessionUser,
  };
};

export default useUser;
