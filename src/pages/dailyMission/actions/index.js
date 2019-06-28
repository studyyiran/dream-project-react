import server from "../server";

const actions = {
  setList: value => ({
    type: "setList",
    value
  }),
  getList: () => {
    return function(dispatch) {
      dispatch({ type: "start ajax" });
      server.getList().then(res => {
        dispatch({ type: "end ajax" });
        dispatch(actions.setList(res));
      });
    };
  },
  newItem: data => {
    return function(dispatch) {
      dispatch({ type: "start ajax" });
      return server.newItem({ content: data }).then(res => {
        dispatch({ type: "end ajax" });
        dispatch(actions.setList(res));
      });
    };
  },
  hide: data => {
    return function(dispatch) {
      dispatch({ type: "start ajax" });
      return server.hide({ id: data }).then(res => {
        dispatch({ type: "end ajax" });
        dispatch(actions.setList(res));
      });
    };
  },
  changeStatus: (id, status) => {
    return function(dispatch) {
      dispatch({ type: "start ajax" });
      return server.changeStatus({ id, status }).then(res => {
        dispatch({ type: "end ajax" });
        dispatch(actions.setList(res));
      });
    };
  }
};

export default actions;
