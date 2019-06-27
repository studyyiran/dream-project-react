import React from "react";
import "./index.scss";
import ButtonInputComponent from "../buttonInputComponent";
import ReviewItem from "../reviewItem";

export default function(props) {
  const { reviewList = [], ...other } = props;
  return (
    <div className="review-list">
      <ButtonInputComponent
        {...props}
        postInputValue={props.postNewReview}
        buttonContent={"new study review"}
      />
      <div className="list">
        {reviewList.map(item => (
          <ReviewItem key={item._id} info={item} {...other} />
        ))}
      </div>
    </div>
  );
}
