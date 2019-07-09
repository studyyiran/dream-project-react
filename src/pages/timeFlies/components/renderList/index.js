import React, { useState } from "react";
import "./index.scss";
import Gante from "../gante";
import moment from "moment";
/*
  props:
    eventStreamList: []原始list数据
 */
export default function(props) {
  /*
  state
    1）rangeStartTime 当前选中日期
    2）vertical 展示方式
   */
  const [rangeStartTime, setRangeStartTime] = useState(
    moment().subtract(1, "day")
  );
  const [isVertical, setVertical] = useState(false);

  return (
    <div className="time-files-render-list">
      <div
        className="set-vertical"
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
  /*
  const
    1）unitStretch 决定了主向量的单位长度
    2）minInterval 时间最小精度

    eventStreamList: [
      attr: {
        createTime:
        duration:
        name:
        content:
      }
    ]
   */
  const ganteConfig = {
    unitStretch: 4.8, // 可以改变长度
    minInterval: "m", // 可以切换成秒。这两个const都能像type一样跃迁为state进行操作。
    type: isVertical ? "vertical" : "horizontal"
    // type: "horizontal"
  };
  const list = (eventStreamList || []).map(item => {
    const eventStartTime = moment(item.createTime)
      .subtract(item.duration, "ms")
      .format();
    let eventEndTime = moment(item.createTime);
    if (
      moment(eventEndTime).diff(eventStartTime, ganteConfig.minInterval) <= 1
    ) {
      eventEndTime = moment(eventStartTime).add(1, ganteConfig.minInterval);
    }
    return {
      attr: {
        ...item,
        name: item.content,
        eventStartTime,
        eventEndTime
      }
    };
  });
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
  /*
   */
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
