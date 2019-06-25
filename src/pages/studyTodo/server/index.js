import ajax from "../../../util/ajax";
const host = "http://localhost:3000";
const localUrl = host + "/studyTodo";
const server = {
  newStudyTodo: data => {
    const url = localUrl + "/newStudyTodo";
    // 不能为空
    if (Object.keys(data).every(item => data[item])) {
      return ajax.post(url, data);
    } else {
    }
  },
  getStudyTodoList: () => {
    const url = localUrl + "/getList";
    const result = ajax.get(url);
    return result;
  }
};

export default server;
