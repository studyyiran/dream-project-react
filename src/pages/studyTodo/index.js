import React, { useEffect } from "react";
import Connect from "./connect";
import ReviewList from "./components/reviewList";

function Page(props) {
  const { getList, list } = props;
  useEffect(() => {
    getList();
  }, [getList]);
  return <ReviewList list={list} />;
}

export default Connect(Page);
