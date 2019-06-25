import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ReduxWrapper from "./reduxWrapper";

ReactDOM.render(
  <ReduxWrapper>
    <App />
  </ReduxWrapper>,
  document.getElementById("root")
);
