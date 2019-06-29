import React, { useRef } from "react";

export default function(props) {
  const { children, onSubmit, submitId } = props;
  const formRef = useRef();
  function formHandler(e) {
    e && e.preventDefault();
    const formSubmitValue = {};
    const form = formRef.current;
    // 读取
    [].slice.call(form).forEach(item => {
      const { tagName, name, value } = item;
      if (tagName === "INPUT" && name) {
        formSubmitValue[name] = value;
      } else if (tagName === "INPUT") {
        console.error("miss name");
      }
    });
    // check
    if (
      Object.keys(formSubmitValue).every(key => {
        return formSubmitValue[key];
      })
    ) {
      onSubmit(formSubmitValue);
    } else {
      console.error("no");
    }
  }
  return (
    <form ref={formRef} id={submitId} onSubmit={formHandler}>
      {children}
    </form>
  );
}
