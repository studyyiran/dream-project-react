import React, { useEffect, useRef, useState } from "react";
import "./index.scss";
import CloseAndSureContainer from "../../../components/closeAndSureContainer";
/*
children可以定义左侧的内容。让它不仅仅是input
 */
export default function ButtonInputComponent(props) {
  const { buttonContent, postInputValue, children } = props;
  const [isInput, setIsInput] = useState(false);
  const [inputValue, setInutValue] = useState("");
  const inputRef = useRef();
  let dom;

  useEffect(() => {
    if (isInput) {
      if (inputRef && inputRef.current) {
        // why this can work.What is .focus meanning? is func to control dom?
        inputRef.current.focus();
      }
    }
  }, [isInput]);
  // function可以没有this。
  function inputHandler(e) {
    const value = e.target.value;
    setInutValue(value);
  }

  function buttonHandler() {
    setIsInput(currentBool => {
      return !currentBool;
    });
  }

  function postHandler() {
    if (inputValue) {
      postInputValue(inputValue)
        .then(() => {
          setInutValue("");
          setIsInput(false);
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
  if (isInput) {
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
        buttonContent={"submit"}
        isShowClose={isInput}
        isShowSure={isInput}
        sureCallBack={postHandler}
        closeCallBack={buttonHandler}
      >
        {dom}
      </CloseAndSureContainer>
    </div>
  );
}
