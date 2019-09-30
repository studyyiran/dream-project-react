import React from "react";
import "./index.scss";
/*
提供了 关闭按钮 和对应的回调
提供了 打开按钮 和对应的回调
 */
export default function(props) {
  const {
    submitId,
    children,
    buttonContent, // 完成按钮内容
    isShowSure = false, // 展示完成按钮
    sureCallBack,
    isShowClose = false, // 展示关闭按钮
    closeCallBack
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
        <button form={submitId} onClick={sureCallBack}>
          {buttonContent}
        </button>
      ) : null}
    </div>
  );
}
