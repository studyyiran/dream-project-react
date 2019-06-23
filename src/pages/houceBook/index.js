import React, { useState } from "react";
import ReactVersion from "./react";

function HouceBook() {
  const [type, setType] = useState("reactVersion");
  switch (type) {
    case "reactVersion":
      return <ReactVersion />;
  }
  return null
}

export default HouceBook;
