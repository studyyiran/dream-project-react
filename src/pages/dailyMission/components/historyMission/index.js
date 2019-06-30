import React, { useEffect } from "react";
import "./index.scss";
import moment from "moment";
import CloseAndSureContainer from "../../../components/closeAndSureContainer";
import useTimer from "../../../useHook/useTimer";

export default function(props) {
  // 这个还单纯吗？
  const { getHistoryMissionList } = props;
  useEffect(() => {
    getHistoryMissionList();
  }, [getHistoryMissionList]);
  return (
    <div className="history-mission">
      <StudyTodoList {...props} />
    </div>
  );
}

function StudyTodoList(props) {
  const { historyMissionList = [] } = props;
  return (
    <div className="item">
      {historyMissionList.map(item => (
        <Item {...props} key={item._id} info={item} />
      ))}
    </div>
  );
}

function Item(props) {
  const { info, changeMissionStatusById, deleteTodayMissionStatus } = props;
  const {
    _id,
    createTime,
    content,
    status,
    startTime,
    continueSecond,
    missionId
  } = info;
  const isStart = status === "start";
  function startHandler() {
    // 开始
    if (status !== "finish" && status !== "start") {
      changeMissionStatusById(_id, "start");
    }
  }
  function sureHandler() {
    // 完成
    changeMissionStatusById(_id, "finish");
  }
  function closeHandler() {
    if (isStart) {
      // 取消状态
      changeMissionStatusById(_id, "stop");
    } else {
      // 删除任务
      deleteTodayMissionStatus(_id);
    }
  }

  const timer = useTimer(
    status,
    Number(continueSecond) + Number(Date.now()) - Number(startTime)
  );
  function renderTimer() {
    if (isStart) {
      return (
        <div>
          <span>学习持续了：</span>
          <RenderTimer timer={timer} />
        </div>
      );
    } else {
      return `持续study了：${moment
        .duration(Number(continueSecond))
        .humanize()}`;
    }
  }

  return (
    <CloseAndSureContainer
      buttonContent="完成"
      isShowSure={isStart}
      sureCallBack={sureHandler}
      isShowClose={true}
      closeCallBack={closeHandler}
    >
      <div
        className="history-mission-item"
        data-status={status}
        onClick={startHandler}
      >
        <div>创建时间：{moment(Number(createTime)).format()}</div>
        <p>内容：{content}</p>
        {renderTimer()}
      </div>
    </CloseAndSureContainer>
  );
}

function RenderTimer(props) {
  const { timer } = props;
  const arr = ["天", "时", "分", "秒"];
  let timeString = "";
  (timer || []).forEach((item, index) => {
    if (index === 0) {
      if (item) {
        timeString = `${item}天`;
      }
    } else {
      timeString = timeString + `${item}`;
      if (index !== arr.length - 1) {
        if (index !== 0) {
          timeString = timeString + ":";
        }
      }
    }
  });
  return timeString;
}
