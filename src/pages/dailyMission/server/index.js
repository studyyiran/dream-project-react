import ajax from "../../../util/ajax";
const host = "http://localhost:3000";
const localUrl = host + "/dailyMission/userDailyMission";
// 其实 server和actions 目前是11对应 也许并不一定耦合对应
const server = {
  newItem: data => {
    const url = localUrl + "/newItem";
    // 不能为空
    if (Object.keys(data).every(item => data[item])) {
      return ajax.post(url, data);
    }
  },
  getList: () => {
    const url = localUrl + "/getList";
    const result = ajax.get(url);
    return result;
  },
  hide: data => {
    const url = localUrl + "/hide";
    const result = ajax.put(url, data);
    return result;
  },
  changeStatus: data => {
    const url = localUrl + "/changeStatus";
    const result = ajax.put(url, data);
    return result;
  }
};

export default server;
