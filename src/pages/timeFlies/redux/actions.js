import server from "./server";

const actions = {
  setEventStreamList: value => {
    return {
      type: "setEventStreamList",
      value
    };
  },
  testGetList: () => {
    return {
      type: "getEventStreamList"
    };
  },
  getEventStreamList: () => {
    return dispatch => {
      dispatch({
        type: "startAjax"
      });
      const p1 = server.getEventStreamList();
      p1.then(value => {
        dispatch({
          type: "endAjax"
        });
        console.log("get set");
        // 这个dispatch很容易遗忘
        dispatch(actions.setEventStreamList(value));
      });
      return p1;
    };
  }
  // const result = await server.getEventStreamList()
  //
  // dispatch({
  //   type: "getList"
  // });
  // return result
};
export default actions;
