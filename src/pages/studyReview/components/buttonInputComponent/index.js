import React, { useEffect, useRef, useState } from "react";
import CloseAndSureContainer from "../../../components/closeAndSureContainer";

export default function ButtonInputComponent(props) {
  const { buttonContent, postNewReview } = props;
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
      postNewReview(inputValue, p => {
        p.then(() => {
          setInutValue("");
          setIsInput(false);
        }).catch(err => {
          console.error("弹框！");
          console.error(err);
        });
      });
    } else {
      console.error("empty");
    }
  }
  if (isInput) {
    dom = <input ref={inputRef} value={inputValue} onChange={inputHandler} />;
  } else {
    dom = <button onClick={buttonHandler}>{buttonContent}</button>;
  }
  return (
    <CloseAndSureContainer
      buttonContent={"submit"}
      isShowClose={isInput}
      isShowSure={isInput}
      sureCallBack={postHandler}
      closeCallBack={buttonHandler}
    >
      {dom}
    </CloseAndSureContainer>
  );
}
