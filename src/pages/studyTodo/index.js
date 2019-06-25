import React, { useEffect } from "react";
import Connect from "./connect";
import ReviewList from "./components/reviewList";

function Page(props) {
  const { setReviewList, getReviewList, reviewList } = props;
  useEffect(() => {
    getReviewList();
  }, [getReviewList, setReviewList]);
  return <ReviewList reviewList={reviewList} />;
}

export default Connect(Page);
