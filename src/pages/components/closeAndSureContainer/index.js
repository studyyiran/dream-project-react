import React from "react";
import "./index.scss";

export default function(props) {
  const {
    children,
    buttonContent,
    closeCallBack,
    sureCallBack,
    isShowTag = false,
    isShowClose = false
  } = props;
  return (
    <div className="extra-sure-tag-container">
      <div className="close-container">
        {children}
        {isShowTag ? (
          <div onClick={closeCallBack} className="close-button circle">
            X
          </div>
        ) : null}
      </div>
      {isShowTag ? (
        <button onClick={sureCallBack}>{buttonContent}</button>
      ) : null}
    </div>
  );
}
