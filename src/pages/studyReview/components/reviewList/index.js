import React from "react";
import "./index.scss";
import moment from "moment";
import ButtonInputComponent from "../buttonInputComponent";
import CloseAndSureContainer from "../../../components/closeAndSureContainer";
import Modal from "../../../../components/modal";

export default function(props) {
  return (
    <div className="review-list">
      <ReviewListTable {...props} />
    </div>
  );
}

function ReviewListTable(props) {
  const { reviewList = [], ...other } = props;
  return (
    <>
      <ButtonInputComponent {...props} buttonContent={"new study review"} />
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
  const { info, updateReviewStatus } = props;
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
  const isStart = status === "start";
  function startReviewHandler() {
    updateReviewStatus(_id, "start");
  }
  function finishCallBack() {
    console.log("finishCallBack");
  }
  function stopCallBack() {
    console.log('enter')
    Modal.confirm({
      visible: true,
      content: "123",
      onOk: () => {
        console.log("onOk");
      },
      onCancel: () => {
        console.log("onCancel");
      }
    });
    // updateReviewStatus(_id, "stop");
  }
  return (
    <CloseAndSureContainer
      buttonContent={"submit"}
      isShowClose={isStart}
      isShowTag={isStart}
      sureCallBack={finishCallBack}
      closeCallBack={stopCallBack}
    >
      <tr data-status={status} className="item" onClick={startReviewHandler}>
        <th>{moment(Number(createTime)).format("MM-DD hh:mm:ss")}</th>
        <th>{reviewContent}</th>
      </tr>
    </CloseAndSureContainer>
  );

  // return (
  //   <tr data-status={status} className="item">
  //     <th>{moment(Number(createTime)).format("MM-DD hh:mm:ss")}</th>
  //     <th>{reviewContent}</th>
  //     <th>
  //       <button date-type="start">开始</button>
  //     </th>
  //     <th>
  //       <button date-type="delete">删除</button>
  //     </th>
  //     <th>
  //       <button
  //         onClick={() => {
  //           props.fromReviewToStudyTodo(_id);
  //         }}
  //       >
  //         转到学习
  //       </button>
  //     </th>
  //   </tr>
  // );
}
