import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import userReducer from "./user";
import thunk from "redux-thunk";
import charsReducer from "./chars";
import { restoreSession } from "./user/actions";

const rootReducer = combineReducers({
  user: userReducer,
  characters: charsReducer,
  // more reducers
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const getStore = () => {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );

  store.dispatch(restoreSession()(store.dispatch, store.getState));

  return store;
};

const store = getStore();

// restoreSession()(store.dispatch, store.getState);

export default store;
