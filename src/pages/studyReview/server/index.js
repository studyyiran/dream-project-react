import ajax from "../../../util/ajax";

const host = "/api";
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
  // 新增
  postNewReview: function postNewReview(data) {
    const url = localUrl + "/postReview";
    if ((Object.keys(data) || []).every(item => data[item])) {
      return ajax.post(url, data);
    }
  },
  // 移动到学习
  fromReviewToStudyTodo: data => {
    const url = localUrl + "/fromReviewToStudyTodo";
    if (Object.keys(data).every(item => data[item])) {
      return ajax.post(url, data);
    }
  },
  // 获取列表
  getReviewList: function getReviewList() {
    const url = localUrl + "/getReviewList";
    const result = ajax.get(url);
    return result;
  },
  // 状态相关的更新
  updateReviewStatus: function updateReviewCount(data) {
    const url = localUrl + "/updateReviewStatus";
    const result = ajax.put(url, data);
    return result;
  },
  // 删除
  hideReviewItem: function hideReviewItem(data) {
    const url = localUrl + "/hideReviewItem";
    return ajax.put(url, data);
  }
};

export default reviewServer;
