import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider, connect } from "react-redux";
import ReduxThunk from "redux-thunk";
import addAction from "./actions";
import List from "./components";

function reducer(preState, action = {}) {
  const { type, value } = action;
  console.log(action);
  switch (type) {
    case "add":
      const { todoList } = preState;
      const arr = todoList.concat([value]);
      console.log(arr);
      return { ...preState, todoList: arr };
    default:
      return preState;
  }
}

export default function() {
  const originList = [1, 2, 3];
  const store = createStore(
    reducer,
    { todoList: originList },
    applyMiddleware(ReduxThunk)
  );

  const target2 = document.querySelector("#app2");

  function mapStateToProps(state, ownProps) {
    return {
      list: state.todoList,
      test: ownProps.test
    };
  }

  function mapDispatchToProps(dispatch, ownProps) {
    return {
      addFunc: value => {
        addAction(dispatch, value, ownProps);
      }
    };
  }

  const WrapperList = connect(
    mapStateToProps,
    mapDispatchToProps
  )(List);

  renderFunc();
  // store.subscribe(renderFunc);

  function renderFunc() {
    ReactDOM.render(
      <Provider store={store}>
        <WrapperList test={"test"} />
      </Provider>,
      target2
    );
  }

  return <div>123</div>;
}
