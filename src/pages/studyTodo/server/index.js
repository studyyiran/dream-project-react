import ajax from "../../../util/ajax";
const host = "http://localhost:3000";
const localUrl = host + "/studyTodo";
// 其实 server和actions 目前是11对应 也许并不一定耦合对应
const server = {
  newStudyTodoItem: data => {
    const url = localUrl + "/newStudyTodoItem";
    // 不能为空
    if (Object.keys(data).every(item => data[item])) {
      return ajax.post(url, data);
    }
  },
  getStudyTodoList: () => {
    const url = localUrl + "/getList";
    const result = ajax.get(url);
    return result;
  },
  hideStudyItem: data => {
    const url = localUrl + "/hideStudyItem";
    const result = ajax.put(url, data);
    return result;
  },
  changeStudyItemStatus: data => {
    const url = localUrl + "/changeStudyItemStatus";
    const result = ajax.put(url, data);
    return result;
  }
};

export default server;
