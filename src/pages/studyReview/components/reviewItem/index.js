import React, {useEffect, useState, useRef} from "react";
import './index.scss'
import Timer from "../../../../util/timer";
import moment from "moment";
import Modal from "../../../../components/modal";
import CloseAndSureContainer from "../../../components/closeAndSureContainer";

export default function ReviewItem(props) {
  const { info, updateReviewStatus } = props;
  const refTimer = useRef()
  const {
    _id,
    reviewContent,
    totalReviewNeedTime,
    needReviewCount,
    haveReviewCount,
    startReviewTime,
    continueSecond,
    createTime,
    status
  } = info;
  const [timer, setTimer] = useState(0)
  useEffect(() => {
    if (status === 'start') {
      const time = Number(continueSecond) + Number(Date.now()) - Number(startReviewTime)
      const info = {
        minInterval: -1000,
        time,
        runCallBack: times => {
          setTimer(times)
        },
        finishCallBack: () => {
          setTimer([])
        }
      };
      refTimer.current = new Timer(info)
      refTimer.current.start()
    } else {
      refTimer && refTimer.current && refTimer.current.stop && refTimer.current.stop()
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
  function renderTimer() {
    if (isStart) {
      const arr = ['天','时','分','秒'];
      let timeString = '';
      (timer || []).map((item, index) => {
        if (item) {
          timeString = timeString + (`${item}${arr[index]}`)
        }
      })
      return timeString
    } else {
      return null
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
        <span>{renderTimer()}</span>
      </div>
    </CloseAndSureContainer>
  );
}