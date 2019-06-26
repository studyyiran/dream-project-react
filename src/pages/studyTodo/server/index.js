import ajax from "../../../util/ajax";
const host = "http://localhost:3000";
const localUrl = host + "/studyTodo";
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
  }
};

export default server;
