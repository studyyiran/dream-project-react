import React, { useState } from "react";
import ReactVersion from "./react";
import ReduxVersion from "./redux";

function HouceBook() {
  const [type, setType] = useState("reduxVersion");
  switch (type) {
    case "reactVersion":
      return <ReactVersion />;
    case "reduxVersion":
      return <ReduxVersion />;
  }
  return null;
}

export default HouceBook;
