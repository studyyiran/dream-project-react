import React, { useEffect, useState, useRef } from "react";
import "./index.scss";
import moment from "moment";
import ExtraSureTag from "../../../components/extraSureTag";

export default function(props) {
  return (
    <div className="review-list">
      <ReviewListTable {...props} />
    </div>
  );
}

function ButtonInputComponent(props) {
  const { buttonContent } = props;
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
  if (isInput) {
    dom = (
      <input
        ref={inputRef}
        onBlur={buttonHandler}
        value={inputValue}
        onChange={inputHandler}
      />
    );
  } else {
    dom = <button onClick={buttonHandler}>{buttonContent}</button>;
  }
  return (
    <ExtraSureTag buttonContent={"submit"} isShow={isInput}>
      {dom}
    </ExtraSureTag>
  );
}

function ReviewListTable(props) {
  const { reviewList = [], ...other } = props;
  return (
    <>
      <ButtonInputComponent buttonContent={"new study review"} />
      <div className="list">
        <table>
          <thead>
            <tr>
              <th>创建时间</th>
              <th>内容</th>
              {/*<th>开始</th>*/}
              {/*<th>删除</th>*/}
              {/*<th>生命周期</th>*/}
              {/*<th>复习周期</th>*/}
              {/*<th>+1</th>*/}

              {/*<th>结束</th>*/}
              {/*<th>修改</th>*/}
            </tr>
          </thead>
          <tbody>
            {reviewList.map(item => (
              <ReviewItem key={item._id} info={item} {...other} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function ReviewItem(props) {
  const { info } = props;
  const {
    _id,
    reviewContent,
    totalReviewNeedTime,
    needReviewCount,
    haveReviewCount,
    createTime,
    status
  } = info;
  const deadLineDate = moment(Number(createTime)).add(totalReviewNeedTime, "d");
  return (
    <tr data-status={status} className="item">
      <th>{moment(Number(createTime)).format("MM-DD hh:mm:ss")}</th>
      <th>{reviewContent}</th>
      {/*<th>*/}
      {/*<button date-type="start">开始</button>*/}
      {/*</th>*/}
      {/*<th>*/}
      {/*<button date-type="delete">删除</button>*/}
      {/*</th>*/}
      {/*<th>*/}
      {/*<button*/}
      {/*onClick={() => {*/}
      {/*props.fromReviewToStudyTodo(_id);*/}
      {/*}}*/}
      {/*>*/}
      {/*转到学习*/}
      {/*</button>*/}
      {/*</th>*/}
    </tr>
  );
}
