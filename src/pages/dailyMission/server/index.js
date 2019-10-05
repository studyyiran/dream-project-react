import ajax from "../../../util/ajax";
import { getProxy } from "../../../util/util";
const userDailyMissionUrl = getProxy() + "/dailyMission/newMission";
const userTodayMissionUrl = getProxy() + "/dailyMission/userTodayMission";
// 其实 server和actions 目前是11对应 也许并不一定耦合对应
const server = {
  newItem: data => {
    const url = userDailyMissionUrl + "/newItem";
    // 不能为空
    if (Object.keys(data).every(item => data[item])) {
      return ajax.post(url, data);
    }
  },
  getList: () => {
    const url = userDailyMissionUrl + "/getList";
    const result = ajax.get(url);
    return result;
  },

  hide: data => {
    const url = userDailyMissionUrl + "/hide";
    const result = ajax.put(url, data);
    return result;
  },
  changeStatus: data => {
    const url = userDailyMissionUrl + "/changeStatus";
    const result = ajax.put(url, data);
    return result;
  },

  getTodayMissionList: () => {
    const url = userTodayMissionUrl + "/getTodayMissionList";
    const result = ajax.get(url);
    return result;
  },
  getHistoryMissionList: () => {
    const url = userTodayMissionUrl + "/getHistoryMissionList";
    const result = ajax.get(url);
    return result;
  },
  changeMissionStatusById: data => {
    const url = userTodayMissionUrl + "/changeStatus";
    const result = ajax.put(url, data);
    return result;
  },
  deleteTodayMissionStatus: data => {
    const url = userTodayMissionUrl + "/hide";
    const result = ajax.delete(url, data);
    return result;
  }
};

export default server;
