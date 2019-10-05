import React, { useEffect } from "react";
import Connect from "./connect";
import StudyTodoList from "./components/studyTodoList";
import Layout from "../components/layout";

function Page(props) {
  const { getList } = props;
  useEffect(() => {
    getList();
  }, [getList]);
  return <StudyTodoList {...props} />;
}

export default Connect(Page);
