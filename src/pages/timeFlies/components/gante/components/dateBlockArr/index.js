/*
传入两个时间，转成moment
 */
import moment from "moment";
import React from "react";

export default function RenderDateBlockArr(props) {
  let {
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
  let style =
    type === "vertical"
      ? { height: value }
      : { minWidth: value, maxWidth: value };
  while (moment(timeNow).isBefore(timeEnd)) {
    timeNow.add(timeRenderInterval, minInterval);
    arr.push(
      <DateBlock
        style={style}
        unitStretch={unitStretch}
        key={timeNow.format("HH:mm")}
        content={timeNow.format("HH:mm")}
      />
    );
  }
  return arr;
}

function DateBlock(props) {
  const { content, style } = props;
  return (
    <div className="date-block-container" style={style}>
      {content}
    </div>
  );
}
