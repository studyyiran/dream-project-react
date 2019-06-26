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
  },
  fromReviewToStudyTodo: data => {
    return function(dispatch) {
      dispatch({ type: "start ajax" });
      studyReviewServer.fromReviewToStudyTodo({ id: data }).then(res => {
        dispatch({ type: "end ajax" });
        dispatch(actions.setReviewList(res));
      });
    };
  },
  // is not good.why return promise make me know reducer result?
  postNewReview: (data, callback) => {
    return function(dispatch) {
      dispatch({ type: "start ajax" });
      const promise = studyReviewServer
        .postNewReview({ reviewContent: data })
        .then(res => {
          dispatch({ type: "end ajax" });
          dispatch(actions.setReviewList(res));
        });
      callback(promise);
    };
  }
};

export default actions;
