import React, { useState } from "react";
import ReactVersion from "./react";
import ReduxVersion from "./redux";
import ReactReduxVersion from "./react-redux";

function HouceBook() {
  const [type, setType] = useState("reactReduxVersion");
  switch (type) {
    case "reactVersion":
      return <ReactVersion />;
    case "reduxVersion":
      return <ReduxVersion />;
    case "reactReduxVersion":
      return <ReactReduxVersion />;
  }
  return null;
}

export default HouceBook;
