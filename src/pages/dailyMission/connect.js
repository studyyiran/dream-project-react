import { connect } from "react-redux";
import actions from "./actions";

export default function Connect(Page) {
  const mapState = state => {
    return {
      ...state.dailyMissionReducers
    };
  };
  return connect(
    mapState,
    actions
  )(Page);
}
