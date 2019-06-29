import React from "react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import createLogger from "redux-logger";
import { createStore, combineReducers, applyMiddleware } from "redux";
import studyReviewReducers from "./reducers/studyReview";
import studyTodoReducers from "./reducers/studyTodo";
import dailyMissionReducers from "./reducers/dailyMission";

const rootReducer = combineReducers({
  studyReviewReducers,
  studyTodoReducers,
  dailyMissionReducers
});

const middleware = [thunk];
if (process.env.NODE_ENV !== "production") {
  // middleware.push(createLogger);
}
const initState = {};
const store = createStore(
  rootReducer,
  initState,
  applyMiddleware(...middleware)
);

export default function(props = {}) {
  const { children } = props;
  return <Provider store={store}>{children}</Provider>;
}
