import server from "./server";

const actions = {
  getEventStreamList: () => {
    return {
      type: "getEventStreamList"
    };
  },
  testGetList: dispatch => {
    dispatch({
      type: "startAjax"
    });
    const p1 = server.getEventStreamList();
    p1.then(() => {
      dispatch({
        type: "endAjax"
      });
    });
    return p1;

    // const result = await server.getEventStreamList()
    //
    // dispatch({
    //   type: "getList"
    // });
    // return result
  }
};
export default actions;
