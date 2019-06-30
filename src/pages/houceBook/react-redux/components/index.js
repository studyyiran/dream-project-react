import { useState } from "react";
import server from "../../server";
import React from "react";

export default function List(props) {
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
