import React, { useEffect } from "react";
import Connect from "./connect";
import ReviewList from "./components/studyTodoList";
import Layout from "../components/layout";

function Page(props) {
  const { getList, list } = props;
  useEffect(() => {
    getList();
  }, [getList]);
  return (
    <Layout>
      <ReviewList list={list} />
    </Layout>
  );
}

export default Connect(Page);
