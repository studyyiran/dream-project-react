import studyReviewActions from "./actions";
import connect from "react-redux/es/connect/connect";
import studyReviewReducers from "../../reducers/studyReview";

export default function Connect(Page) {
  const mapState = state => {
    console.log(state)
    const { studyReviewReducers } = state;
    return {
      ...studyReviewReducers
    };
  };
  const mapDispatch = studyReviewActions;
  return connect(
    mapState,
    mapDispatch
  )(Page);
}
