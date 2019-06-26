import connect from "react-redux";
import studyReviewActions from "./actions";

export default function Connect(Page) {
  const mapState = state => {
    console.log(state);
    const { studyReviewReducers, studyToDo } = state;
    return {
      ...studyReviewReducers
    };
  };
  const mapDispatch = {
    ...studyReviewActions
  };
  return connect(
    mapState,
    mapDispatch
  )(Page);
}
