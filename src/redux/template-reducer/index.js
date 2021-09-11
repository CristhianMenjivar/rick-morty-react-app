// reducer
import * as Types from "./types";

const initialState = {
  // state
};

const nameReducer = (state = initialState, action) => {
  switch (action.type) {
    case "":
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default nameReducer;
