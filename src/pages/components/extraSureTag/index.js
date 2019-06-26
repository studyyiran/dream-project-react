import React from "react";

export default function(props) {
  const { children, buttonContent, buttonCallBack, isShow = false } = props;
  return (
    <div>
      {children}
      {isShow ? (
        <button onClick={buttonCallBack}>{buttonContent}</button>
      ) : null}
    </div>
  );
}
