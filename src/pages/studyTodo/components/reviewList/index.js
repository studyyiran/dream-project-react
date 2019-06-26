import React from "react";
import "./index.scss";
import moment from "moment";

export default function(props) {
  return (
    <div className="review-list">
      <ReviewListTable {...props} />
    </div>
  );
}

function ReviewListTable(props) {
  const { list = [] } = props;
  return (
    <div className="item">
      <table>
        <thead>
          <tr>
            <th>创建时间</th>
            <th>内容</th>
            <th>完成</th>
            <th>删除</th>
          </tr>
        </thead>
        <tbody>
          {list.map(item => (
            <ReviewItem key={item._id} info={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ReviewItem(props) {
  const { info } = props;
  const {
    _id,
    content,
    totalReviewNeedTime,
    needReviewCount,
    haveReviewCount,
    createTime,
    status
  } = info;
  const deadLineDate = moment(Number(createTime)).add(totalReviewNeedTime, "d");
  return (
    <tr data-status={status}>
      <th>{moment(Number(createTime)).format("MM-DD hh:mm:ss")}</th>
      <th>{content}</th>
      <th>{moment().to(deadLineDate)}</th>
      <th>
        {haveReviewCount}/{needReviewCount}
      </th>
      <th>
        <button date-type="finish">+1</button>
      </th>
      <th>
        <button date-type="start">开始</button>
      </th>
      <th>
        <button date-type="stop">结束</button>
      </th>
      <th>
        <button date-type="update">修改</button>
      </th>
      <th>
        <button date-type="delete">删除</button>
      </th>
      <th>
        <button date-type="delete">删除</button>
      </th>
    </tr>
  );
}
