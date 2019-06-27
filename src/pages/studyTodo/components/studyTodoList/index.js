import React from "react";
import "./index.scss";
import moment from "moment";

export default function(props) {
  return (
    <div className="study-todo-list">
      <StudyTodoList {...props} />
    </div>
  );
}

function StudyTodoList(props) {
  const { list = [] } = props;
  return (
    <div className="item">
      {list.map(item => (
        <Item key={item._id} info={item} />
      ))}
    </div>
  );
}

function Item(props) {
  const { info } = props;
  const { _id, createTime, content, status, startTime, continueSecond } = info;
  return (
    <div className='item'>
      <div>{moment(Number(createTime)).format()}</div>
    </div>
  );
}
