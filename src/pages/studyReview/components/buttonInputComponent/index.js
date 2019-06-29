import React, { useEffect, useRef, useState } from "react";
import "./index.scss";
import CloseAndSureContainer from "../../../components/closeAndSureContainer";
/*
功能：

children可以定义左侧的内容。让它不仅仅是input
 */
/*
useEffect(() => {
    if (mainButtonStatus) {
      if (inputRef && inputRef.current) {
        // why this can work.What is .focus meanning? is func to control dom?
        inputRef.current.focus();
      }
    }
  }, [mainButtonStatus]);

  function postHandler() {
    if (inputValue) {
      postInputValue(inputValue)
        .then(() => {
          setInutValue("");
          setMainButtonStatus(false);
        })
        .catch(err => {
          console.error("弹框！");
          console.error(err);
        });
    } else {
      console.error("弹框！");
      console.error("empty");
    }
  }
 */

export default function ButtonInputComponent(props) {
  const { buttonContent, children, sureCallBack, submitId } = props;
  const [mainButtonStatus, setMainButtonStatus] = useState(false);
  const [inputValue, setInutValue] = useState("");
  const inputRef = useRef();
  let dom;

  // function可以没有this。
  function inputHandler(e) {
    const value = e.target.value;
    setInutValue(value);
  }

  function sureCallBackHandler() {
    if (!submitId && sureCallBack) {
      sureCallBack();
    }
  }

  function buttonHandler() {
    setMainButtonStatus(currentBool => {
      return !currentBool;
    });
  }

  if (mainButtonStatus) {
    if (children) {
      dom = children;
    } else {
      dom = <input ref={inputRef} value={inputValue} onChange={inputHandler} />;
    }
  } else {
    dom = (
      <button className={"new-button"} onClick={buttonHandler}>
        {buttonContent}
      </button>
    );
  }
  return (
    <div className="review-new-button-container">
      <CloseAndSureContainer
        submitId={submitId}
        buttonContent={"submit"}
        isShowClose={mainButtonStatus}
        isShowSure={mainButtonStatus}
        sureCallBack={sureCallBackHandler}
        closeCallBack={buttonHandler}
      >
        {dom}
      </CloseAndSureContainer>
    </div>
  );
}
