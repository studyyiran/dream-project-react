import ajax from "../../../util/ajax";

const host = "http://localhost:3000";
const localUrl = host + "/reviewPart";
const reviewServer = {
  updateReviewInfo: function updateReviewCount(data) {
    const url = localUrl + "/updateReviewInfo";
    const result = ajax.put(url, data);
    return result.then(res => {
      window.appRedux.dispatch({ type: "setReviewList", value: res });
      return res;
    });
  },
  postNewReview: function postNewReview(data) {
    const url = localUrl + "/postReview";
    if ((Object.keys(data) || []).every(item => data[item])) {
      return ajax.post(url, data)
    }
  },
  fromReviewToStudyTodo: data => {
    const url = localUrl + "/fromReviewToStudyTodo";
    if (Object.keys(data).every(item => data[item])) {
      return ajax.post(url, data);
    }
  },
  getReviewList: function getReviewList() {
    const url = localUrl + "/getReviewList";
    const result = ajax.get(url);
    return result;
  },
  // 状态相关的更新
  updateReviewStatus: function updateReviewCount(id, status) {
    const url = localUrl + "/updateReviewStatus";
    const result = ajax.put(url, { id, status });
    return result.then(res => {
      window.appRedux.dispatch({ type: "setReviewList", value: res });
      return res;
    });
  },
  hideReviewItem: function hideReviewItem(id) {
    const url = localUrl + "/hideReviewItem";
    const result = ajax.put(url, { id });
    return result.then(res => {
      window.appRedux.dispatch({ type: "setReviewList", value: res });
      return res;
    });
  }
};

export default reviewServer;
