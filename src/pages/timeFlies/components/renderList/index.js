import React, { useState } from "react";
import "./index.scss";
import Gante from "../gante";
import moment from "moment";
/*
props:
  list: [
    attr: {
      name:
      content:
    }
  ]

  设置参数包括
    1）日期
    2）vertical
 */
export default function(props) {
  const [rangeStartTime, setRangeStartTime] = useState(
    moment().subtract(0, "day")
  );
  const [isVertical, setVertical] = useState(true);

  return (
    <div className="time-files-render-list">
      <div
        onClick={() => {
          setVertical(value => {
            return !value;
          });
        }}
      >
        set to {isVertical ? "horizontal" : "vertical"}
      </div>
      <RangeSelect
        currentSelectTime={rangeStartTime}
        onChangeDate={date => {
          setRangeStartTime(date);
        }}
      />
      {renderGante(props.eventStreamList, isVertical, rangeStartTime)}
    </div>
  );
}

function renderGante(eventStreamList, isVertical, rangeStartTime) {
  const list = (eventStreamList || []).map(item => {
    const eventStartTime = moment(item.createTime)
      .subtract(item.duration, "ms")
      .format();
    const eventEndTime = item.createTime;
    return {
      attr: {
        ...item,
        name: item.content,
        eventStartTime,
        eventEndTime
      }
    };
  });
  const ganteConfig = {
    unitStretch: 4.8, // 决定了主向量的单位长度
    minInterval: "m",
    type: isVertical ? "vertical" : "horizontal"
    // type: "horizontal"
  };
  return (
    <Gante
      ganteConfig={ganteConfig}
      list={list.filter(item => {
        return moment(item.attr.eventStartTime).isSame(rangeStartTime, "day");
      })}
    />
  );
}

function RangeSelect(props) {
  const { onChangeDate, currentSelectTime } = props;
  function handler(type) {
    const nextTime = moment(currentSelectTime)[type](1, "day");
    onChangeDate(nextTime);
  }
  return (
    <div className="range-select">
      <button
        onClick={() => {
          handler("subtract");
        }}
      >
        prev
      </button>
      <span>{currentSelectTime.format("YYYY-MM-DD")}</span>
      <button
        onClick={() => {
          handler("add");
        }}
      >
        next
      </button>
    </div>
  );
}
