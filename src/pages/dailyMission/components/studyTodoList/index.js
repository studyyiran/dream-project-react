import React from "react";
import "./index.scss";
import moment from "moment";
import CloseAndSureContainer from "../../../components/closeAndSureContainer";
import useTimer from "../../../useHook/useTimer";
import ButtonInputComponent from "../../../studyReview/components/buttonInputComponent";

export default function(props) {
  return (
    <div className="study-todo-list">
      <ButtonInputComponent
        {...props}
        postInputValue={props.newStudyTodoItem}
        buttonContent={"new study todo"}
      />
      <StudyTodoList {...props} />
    </div>
  );
}

function StudyTodoList(props) {
  const { list = [] } = props;
  return (
    <div className="item">
      {list.map(item => (
        <Item {...props} key={item._id} info={item} />
      ))}
    </div>
  );
}

function Item(props) {
  const { info, changeStudyItemStatus, hideStudyItem } = props;
  const { _id, createTime, content, status, startTime, continueSecond } = info;
  const isStart = status === "start";
  function startHandler() {
    // 开始
    if (status !== "finish" && status !== "start") {
      changeStudyItemStatus(_id, "start");
    }
  }
  function sureHandler() {
    // 完成
    changeStudyItemStatus(_id, "finish");
  }
  function closeHandler() {
    if (isStart) {
      // 取消状态
      changeStudyItemStatus(_id, "stop");
    } else {
      // 删除任务
      hideStudyItem(_id);
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
        className="study-todo-item"
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
