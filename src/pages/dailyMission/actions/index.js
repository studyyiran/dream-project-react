import server from "../server";
// 为什么这个actions 什么都有
const actions = {
  setDailyMissionList: value => ({
    type: "setDailyMissionList",
    value
  }),
  setTodayMissionList: value => ({
    type: "setTodayMissionList",
    value
  }),
  setHistoryMissionList: value => ({
    type: "setHistoryMissionList",
    value
  }),
  updateAllList: () => {
    return function(dispatch) {
      dispatch(actions.getList());
      dispatch(actions.getTodayMissionList());
      dispatch(actions.getHistoryMissionList());
    };
  },
  getList: () => {
    return function(dispatch) {
      dispatch({ type: "start ajax" });
      server.getList().then(res => {
        dispatch({ type: "end ajax" });
        dispatch(actions.setDailyMissionList(res));
      });
    };
  },
  newItem: data => {
    return function(dispatch) {
      dispatch({ type: "start ajax" });
      // 这块究竟些什么合适？
      return server.newItem(data).then(res => {
        dispatch({ type: "end ajax" });
        dispatch(actions.setDailyMissionList(res));
      });
    };
  },
  hide: data => {
    return function(dispatch) {
      dispatch({ type: "start ajax" });
      return server.hide({ id: data }).then(res => {
        dispatch({ type: "end ajax" });
        dispatch(actions.setDailyMissionList(res));
      });
    };
  },
  changeStatus: (id, status) => {
    return function(dispatch) {
      dispatch({ type: "start ajax" });
      return server.changeStatus({ id, status }).then(res => {
        dispatch({ type: "end ajax" });
        dispatch(actions.setDailyMissionList(res));
      });
    };
  },
  // part2
  getTodayMissionList: () => {
    return function(dispatch) {
      dispatch({ type: "start ajax" });
      server.getTodayMissionList().then(res => {
        dispatch({ type: "end ajax" });
        dispatch(actions.setTodayMissionList(res));
      });
    };
  },
  getHistoryMissionList: () => {
    return function(dispatch) {
      dispatch({ type: "start ajax" });
      server.getHistoryMissionList().then(res => {
        dispatch({ type: "end ajax" });
        dispatch(actions.setHistoryMissionList(res));
      });
    };
  },
  changeMissionStatusById: (id, status) => {
    return function(dispatch) {
      dispatch({ type: "start ajax" });
      return server.changeMissionStatusById({ id, status }).then(res => {
        dispatch({ type: "end ajax" });
        // 这边为什么永远要写diapatch
        dispatch(actions.updateAllList());
      });
    };
  },
  deleteTodayMissionStatus: id => {
    return function(dispatch) {
      dispatch({ type: "start ajax" });
      return server.deleteTodayMissionStatus({ id }).then(res => {
        dispatch({ type: "end ajax" });
        dispatch(actions.updateAllList());
      });
    };
  }
};

export default actions;
