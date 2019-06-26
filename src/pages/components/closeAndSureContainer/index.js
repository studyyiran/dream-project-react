import React from "react";
import "./index.scss";

export default function(props) {
  const {
    children,
    buttonContent,
    closeCallBack,
    sureCallBack,
    isShowSure = false,
    isShowClose = false
  } = props;
  return (
    <div className="extra-sure-tag-container">
      <div className="close-container">
        {children}
        {isShowClose ? (
          <div onClick={closeCallBack} className="close-button circle">
            X
          </div>
        ) : null}
      </div>
      {isShowSure ? (
        <button onClick={sureCallBack}>{buttonContent}</button>
      ) : null}
    </div>
  );
}
