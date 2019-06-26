import React, { useState } from "react";
import ReactDOM from "react-dom";
import server from "../server";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

function List(props) {
  const { list, addFunc } = props;
  const [value, setValue] = useState("");
  function buttonHandler(inputValue) {
    setValue("");
    addFunc(inputValue);
  }
  return (
    <div>
      {(list || []).map((item, index) => {
        return <li key={index}>{item}</li>;
      })}
      <form onSubmit={e => e.preventDefault()}>
        <input
          value={value}
          onChange={e => {
            setValue(e.target.value);
          }}
        />
        <button
          onClick={() => {
            buttonHandler(value);
          }}
        >
          input one now
        </button>
        <button
          data-type="async"
          onClick={() => {
            server.getReviewList().then(res => {
              buttonHandler(JSON.stringify(res));
            });
          }}
        >
          input server now
        </button>
      </form>
    </div>
  );
}

function reducer(preState, action = {}) {
  const { type, value } = action;
  console.log(action);
  switch (type) {
    case "add":
      const { todoList } = preState;
      const arr = todoList.concat([value]);
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

  function handler(value) {
    addAction(value);
  }

  function addAction(value) {
    console.log(value);
    return store.dispatch({ type: "add", value });
  }
  const target2 = document.querySelector("#app2");

  renderFunc();
  store.subscribe(renderFunc);

  function renderFunc() {
    const { todoList } = store.getState();
    ReactDOM.render(<List list={todoList} addFunc={handler} />, target2);
  }

  return <div>123</div>;
}
