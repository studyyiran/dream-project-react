import React from "react";
import "./index.scss";
import ButtonInputComponent from "../buttonInputComponent";
import ReviewItem from "../reviewItem";
import Form from "../../../components/form";

export default function(props) {
  const { reviewList = [], ...other } = props;
  const submitId = "newReviewItem";
  return (
    <div className="review-list">
      <ButtonInputComponent
        {...props}
        postInputValue={props.postNewReview}
        buttonContent={"new study review"}
        submitId={submitId}
      >
        <Form submitId={submitId} onSubmit={e => props.postNewReview(e)}>
          <label>
            content: <input name="reviewContent" />
          </label>
        </Form>
      </ButtonInputComponent>
      <div className="list">
        {reviewList.map(item => (
          <ReviewItem key={item._id} info={item} {...other} />
        ))}
      </div>
    </div>
  );
}
