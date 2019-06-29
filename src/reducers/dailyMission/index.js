export default function(state, action) {
  const { type, value } = action;
  switch (type) {
    // 1 这个可以重复名称吗.和别的模块
    case "setTodayMissionList":
      return { ...state, todayMissionList: value };
    case "setDailyMissionList":
      return { ...state, dailyMissionList: value };
    default:
      return { ...state };
  }
}
