/*
传入两个时间，转成moment
 */
import moment from "moment";
import "./index.scss";
import React from "react";

export default function RenderDateBlockArr(props) {
  let {
    style = {},
    type,
    startCalcTime,
    minInterval,
    unitStretch,
    timeRenderInterval
  } = props;
  let timeNow = startCalcTime.clone();
  let timeEnd = startCalcTime
    .clone()
    .hour(23)
    .minute(59);
  let arr = [];
  const value = unitStretch * timeRenderInterval;
  Object.assign(
    style,
    type === "vertical"
      ? { height: value }
      : { minWidth: value, maxWidth: value }
  );
  while (moment(timeNow).isBefore(timeEnd)) {
    const contentTime = timeNow
      .clone()
      .add(30, "m")
      .format("HH:mm");
    arr.push(
      <DateBlock
        style={style}
        unitStretch={unitStretch}
        key={contentTime}
        content={contentTime}
      />
    );
    timeNow.add(timeRenderInterval, minInterval);
  }
  return arr;
}

function DateBlock(props) {
  const { content, style } = props;
  return (
    <div className="zao-flex date-block-container" style={style}>
      {content}
    </div>
  );
}
