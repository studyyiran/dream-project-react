import React from "react";
import "./index.scss";
import moment from "moment";
import CloseAndSureContainer from "../../../components/closeAndSureContainer";
import useTimer from "../../../useHook/useTimer";
import ButtonInputComponent from "../../../studyReview/components/buttonInputComponent";
import Form from "../../../components/form";
import RenderTimer from "../../../components/renderTimer";

export default function(props) {
  const submitId = "newStudyTodo";
  return (
    <div className="study-todo-list">
      <ButtonInputComponent
        {...props}
        postInputValue={props.newStudyTodoItem}
        buttonContent={"new study todo"}
        submitId={submitId}
      >
        <Form submitId={submitId} onSubmit={e => props.newStudyTodoItem(e)}>
          <label>
            content: <input name="content" />
          </label>
        </Form>
      </ButtonInputComponent>
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
