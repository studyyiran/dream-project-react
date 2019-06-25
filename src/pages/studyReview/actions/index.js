import studyReviewServer from "../server";

// actions 本质上是obj 工厂。key -> function creator( value ) => {} instanceof Action or function(dispatch) {}
const actions = {
  setReviewList: value => ({
    type: "setReviewList",
    value
  }),
  getReviewList: () => {
    return function(dispatch) {
      dispatch({ type: "start ajax" });
      studyReviewServer.getReviewList().then(res => {
        dispatch({ type: "end ajax" });
        dispatch(actions.setReviewList(res));
      });
    };
  }
};

export default actions;
