import React, { useEffect, useState, useRef } from "react";
import "./index.scss";
import Timer from "../../../../util/timer";
import moment from "moment";
import Modal from "../../../../components/modal";
import CloseAndSureContainer from "../../../components/closeAndSureContainer";

function useTimer(status, time) {
  const [timer, setTimer] = useState(0);
  const refTimer = useRef();
  // 这块为什么不能带time万？
  useEffect(() => {
    if (status === "start") {
      const info = {
        minInterval: -1000,
        time,
        runCallBack: times => {
          if (times) {
            setTimer(times);
          } else {
          }
        },
        finishCallBack: () => {
          setTimer([]);
        }
      };
      refTimer.current = new Timer(info);
      refTimer.current.start();
    } else {
      refTimer &&
        refTimer.current &&
        refTimer.current.stop &&
        refTimer.current.stop();
    }
  }, [status, time]);
  useEffect(() => {
    // 退出页面关闭
    return () => {
      refTimer &&
        refTimer.current &&
        refTimer.current.stop &&
        refTimer.current.stop();
    };
  }, []);
  return timer;
}

export default function ReviewItem(props) {
  const { info, updateReviewStatus } = props;

  const {
    _id,
    reviewContent,
    totalReviewNeedTime,
    startReviewTime,
    continueSecond,
    createTime,
    status
  } = info;
  const timer = useTimer(
    status,
    Number(continueSecond) + Number(Date.now()) - Number(startReviewTime)
  );
  const deadLineDate = moment(Number(createTime)).add(totalReviewNeedTime, "d");
  const isStart = status === "start";
  function startReviewHandler() {
    // 这个提交后台，会有什么影响？
    if (status !== "start" && status !== "finish") {
      updateReviewStatus(_id, "start");
    }
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
          props.hideReviewItem(_id);
        },
        onCancel: () => {
          props.fromReviewToStudyTodo(_id);
        },
        okText: "确认删除",
        cancelText: "移到学习"
      });
    }
  }
  function renderTimer() {
    if (isStart) {
      const arr = ["天", "时", "分", "秒"];
      let timeString = "持续复习：";
      (timer || []).forEach((item, index) => {
        if (index !== 0) {
          if (index === 1) {
            item += 24 * timer[0];
          }
          timeString = timeString + `${item}`;
          if (index !== arr.length - 1) {
            timeString = timeString + ":";
          }
        }
      });
      return timeString;
    } else {
      return null;
    }
  }

  function renderDeadLineTime() {
    if (status === "finish") {
      return `持续复习了${moment.duration(continueSecond).humanize()}`;
    } else {
      return moment().to(deadLineDate);
    }
  }
  return (
    <CloseAndSureContainer
      buttonContent={"submit"}
      isShowClose={status !== "finish"}
      isShowSure={isStart}
      sureCallBack={finishCallBack}
      closeCallBack={stopCallBack}
    >
      <div
        data-status={status}
        className="review-item"
        onClick={startReviewHandler}
      >
        <span>{moment(Number(createTime)).format("MM-DD hh:mm:ss")}</span>
        <p>{reviewContent}</p>
        <span>{renderDeadLineTime()}</span>
        <span>{renderTimer()}</span>
      </div>
    </CloseAndSureContainer>
  );
}
