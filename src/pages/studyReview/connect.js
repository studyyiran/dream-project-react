import studyReviewActions from "./actions";
import connect from "react-redux/es/connect/connect";

export default function Connect(Page) {
  const mapState = state => {
    const { reviewList } = state;
    return {
      reviewList
    };
  };
  const mapDispatch = studyReviewActions;
  return connect(
    mapState,
    mapDispatch
  )(Page);
}
