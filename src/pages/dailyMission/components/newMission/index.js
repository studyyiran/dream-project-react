import React, { useEffect } from "react";
import "./index.scss";
import moment from "moment";
import CloseAndSureContainer from "../../../components/closeAndSureContainer";
import Form from "../../../components/form";
import useTimer from "../../../useHook/useTimer";
import ButtonInputComponent from "../../../studyReview/components/buttonInputComponent";
import RenderTimer from "../../../components/renderTimer";

export default function(props) {
  // 这个还单纯吗？
  const { getList, newItem } = props;
  useEffect(() => {
    getList();
  }, [getList]);
  const submitId = "newMission";
  // 这块如何化简
  return (
    <div className="study-todo-list">
      <ButtonInputComponent
        {...props}
        postInputValue={props.newItem}
        buttonContent={"new item ^ ^"}
        submitId={submitId}
      >
        <Form
          submitId={submitId}
          onSubmit={e => {
            // 这块设计的还是怪怪的。 清空也不好做
            newItem(e);
          }}
        >
          <label>
            content: <input name="content" />
          </label>
          <label>
            timeInterval: <input name="timeInterval" />
          </label>
        </Form>
      </ButtonInputComponent>
      <StudyTodoList {...props} />
    </div>
  );
}

function StudyTodoList(props) {
  const { dailyMissionList = [] } = props;
  return (
    <div className="item">
      {dailyMissionList.map(item => (
        <Item {...props} key={item._id} info={item} />
      ))}
    </div>
  );
}

function Item(props) {
  // 吐槽 这个命名太随性了 hide
  const { info, changeStatus, hide } = props;
  const { _id, createTime, content, status, startTime, continueSecond } = info;
  const isStart = status === "start";
  function startHandler() {
    // 开始
    if (status !== "finish" && status !== "start") {
      changeStatus(_id, "start");
    }
  }
  function sureHandler() {
    // 完成
    changeStatus(_id, "finish");
  }
  function closeHandler() {
    if (isStart) {
      // 取消状态
      changeStatus(_id, "stop");
    } else {
      // 删除任务
      hide(_id);
    }
  }

  const timer = useTimer(status, Number(continueSecond) - Number(startTime));
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
        // onClick={() => {}}
      >
        <div>创建时间：{moment(Number(createTime)).format()}</div>
        <p>内容：{content}</p>
        {renderTimer()}
      </div>
    </CloseAndSureContainer>
  );
}
