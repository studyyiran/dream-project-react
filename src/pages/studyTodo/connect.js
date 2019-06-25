import connect from "react-redux/es/connect/connect";
import actions from "./actions";

export default function Connect(Page) {
  const mapState = state => {
    const { studyTodoListReducers } = state;
    return {
      ...studyTodoListReducers
    };
  };
  return connect(
    mapState,
    actions
  )(Page);
}
