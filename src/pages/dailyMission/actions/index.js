import server from "../server";

const actions = {
  setList: value => ({
    type: "setList",
    value
  }),
  getList: () => {
    return function(dispatch) {
      dispatch({ type: "start ajax" });
      server.getStudyTodoList().then(res => {
        dispatch({ type: "end ajax" });
        dispatch(actions.setList(res));
      });
    };
  },
  newStudyTodoItem: data => {
    return function(dispatch) {
      dispatch({ type: "start ajax" });
      return server.newStudyTodoItem({ content: data }).then(res => {
        dispatch({ type: "end ajax" });
        dispatch(actions.setList(res));
      });
    };
  },
  hideStudyItem: data => {
    return function(dispatch) {
      dispatch({ type: "start ajax" });
      return server.hideStudyItem({ id: data }).then(res => {
        dispatch({ type: "end ajax" });
        dispatch(actions.setList(res));
      });
    };
  },
  changeStudyItemStatus: (id, status) => {
    return function(dispatch) {
      dispatch({ type: "start ajax" });
      return server.changeStudyItemStatus({ id, status }).then(res => {
        dispatch({ type: "end ajax" });
        dispatch(actions.setList(res));
      });
    };
  }
};

export default actions;
