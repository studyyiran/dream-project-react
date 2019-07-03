import { connect } from "react-redux";
import Page from "../index";
import actions from "./actions";

const stateMap = state => {
  return {
    ...state.eventStreamReducers
  };
};

const actionsMap = actions;

export default Page => {
  return connect(
    stateMap,
    actionsMap
  )(Page);
};
