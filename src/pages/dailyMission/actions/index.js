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
      return server.newItem({ content: data }).then(res => {
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
  changeMissionStatusByMissionId: (missionId, status) => {
    console.log(missionId)
    return function(dispatch) {
      dispatch({ type: "start ajax" });
      return server
        .changeMissionStatusByMissionId({ missionId, status })
        .then(res => {
          dispatch({ type: "end ajax" });
          dispatch(actions.setTodayMissionList(res));
        });
    };
  },
  deleteTodayMissionStatus: missionId => {
    return function(dispatch) {
      dispatch({ type: "start ajax" });
      return server.deleteTodayMissionStatus({ missionId }).then(res => {
        dispatch({ type: "end ajax" });
        dispatch(actions.setTodayMissionList(res));
      });
    };
  }
};

export default actions;
