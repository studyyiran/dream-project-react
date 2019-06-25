export default function(state, action) {
  const { type, value } = action;
  switch (type) {
    case "setReviewList":
      return { ...state, reviewList: value };
    default:
      return { ...state };
  }
}
