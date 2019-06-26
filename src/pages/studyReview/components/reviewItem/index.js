import React, {useEffect, useState} from "react";
import Timer from "../../../../util/timer";
import moment from "moment";
import Modal from "../../../../components/modal";
import CloseAndSureContainer from "../../../components/closeAndSureContainer";

export default function ReviewItem(props) {
  const { info, updateReviewStatus } = props;

  const {
    _id,
    reviewContent,
    totalReviewNeedTime,
    needReviewCount,
    haveReviewCount,
    startReviewTime,
    createTime,
    status
  } = info;
  const [timer, setTimer] = useState(0)
  useEffect(() => {
    if (status === 'start') {
      const time = Number(Date.now) - Number(startReviewTime)
      const info = {
        time: time,
        runCallBack: times => {
          console.log(times)
        },
        finishCallBack: () => {

        }
      };
      new Timer(info).start()
    }
  }, [status])
  const deadLineDate = moment(Number(createTime)).add(totalReviewNeedTime, "d");
  const isStart = status === "start";
  function startReviewHandler() {
    updateReviewStatus(_id, "start");
  }
  function finishCallBack() {
    updateReviewStatus(_id, "add");
  }
  function stopCallBack() {
    if (isStart) {
      updateReviewStatus(_id, "stop");
    } else {
      Modal.confirm({
        content: "123",
        onOk: () => {
          // 暂停
          props.hideReviewItem(_id)
        },
        onCancel: () => {
          props.fromReviewToStudyTodo(_id);
        },
        okText: '确认删除',
        cancelText: '移到学习',
      });
    }
  }
  return (
    <CloseAndSureContainer
      buttonContent={"submit"}
      isShowClose={status !== 'finish'}
      isShowSure={isStart}
      sureCallBack={finishCallBack}
      closeCallBack={stopCallBack}
    >
      <div data-status={status} className="item" onClick={startReviewHandler}>
        <span>{moment(Number(createTime)).format("MM-DD hh:mm:ss")}</span>
        <p>{reviewContent}</p>
        <span>{}</span>
      </div>
    </CloseAndSureContainer>
  );
}