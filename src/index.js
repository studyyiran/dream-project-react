import React from "react";
import ReactDOM from "react-dom";
import Router from "./router";
import ReduxWrapper from "./reduxWrapper";
import './index.scss'

ReactDOM.render(
  <ReduxWrapper>
    <Router />
  </ReduxWrapper>,
  document.getElementById("root")
);
